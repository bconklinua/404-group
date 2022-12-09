from django.test import TestCase
from rest_framework.exceptions import ErrorDetail

from User.models import Author
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework_simplejwt.tokens import RefreshToken
from six import text_type


class AuthorsTestCase(TestCase):
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


    @staticmethod
    def get_mock_author_data():
        return {
            "email": "testemail@email.com",
            "username": "test_username",
            "password": "test_password",
            "first_name": "test_first_name",
            "last_name": "test_last_name",
            "is_staff": False,
            "is_superuser": False,
        }

    @staticmethod
    def get_alternate_mock_author_data():
        return {
            "email": "testemail2@email.com",
            "username": "test_username2",
            "password": "test_password2",
            "first_name": "test_first_name2",
            "last_name": "test_last_name2",
            "is_staff": False,
            "is_superuser": False,
        }

    def test_create_new_author_local(self):
        """New author is created via objects.create()"""
        author_data = self.get_mock_author_data()
        author = Author.objects.create(email=author_data['email'],
                                       username=author_data['username'],
                                       password=author_data['password'])
        author.save()
        self.assertEqual(author.username, author_data['username'])

    def test_register_new_author(self):
        """New author is created via api/auth/register"""
        author_data = self.get_mock_author_data()
        register_url = reverse('register')
        response = self.client.post(register_url, author_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['username'], author_data['username'])

    def test_register_author_without_email(self):
        """Reject registration without an email"""
        post_data = self.get_mock_author_data()
        post_data['email'] = ""
        url = reverse('register')
        response = self.client.post(url, post_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register_author_without_username(self):
        """Reject registration without a username"""
        post_data = self.get_mock_author_data()
        post_data['username'] = ""
        url = reverse('register')
        response = self.client.post(url, post_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register_author_with_duplicate_email(self):
        """Reject Registration with Duplicate Email"""
        post_data1 = self.get_mock_author_data()
        post_data2 = self.get_alternate_mock_author_data()
        post_data2['email'] = post_data1['email']
        url = reverse('register')
        self.client.post(url, post_data1, format='json')
        response = self.client.post(url, post_data2, format='json')
        self.assertEqual(response.data['email'][0].code, "unique")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_check_authentication_with_jwt(self):
        """Check the api/auth/test with a valid jwt token"""
        url = reverse('test_login')
        response = self.client.get(path=url,
                                   data=None,
                                   **{'HTTP_AUTHORIZATION': f'Bearer {self.access1}'},
                                   format='json')
        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)
        self.assertEqual(response.data, "authenticated")

    def test_check_authentication_with_invalid_jwt(self):
        """Check the api/auth/test rejects an invalid jwt token"""
        url = reverse('test_login')
        bad_token = self.access1 + "abc"
        response = self.client.get(path=url,
                                   data=None,
                                   **{'HTTP_AUTHORIZATION': f'Bearer {bad_token}'},
                                   format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertNotEqual(response.data, "authenticated")

    def test_login_with_valid_email_password(self):
        """Attempt login to api/auth/login with valid email/password"""
        url = reverse('login')
        my_post_data = {"email": "author1@email.com",
                        "password": "testpassword"}
        response = self.client.post(path=url, data=my_post_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)

    def test_login_with_invalid_email_password(self):
        """Attempt login to api/auth/login with invalid email/password"""
        url = reverse('login')
        my_post_data = {"email": "author1@email.com",
                        "password": "test_wrong_password"}
        response = self.client.post(path=url, data=my_post_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_token_with_valid_login_data(self):
        """Attempt to generate a token at api/auth/token/obtain with valid email/password"""
        url = reverse('token_create')
        my_post_data = {"email": "author1@email.com",
                        "password": "testpassword"}
        response = self.client.post(path=url, data=my_post_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue("refresh" in response.data)
        self.assertTrue("access" in response.data)

    def test_create_token_with_invalid_login_data(self):
        """Attempt to generate a token at api/auth/token/obtain with valid email/password"""
        url = reverse('token_create')
        my_post_data = {"email": "author1@email.com",
                        "password": "test_wrong_password"}
        response = self.client.post(path=url, data=my_post_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertFalse("refresh" in response.data)
        self.assertFalse("access" in response.data)

    def test_refresh_token_with_valid_jwt(self):
        """attempt to refresh a valid jwt token at api/auth/token/refresh"""
        url = reverse('token_refresh')
        post_data = {"refresh": self.refresh1}
        response = self.client.post(path=url, data=post_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue("refresh" in response.data)
        self.assertTrue("access" in response.data)

    def test_refresh_token_with_invalid_jwt(self):
        """attempt to refresh an invalid jwt token at api/auth/token/refresh"""
        url = reverse('token_refresh')
        post_data = {"refresh": self.refresh1 + 'abc'}
        response = self.client.post(path=url, data=post_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertFalse("refresh" in response.data)
        self.assertFalse("access" in response.data)