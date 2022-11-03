from django.test import TestCase
from apps.User.models import Author
from rest_framework import status
from rest_framework.reverse import reverse


class AuthorsTestCase(TestCase):

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

    def test_register_author_with_duplicate_username(self):
        """Reject Registration with Duplicate Username"""
        post_data1 = self.get_mock_author_data()
        post_data2 = self.get_alternate_mock_author_data()
        post_data2['username'] = post_data1['username']
        url = reverse('register')
        self.client.post(url, post_data1, format='json')
        response = self.client.post(url, post_data2, format='json')
        self.assertEqual(response.data['username'][0].code, "unique")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
