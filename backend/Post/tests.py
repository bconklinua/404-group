import json
from django.test import TestCase
from User.models import Author
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework_simplejwt.tokens import RefreshToken
from six import text_type
from Post.models import Post


def get_temporary_png_image():
    import tempfile
    from PIL import Image

    image = Image.new('RGB', (100, 100))
    tmp_file = tempfile.NamedTemporaryFile(suffix='.png', prefix="test_img_")
    image.save(tmp_file, 'png')
    tmp_file.seek(0)
    return tmp_file


def get_temporary_jpeg_image():
    import tempfile
    from PIL import Image

    image = Image.new('RGB', (100, 100))
    tmp_file = tempfile.NamedTemporaryFile(suffix='.jpeg', prefix="test_img_")
    image.save(tmp_file, 'jpeg')
    tmp_file.seek(0)
    return tmp_file


class PostTestCase(TestCase):
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

    def get_mock_post_data(self):
        return {
            "type": "post",
            "author": self.author1.id,
            "title": "my post title",
            "source": "my_source",
            "origin": "my_origin",
            "description": "my description",
            "contentType": "text/plain",
            "content": "content of a test post",
            "visibility": "PUBLIC",
            "unlisted": False
        }

    def test_get_posts_with_no_posts(self):
        """check your posts when you have none to get an empty list"""
        url=reverse('posts-list')
        response = self.client.get(path=url,
                                   data=None,
                                   **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                   format='json')
        self.assertEqual(response.data, [])
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_text_plain_post(self):
        """create a basic text/plain post"""
        url=reverse('posts-list')
        my_data = self.get_mock_post_data()
        response = self.client.post(path=url,
                                    data=my_data,
                                    **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                    format='json')
        self.assertEqual(response.data['contentType'], 'text/plain')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_text_markdown_post(self):
        """create a basic markdown post"""
        url=reverse('posts-list')
        my_data = self.get_mock_post_data()
        my_data['contentType'] = "text/markdown"
        response = self.client.post(path=url,
                                    data=my_data,
                                    **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                    format='json')
        self.assertEqual(response.data['contentType'], 'text/markdown')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_application_base64_post(self):
        """create a basic application base64 post"""
        url=reverse('posts-list')
        my_data = self.get_mock_post_data()
        my_data['contentType'] = "application/base64"
        response = self.client.post(path=url,
                                    data=my_data,
                                    **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                    format='json')
        self.assertEqual(response.data['contentType'], 'application/base64')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_image_png_post(self):
        """create a basic png image post"""
        url=reverse('posts-list')
        my_data = self.get_mock_post_data()
        my_data['contentType'] = "image/png;base64"
        image = get_temporary_png_image()
        my_data.update({"image": image})
        response = self.client.post(path=url,
                                    data=my_data,
                                    **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                    format='json')

        # Delete the temporary image created from posting to endpoint
        image_obj = Post.objects.get(id=response.data['id'])
        storage = image_obj.image.storage
        path = image_obj.image.path
        storage.delete(path)

        self.assertEqual(response.data['contentType'], 'image/png;base64')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_image_jpg_post(self):
        """create a basic jpeg image post"""
        url=reverse('posts-list')
        my_data = self.get_mock_post_data()
        my_data['contentType'] = "image/jpeg;base64"
        image = get_temporary_jpeg_image()
        my_data.update({"image": image})
        response = self.client.post(path=url,
                                    data=my_data,
                                    **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                    format='json')

        # Delete the temporary image created from posting to endpoint
        image_obj = Post.objects.get(id=response.data['id'])
        storage = image_obj.image.storage
        path = image_obj.image.path
        storage.delete(path)

        self.assertEqual(response.data['contentType'], 'image/jpeg;base64')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_text_plain_post(self):
        """get posts list and see our post in the first index with text/plain content"""
        post_data = self.get_mock_post_data()
        post_data['author'] = self.author1
        Post.objects.create(**post_data)
        url = reverse('posts-list')
        response = self.client.get(path=url,
                                   data=None,
                                   **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                   format='json')
        self.assertNotEqual(response.data, [])
        self.assertEqual(response.data[0]['contentType'], 'text/plain')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_text_markdown_post(self):
        """get posts list and see our post in the first index with text/markdown content"""
        post_data = self.get_mock_post_data()
        post_data['author'] = self.author1
        post_data['contentType'] = "text/markdown"
        Post.objects.create(**post_data)
        url = reverse('posts-list')
        response = self.client.get(path=url,
                                   data=None,
                                   **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                   format='json')
        self.assertNotEqual(response.data, [])
        self.assertEqual(response.data[0]['contentType'], 'text/markdown')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_application_base_64_post(self):
        """get posts list and see our post in the first index with application/base64 content"""
        post_data = self.get_mock_post_data()
        post_data['author'] = self.author1
        post_data['contentType'] = "application/base64"
        Post.objects.create(**post_data)
        url = reverse('posts-list')
        response = self.client.get(path=url,
                                   data=None,
                                   **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                   format='json')
        self.assertNotEqual(response.data, [])
        self.assertEqual(response.data[0]['contentType'], 'application/base64')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_png_image_post(self):
        """get posts list and see our post in the first index with image/png content"""
        post_data = self.get_mock_post_data()
        post_data['author'] = self.author1
        post_data['contentType'] = "image/png;base64"
        image = get_temporary_png_image()
        Post.objects.create(image=image.name, **post_data)
        url = reverse('posts-list')
        response = self.client.get(path=url,
                                   data=None,
                                   **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                   format='json')

        self.assertNotEqual(response.data, [])
        self.assertEqual(response.data[0]['contentType'], 'image/png;base64')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_jpeg_image_post(self):
        """get posts list and see our post in the first index with image/jpeg content"""
        post_data = self.get_mock_post_data()
        post_data['author'] = self.author1
        post_data['contentType'] = "image/jpeg;base64"
        image = get_temporary_jpeg_image()
        Post.objects.create(image=image.name, **post_data)
        url = reverse('posts-list')
        response = self.client.get(path=url,
                                   data=None,
                                   **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                   format='json')

        self.assertNotEqual(response.data, [])
        self.assertEqual(response.data[0]['contentType'], 'image/jpeg;base64')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_post_by_id(self):
        """get post by id"""
        post_data = self.get_mock_post_data()
        post_data['author'] = self.author1
        my_post = Post.objects.create(**post_data)
        url = reverse('posts-detail', kwargs={"pk": my_post.id})
        response = self.client.get(path=url,
                                   data=None,
                                   **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                   format='json')
        self.assertNotEqual(response.data, [])
        self.assertEqual(response.data['author']['id'], str(self.author1.id))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_post(self):
        """send a patch request to posts/<pk>/ to change the title"""
        post_data = self.get_mock_post_data()
        post_data['author'] = self.author1
        my_post = Post.objects.create(**post_data)
        my_patch = json.dumps({"title": "my new title"})
        url = reverse('posts-detail', kwargs={"pk": my_post.id})
        response = self.client.patch(path=url,
                                     data=my_patch,
                                     **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                     format='json',
                                     content_type='application/json')
        self.assertEqual(response.data['title'], 'my new title')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
