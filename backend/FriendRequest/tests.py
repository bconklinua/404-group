from django.test import TestCase
from User.models import Author
from Follow.models import Follow
from FriendRequest.models import FriendRequest
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework_simplejwt.tokens import RefreshToken
from six import text_type


class FriendRequestTestCase(TestCase):
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

    def test_send_friend_request(self):
        """Send a friend request from author1 to author2"""
        url = reverse('friend_request_to_user', kwargs={"author_id": self.author2.id})
        response = self.client.post(path=url,
                                    data=None,
                                    **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                    format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_send_duplicate_friend_request(self):
        """Attempt sending a duplicate friend request from author1 to author2"""
        url = reverse('friend_request_to_user', kwargs={"author_id": self.author2.id})
        self.client.post(path=url,
                         data=None,
                         **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                         format='json')
        response = self.client.post(path=url,
                                    data=None,
                                    **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                    format='json')
        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)

    def test_list_friend_requests_when_empty(self):
        """Show Empty Friend Requests List"""
        url = reverse('friend_request_list')
        response = self.client.get(path=url,
                                    data=None,
                                    **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                    format='json')
        self.assertEqual(response.data, [])
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_friend_requests_after_friend_request(self):
        """Show Empty Friend Requests List"""
        url = reverse('friend_request_list')
        FriendRequest.objects.create(sender=self.author2, recipient=self.author1)
        response = self.client.get(path=url,
                                   data=None,
                                   **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                   format='json')
        self.assertNotEqual(response.data, [])
        self.assertTrue("sender_id" in response.data[0])
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_accept_friend_request(self):
        """Accept a friend request"""
        friend_request = FriendRequest.objects.create(sender=self.author2, recipient=self.author1)
        fr_id = friend_request.id
        url = reverse('friend_request_accept', kwargs={"fr_id": fr_id})
        response = self.client.post(path=url,
                                    data=None,
                                    **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                    format='json')
        self.assertTrue('message' in response.data)
        self.assertTrue(Follow.objects.filter(follower=self.author2, followee=self.author1).exists())
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_reject_friend_request(self):
        """Accept a friend request"""
        friend_request = FriendRequest.objects.create(sender=self.author2, recipient=self.author1)
        fr_id = friend_request.id
        url = reverse('friend_request_reject', kwargs={"fr_id": fr_id})
        response = self.client.post(path=url,
                                    data=None,
                                    **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                    format='json')
        self.assertTrue('message' in response.data)
        self.assertFalse(FriendRequest.objects.filter(sender=self.author2, recipient=self.author1).exists())
        self.assertFalse(Follow.objects.filter(follower=self.author2, followee=self.author1).exists())
        self.assertEqual(response.status_code, status.HTTP_200_OK)