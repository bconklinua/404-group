from django.test import TestCase
from User.models import Author
from Follow.models import Follow
from FriendRequest.models import FriendRequest
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework_simplejwt.tokens import RefreshToken
from six import text_type


class FollowTestCase(TestCase):
    access1 = None
    access2 = None
    refresh1 = None
    refresh2 = None

    @classmethod
    def setUpTestData(cls):
        author1 = Author.objects.create_user(email="author1@email.com",
                                             username="author1",
                                             password="testpassword",
                                             first_name="Autumn",
                                             last_name="McAuthor",
                                             is_staff=False,
                                             is_superuser=False
                                             )
        author2 = Author.objects.create_user(email="author2@email.com",
                                             username="author2",
                                             password="testpassword",
                                             first_name="Arthur",
                                             last_name="McAuthor",
                                             is_staff=False,
                                             is_superuser=False
                                             )
        tokens1 = RefreshToken.for_user(author1)
        tokens2 = RefreshToken.for_user(author2)
        access1 = tokens1.access_token
        access2 = tokens2.access_token
        cls.refresh1 = text_type(tokens1)
        cls.access1 = text_type(access1)
        cls.refresh2 = text_type(tokens2)
        cls.access2 = text_type(access2)
        cls.author1 = author1
        cls.author2 = author2

    def test_list_followers_when_empty(self):
        """Show Empty Followers List"""
        url = reverse('followers_list')
        response = self.client.get(path=url,
                                   data=None,
                                   **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                   format='json')
        self.assertEqual(response.data, [])
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_followers_with_followers(self):
        """Show Followers List with a follow"""
        url = reverse('followers_list')
        Follow.objects.create(follower=self.author2, followee=self.author1)
        response = self.client.get(path=url,
                                   data=None,
                                   **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                   format='json')
        found_follow = False
        for follow in response.data:
            if follow['sender_id'] == self.author2.id:
                found_follow = True

        self.assertNotEqual(response.data, [])
        self.assertTrue(found_follow)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_following_when_empty(self):
        """Show Empty Following List"""
        url = reverse('following_list')
        response = self.client.get(path=url,
                                   data=None,
                                   **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                   format='json')
        self.assertEqual(response.data, [])
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_following_with_following(self):
        """Show Followers List with a follow"""
        url = reverse('following_list')
        Follow.objects.create(follower=self.author1, followee=self.author2)
        response = self.client.get(path=url,
                                   data=None,
                                   **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                   format='json')
        found_follow = False
        for follow in response.data:
            if follow['recipient_id'] == self.author2.id:
                found_follow = True

        self.assertNotEqual(response.data, [])
        self.assertTrue(found_follow)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_true_friends_list_when_empty(self):
        """Show Empty True Friends List"""
        url = reverse('true_friends_list')
        response = self.client.get(path=url,
                                   data=None,
                                   **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                   format='json')
        self.assertEqual(response.data, [])
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_true_friends_list_with_non_mutual_inbound_follow(self):
        """Show Empty True Friends List With Only an Inbound Follow"""
        url = reverse('true_friends_list')
        Follow.objects.create(follower=self.author2, followee=self.author1)
        response = self.client.get(path=url,
                                   data=None,
                                   **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                   format='json')
        self.assertEqual(response.data, [])
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_true_friends_list_with_non_mutual_outbound_follow(self):
        """Show Empty True Friends List With Only an Outbound Follow"""
        url = reverse('true_friends_list')
        Follow.objects.create(follower=self.author1, followee=self.author2)
        response = self.client.get(path=url,
                                   data=None,
                                   **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                   format='json')
        self.assertEqual(response.data, [])
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_true_friends_list_with_mutual_follow(self):
        """Show True Friends List With Mutual Follow"""
        url = reverse('true_friends_list')
        Follow.objects.create(follower=self.author1, followee=self.author2)
        Follow.objects.create(follower=self.author2, followee=self.author1)
        response = self.client.get(path=url,
                                   data=None,
                                   **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                   format='json')
        found_true_friend = False
        for friend in response.data:
            if friend['friend_id'] == self.author2.id:
                found_true_friend = True
        self.assertNotEqual(response.data, [])
        self.assertTrue(found_true_friend)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_unfollow_when_not_following(self):
        """Attempt to unfollow someone you are not following"""
        url = reverse('unfollow_by_user_id', kwargs={"user_id": self.author2.id})
        response = self.client.post(path=url,
                                    data=None,
                                    **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                    format='json')
        self.assertTrue('error' in response.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_unfollow_when_following(self):
        """Attempt to unfollow someone you are following"""
        Follow.objects.create(follower=self.author1, followee=self.author2)
        url = reverse('unfollow_by_user_id', kwargs={"user_id": self.author2.id})
        self.assertTrue(Follow.objects.filter(follower=self.author1, followee=self.author2).exists())
        response = self.client.post(path=url,
                                    data=None,
                                    **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                    format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(Follow.objects.filter(follower=self.author1, followee=self.author2).exists())

    def test_withdraw_when_not_being_followed(self):
        """Attempt to withdraw approval of another author's follow when they are not following you"""
        url = reverse('withdraw_by_user_id', kwargs={"user_id": self.author2.id})
        response = self.client.post(path=url,
                                    data=None,
                                    **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                    format='json')
        self.assertTrue('error' in response.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_withdraw_when_being_followed(self):
        """Attempt to withdraw approval of another author's follow when they are following you"""
        Follow.objects.create(follower=self.author2, followee=self.author1)
        url = reverse('withdraw_by_user_id', kwargs={"user_id": self.author2.id})
        self.assertTrue(Follow.objects.filter(follower=self.author2, followee=self.author1).exists())
        response = self.client.post(path=url,
                                    data=None,
                                    **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                    format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(Follow.objects.filter(follower=self.author2, followee=self.author1).exists())

    def test_unfriend_when_not_following_or_being_followed(self):
        """Attempt to unfriend someone when no follow relationship exists between you"""
        url = reverse('unfriend_by_user_id', kwargs={"user_id": self.author2.id})
        response = self.client.post(path=url,
                                    data=None,
                                    **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                    format='json')
        self.assertTrue('error' in response.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_unfriend_when_following(self):
        """Attempt to unfriend someone you are following"""
        Follow.objects.create(follower=self.author1, followee=self.author2)
        url = reverse('unfriend_by_user_id', kwargs={"user_id": self.author2.id})
        self.assertTrue(Follow.objects.filter(follower=self.author1, followee=self.author2).exists())
        response = self.client.post(path=url,
                                    data=None,
                                    **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                    format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(Follow.objects.filter(follower=self.author1, followee=self.author2).exists())

    def test_unfriend_when_being_followed(self):
        """Attempt to unfriend another author when they are following you"""
        Follow.objects.create(follower=self.author2, followee=self.author1)
        url = reverse('unfriend_by_user_id', kwargs={"user_id": self.author2.id})
        self.assertTrue(Follow.objects.filter(follower=self.author2, followee=self.author1).exists())
        response = self.client.post(path=url,
                                    data=None,
                                    **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                    format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(Follow.objects.filter(follower=self.author2, followee=self.author1).exists())

    def test_unfriend_when_true_friends(self):
        """Attempt to unfriend another author when you are true friends"""
        Follow.objects.create(follower=self.author1, followee=self.author2)
        Follow.objects.create(follower=self.author2, followee=self.author1)
        url = reverse('unfriend_by_user_id', kwargs={"user_id": self.author2.id})
        self.assertTrue(Follow.objects.filter(follower=self.author1, followee=self.author2).exists())
        self.assertTrue(Follow.objects.filter(follower=self.author2, followee=self.author1).exists())
        response = self.client.post(path=url,
                                    data=None,
                                    **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                    format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(Follow.objects.filter(follower=self.author1, followee=self.author2).exists())
        self.assertFalse(Follow.objects.filter(follower=self.author2, followee=self.author1).exists())