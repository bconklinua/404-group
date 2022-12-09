from django.test import TestCase
from User.models import Author
from Follow.models import Follow
from Post.models import Post
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework_simplejwt.tokens import RefreshToken
from six import text_type
from Post.serializers import PostSerializer
from Like.models import Like
from Like.serializers import LikeSerializer


class LikeTestCase(TestCase):
    access1 = None
    access2 = None
    refresh1 = None
    refresh2 = None

    @classmethod
    def setUpTestData(cls):
        cls.author = Author.objects.create_user(email="author1@email.com",
                                                username="author1",
                                                password="testpassword",
                                                first_name="Autumn",
                                                last_name="McAuthor",
                                                is_staff=False,
                                                is_superuser=False
                                                )
        cls.author2 = Author.objects.create_user(email="author2@email.com",
                                                 username="author2",
                                                 password="testpassword",
                                                 first_name="September",
                                                 last_name="McAuthor",
                                                 is_staff=False,
                                                 is_superuser=False
                                                 )
        tokens = RefreshToken.for_user(cls.author)
        access = tokens.access_token
        cls.refresh = text_type(tokens)
        cls.access = text_type(access)
        cls.post = Post.objects.create(title="Test title", author=cls.author)
        cls.post2 = Post.objects.create(title="Test title 2", author=cls.author2)

    def test_get_post_likes_with_no_likes(self):
        """check that a post with no likes returns an empty list"""
        url = reverse('post-likes-list', kwargs={'post_id': getattr(self.post, 'id')})
        response = self.client.get(path=url, data=None, **{'HTTP_AUTHORIZATION': f'Bearer {self.access}'},
                                   format='json')
        self.assertEqual(response.data, [])
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_liking_post(self):
        """attempt posting a like to a post"""
        url = reverse('post-likes-list', kwargs={'post_id': getattr(self.post, 'id')})
        response = self.client.post(path=url, data=None, **{'HTTP_AUTHORIZATION': f'Bearer {self.access}'},
                                    format='json')
        self.assertEqual(response.data['summary'], "author1 likes your post")
        self.assertEqual(response.data['author']['id'], str(getattr(self.author, 'id')))
        self.assertEqual(response.data['post'], PostSerializer(self.post).data)
        self.assertIsNone(response.data['comment'])
        self.assertIsNotNone(response.data['id'])
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_specific_liked_post(self):
        """attempt retrieving a specific like"""
        like = Like.objects.create(author=self.author, post=self.post)
        url = reverse('post-likes-detail', kwargs={'post_id': str(self.post.id), 'pk': str(like.id)})
        response = self.client.get(path=url, data=None, **{'HTTP_AUTHORIZATION': f'Bearer {self.access}'},
                                   format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, LikeSerializer(like).data)

    def test_get_post_likes_with_likes(self):
        """attempt getting likes from a specific post"""
        like1 = Like.objects.create(author=self.author, post=self.post)
        like2 = Like.objects.create(author=self.author2, post=self.post)
        url = reverse('post-likes-list', kwargs={'post_id': getattr(self.post, 'id')})
        response = self.client.get(path=url, data=None, **{'HTTP_AUTHORIZATION': f'Bearer {self.access}'},
                                   format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual([LikeSerializer(like1).data, LikeSerializer(like2).data], response.data)

    def test_like_is_removed_if_already_exists(self):
        """attempt removing a like from a post"""
        url = reverse('post-likes-list', kwargs={'post_id': getattr(self.post, 'id')})
        like = Like.objects.create(author=self.author, post=self.post)
        response = self.client.post(path=url, data=None, **{'HTTP_AUTHORIZATION': f'Bearer {self.access}'},
                                    format='json')
        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)
        self.assertEqual("Existing like deleted", response.data['message'])

    def test_get_author_likes_with_no_likes(self):
        """attempt getting author likes that has none"""
        url = reverse('author-likes-list', kwargs={'author_id': getattr(self.author, 'id')})
        response = self.client.get(path=url, data=None, **{'HTTP_AUTHORIZATION': f'Bearer {self.access}'},
                                   format='json')
        self.assertEqual(response.data, [])
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_author_likes_with_likes(self):
        """attempt getting author likes that has likes"""
        like1 = Like.objects.create(author=self.author, post=self.post)
        like2 = Like.objects.create(author=self.author, post=self.post2)
        url = reverse('author-likes-list', kwargs={'author_id': getattr(self.author, 'id')})
        response = self.client.get(path=url, data=None, **{'HTTP_AUTHORIZATION': f'Bearer {self.access}'},
                                   format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual([LikeSerializer(like1).data, LikeSerializer(like2).data], response.data)

    def test_get_author_likes_specific_to_author(self):
        """attempt getting author likes specific to author"""
        like1 = Like.objects.create(author=self.author, post=self.post)
        like2 = Like.objects.create(author=self.author2, post=self.post)
        url = reverse('author-likes-list', kwargs={'author_id': getattr(self.author, 'id')})
        response = self.client.get(path=url, data=None, **{'HTTP_AUTHORIZATION': f'Bearer {self.access}'},
                                   format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual([LikeSerializer(like1).data], response.data)

    def test_get_post_likes_specific_to_post(self):
        """attempt getting post likes specific to post"""
        like1 = Like.objects.create(author=self.author, post=self.post)
        like2 = Like.objects.create(author=self.author, post=self.post2)
        url = reverse('post-likes-list', kwargs={'post_id': getattr(self.post, 'id')})
        response = self.client.get(path=url, data=None, **{'HTTP_AUTHORIZATION': f'Bearer {self.access}'},
                                   format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual([LikeSerializer(like1).data], response.data)

    def test_liking_private_post_when_not_following(self):
        """attempt posting a like to a private post when not following"""
        self.post2.visibility = 'FRIENDS'
        self.post2.save()
        url = reverse('post-likes-list', kwargs={'post_id': getattr(self.post2, 'id')})
        response = self.client.post(path=url, data=None, **{'HTTP_AUTHORIZATION': f'Bearer {self.access}'},
                                    format='json')
        self.assertTrue("error" in response.data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_liking_private_post_when_following(self):
        """attempt posting a like to a private post when following"""
        self.post2.visibility = 'FRIENDS'
        self.post2.save()
        Follow.objects.create(follower=self.author, followee=self.author2)
        url = reverse('post-likes-list', kwargs={'post_id': getattr(self.post2, 'id')})
        response = self.client.post(path=url, data=None, **{'HTTP_AUTHORIZATION': f'Bearer {self.access}'},
                                    format='json')
        self.assertTrue("summary" in response.data)
        self.assertFalse("error" in response.data)
        self.assertEqual(response.data['post']['id'], str(self.post2.id))
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)