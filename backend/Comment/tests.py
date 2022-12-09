import json

from django.test import TestCase
from Comment.models import Comment
from Inbox.models import Inbox
from User.models import Author
from Follow.models import Follow
from FriendRequest.models import FriendRequest
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework_simplejwt.tokens import RefreshToken
from six import text_type
from Post.models import Post, Category
from Post.tests import get_temporary_jpeg_image, get_temporary_png_image


class PostCommentTestCase(TestCase):
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
        default_post_data = {
            "type": "post",
            "source": "my_source",
            "origin": "my_origin",
            "description": "my description",
            "contentType": "text/plain",
            "content": "content of a test post",
            "visibility": "PUBLIC",
            "unlisted": False,
        }
        if not Inbox.objects.filter(author=author1).exists():
            Inbox.objects.create(author=author1)
        if not Inbox.objects.filter(author=author2).exists():
            Inbox.objects.create(author=author2)
        author1_text_post = Post.objects.create(author=author1, title="this is author1's title", **default_post_data)
        author2_text_post = Post.objects.create(author=author2, title="this is author2's title", **default_post_data)

        tokens1 = RefreshToken.for_user(author1)
        tokens2 = RefreshToken.for_user(author2)
        access1 = tokens1.access_token
        access2 = tokens2.access_token

        image_post_data = default_post_data
        image_post_data['contentType'] = "image/jpeg;base64"
        image = get_temporary_jpeg_image()
        author1_image_post = Post.objects.create(author=author1, title="this is author1's image-post title", image=image.name, **image_post_data)
        author2_image_post_data = image_post_data
        image = get_temporary_png_image()
        author2_image_post = Post.objects.create(author=author2, title="this is author2's image-post title", image=image.name, **author2_image_post_data)

        default_comment_data = {
            "type": "comment",
            "author": author1,
            "comment": "this is my test comment.",
            "contentType": "text/plain"
        }

        cls.access1 = text_type(access1)
        cls.access2 = text_type(access2)
        cls.author1 = author1
        cls.author2 = author2
        cls.author1_text_post = author1_text_post
        cls.author2_text_post = author2_text_post
        cls.author1_image_post = author1_image_post
        cls.author2_image_post = author2_image_post
        cls.default_comment_data = default_comment_data

    def test_post_comment_on_own_text_post(self):
        """Post a comment on your own text post"""
        comment_data = self.default_comment_data
        comment_data['author'] = self.author1.id
        url = reverse('post-comments-list', kwargs={"post_id": self.author1_text_post.id})
        response = self.client.post(path=url,
                                    data=comment_data,
                                    **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                    format='json')
        self.assertEqual(response.data['post']['id'], str(self.author1_text_post.id))
        self.assertEqual(response.data['comment'], comment_data['comment'])
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_post_comment_on_other_author_public_post(self):
        """Post a comment on another author's text post"""
        comment_data = self.default_comment_data
        comment_data['author'] = self.author1.id
        url = reverse('post-comments-list', kwargs={"post_id": self.author2_text_post.id})
        response = self.client.post(path=url,
                                    data=comment_data,
                                    **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                    format='json')
        self.assertEqual(response.data['post']['id'], str(self.author2_text_post.id))
        self.assertEqual(response.data['comment'], comment_data['comment'])
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_post_comment_on_own_private_post(self):
        """Post a comment on your own private text post"""
        comment_data = self.default_comment_data
        comment_data['author'] = self.author1.id
        self.author1_text_post.visibility = 'FRIENDS'
        self.author1_text_post.save()
        url = reverse('post-comments-list', kwargs={"post_id": self.author1_text_post.id})
        response = self.client.post(path=url,
                                    data=comment_data,
                                    **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                    format='json')
        self.assertFalse("error" in response.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_post_comment_on_other_author_private_post(self):
        """Post a comment on another author's private text post"""
        comment_data = self.default_comment_data
        comment_data['author'] = self.author1.id
        self.author2_text_post.visibility = 'FRIENDS'
        self.author2_text_post.save()
        url = reverse('post-comments-list', kwargs={"post_id": self.author2_text_post.id})
        response = self.client.post(path=url,
                                    data=comment_data,
                                    **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                    format='json')
        self.assertTrue("error" in response.data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_post_comment_on_other_author_private_post_when_following(self):
        """Post a comment on another author's private text post while following them"""
        comment_data = self.default_comment_data
        comment_data['author'] = self.author1.id
        self.author2_text_post.visibility = 'FRIENDS'
        self.author2_text_post.save()
        Follow.objects.create(follower=self.author1, followee=self.author2)
        url = reverse('post-comments-list', kwargs={"post_id": self.author2_text_post.id})
        response = self.client.post(path=url,
                                    data=comment_data,
                                    **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                    format='json')
        self.assertFalse("error" in response.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_post_comment_on_own_image_post(self):
        """Post a comment on your own image post"""
        comment_data = self.default_comment_data
        comment_data['author'] = self.author1.id
        url = reverse('post-comments-list', kwargs={"post_id": self.author1_image_post.id})
        response = self.client.post(path=url,
                                    data=comment_data,
                                    **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                    format='json')
        self.assertEqual(response.data['post']['id'], str(self.author1_image_post.id))
        self.assertEqual(response.data['comment'], comment_data['comment'])
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_post_comment_on_other_author_image_post(self):
        """Post a comment on another author's image post"""
        comment_data = self.default_comment_data
        comment_data['author'] = self.author1.id
        url = reverse('post-comments-list', kwargs={"post_id": self.author2_image_post.id})
        response = self.client.post(path=url,
                                    data=comment_data,
                                    **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                    format='json')
        self.assertEqual(response.data['post']['id'], str(self.author2_image_post.id))
        self.assertEqual(response.data['comment'], comment_data['comment'])
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_comments_on_post(self):
        """send a get request to post/<post_id>/comments/ to list all comments"""
        comment_data = self.default_comment_data
        comment_data['author'] = self.author2
        comment_data['post'] = self.author1_text_post
        Comment.objects.create(**comment_data)
        comment_data['comment'] = "this is another comment"
        Comment.objects.create(**comment_data)
        comment_data['comment'] = "this is the 3rd comment"
        Comment.objects.create(**comment_data)
        comment_data['comment'] = "this is the 4th comment"
        Comment.objects.create(**comment_data)
        comment_data['comment'] = "this is the 5th comment"
        Comment.objects.create(**comment_data)
        url = reverse('post-comments-list', kwargs={"post_id": self.author1_text_post.id})
        response = self.client.get(path=url,
                                   data=None,
                                   **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                   format='json'
                                   )
        self.assertEqual(len(response.data), 5)
        self.assertEqual(response.data[4]['comment'], comment_data['comment'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_specific_comment_onPost(self):
        """send a get request to post/<post_id>/comments/<comment_id> to get details of single comment"""
        comment_data = self.default_comment_data
        comment_data['author'] = self.author2
        comment_data['post'] = self.author1_text_post
        Comment.objects.create(**comment_data)
        comment_data['comment'] = "this is another comment"
        Comment.objects.create(**comment_data)
        comment_data['comment'] = "this is the 3rd comment"
        Comment.objects.create(**comment_data)
        comment_data['comment'] = "this is the 4th comment"
        Comment.objects.create(**comment_data)
        comment_data['comment'] = "this is the 5th comment"
        fifth_comment = Comment.objects.create(**comment_data)
        url = reverse('post-comments-detail', kwargs={"post_id": self.author1_text_post.id,
                                                      "pk": fifth_comment.id})
        response = self.client.get(path=url,
                                   data=None,
                                   **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                   format='json'
                                   )
        self.assertEqual(response.data['comment'], comment_data['comment'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_author_comments(self):
        """get a list of all of your own comments"""
        comment_data = self.default_comment_data
        comment_data['author'] = self.author1
        comment_data['post'] = self.author1_text_post
        Comment.objects.create(**comment_data)
        comment_data['comment'] = "this is another comment"
        Comment.objects.create(**comment_data)
        comment_data['post'] = self.author1_image_post
        comment_data['comment'] = "this is the 3rd comment"
        Comment.objects.create(**comment_data)
        comment_data['post'] = self.author2_text_post
        comment_data['comment'] = "this is the 4th comment"
        Comment.objects.create(**comment_data)
        comment_data['post'] = self.author2_image_post
        comment_data['comment'] = "this is the 5th comment"
        Comment.objects.create(**comment_data)
        url = reverse('author-comments-list', kwargs={"author_id": self.author1.id})
        response = self.client.get(path=url,
                                   data=None,
                                   **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                   format='json'
                                   )
        self.assertEqual(len(response.data), 5)
        self.assertEqual(response.data[4]['comment'], comment_data['comment'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_another_unfollowed_author_comments(self):
        """attempt to get a list of all of another author's comments who you are not following"""
        comment_data = self.default_comment_data
        comment_data['author'] = self.author2
        comment_data['post'] = self.author1_text_post
        Comment.objects.create(**comment_data)
        comment_data['comment'] = "this is another comment"
        Comment.objects.create(**comment_data)
        comment_data['post'] = self.author1_image_post
        comment_data['comment'] = "this is the 3rd comment"
        Comment.objects.create(**comment_data)
        comment_data['post'] = self.author2_text_post
        comment_data['comment'] = "this is the 4th comment"
        Comment.objects.create(**comment_data)
        comment_data['post'] = self.author2_image_post
        comment_data['comment'] = "this is the 5th comment"
        Comment.objects.create(**comment_data)
        url = reverse('author-comments-list', kwargs={"author_id": self.author2.id})
        response = self.client.get(path=url,
                                   data=None,
                                   **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                   format='json'
                                   )
        self.assertEqual(len(response.data), 0)  # no comments in response
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_another_followed_author_comments(self):
        """attempt to get a list of all of another author's comments who you are following"""
        comment_data = self.default_comment_data
        comment_data['author'] = self.author2
        comment_data['post'] = self.author1_text_post
        Comment.objects.create(**comment_data)
        comment_data['comment'] = "this is another comment"
        Comment.objects.create(**comment_data)
        comment_data['post'] = self.author1_image_post
        comment_data['comment'] = "this is the 3rd comment"
        Comment.objects.create(**comment_data)
        comment_data['post'] = self.author2_text_post
        comment_data['comment'] = "this is the 4th comment"
        Comment.objects.create(**comment_data)
        comment_data['post'] = self.author2_image_post
        comment_data['comment'] = "this is the 5th comment"
        Comment.objects.create(**comment_data)
        url = reverse('author-comments-list', kwargs={"author_id": self.author2.id})
        Follow.objects.create(follower=self.author1, followee=self.author2)
        response = self.client.get(path=url,
                                   data=None,
                                   **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                   format='json'
                                   )
        self.assertEqual(len(response.data), 5)  # 5 comments in response
        self.assertEqual(response.status_code, status.HTTP_200_OK)