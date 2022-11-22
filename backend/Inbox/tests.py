from django.test import TestCase
from Inbox.models import Inbox
from User.models import Author
from Follow.models import Follow
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework_simplejwt.tokens import RefreshToken
from six import text_type
from Post.models import Post
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

        # set up environment such that author1 is following author2
        Follow.objects.create(follower=author1, followee=author2)

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

    def test_inbox_shows_own_posts(self):
        """Someone who is not following anyone else should see their own posts in inbox"""
        inbox_query = Inbox.objects.get(author=self.author2).posts.all()
        inbox_posts = []
        for each in inbox_query:
            inbox_posts.append(each)
        self.assertEqual(len(inbox_posts), 2)
        self.assertEqual(inbox_posts[0].author.username, self.author2.username)
        self.assertEqual(inbox_posts[1].author.username, self.author2.username)

    def test_inbox_shows_posts_from_followed_author(self):
        """Check inbox when someone that is being followed makes posts"""
        inbox_query = Inbox.objects.get(author=self.author1).posts.all()
        inbox_posts = []
        for each in inbox_query:
            inbox_posts.append(each)
        self.assertEqual(len(inbox_posts), 4)

        found_friend_post = False
        for post in inbox_posts:
            if post.author == self.author2:
                found_friend_post = True

        self.assertTrue(found_friend_post)
        self.assertEqual(len(inbox_posts), 4)

    def test_get_inbox_from_endpoint(self):
        """retrieve the author's inbox by sending a get request to endpoint"""
        url = reverse('inbox', kwargs={"author_id": self.author1.id})
        response = self.client.get(path=url,
                                   data=None,
                                   **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                   format='json')
        inbox_author = response.data[0]['author']
        posts_list = response.data[0]['posts']
        likes_list = response.data[0]['likes']
        comments_list = response.data[0]['comments']
        self.assertEqual(inbox_author, self.author1.id)
        self.assertEqual(len(posts_list), 4)
        self.assertEqual(len(likes_list), 0)
        self.assertEqual(len(comments_list), 0)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    '''
    Likes in inbox not implemented yet
    
    def test_likes_in_inbox_from_endpoint(self):
        """retrieve the author's inbox by sending a get request to endpoint"""
        url = reverse('inbox', kwargs={"author_id": self.author1.id})
        response = self.client.get(path=url,
                                   data=None,
                                   **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                   format='json')
        Like.objects.create(author=self.author2, post=self.author1_text_post)
        inbox_author = response.data[0]['author']
        posts_list = response.data[0]['posts']
        likes_list = response.data[0]['likes']
        comments_list = response.data[0]['comments']
        self.assertEqual(inbox_author, self.author1.id)
        self.assertEqual(len(posts_list), 4)
        self.assertEqual(len(likes_list), 1)
        self.assertEqual(len(comments_list), 0)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    '''