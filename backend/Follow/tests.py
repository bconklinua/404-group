from django.test import TestCase
from User.models import Author
from Follow.models import Follow
from FriendRequest.models import FriendRequest
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