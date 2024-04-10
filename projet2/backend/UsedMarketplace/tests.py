from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Post, Comment
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.contrib.auth.models import User

User = get_user_model() 

class PostModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        user = User.objects.create_user(username='testuser', password='12345', email='user@example.com')  # Assuming email is required
        Post.objects.create(title='A Test Title', description='Test Description', user=user)

    def test_post_content(self):
        post = Post.objects.get(id=1)
        expected_user = f'{post.user.username}'
        expected_title = f'{post.title}'
        self.assertEquals(expected_user, 'testuser')
        self.assertEquals(expected_title, 'A Test Title')

class PostCreateAPIViewTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='pass', email='user@example.com')  # Assuming email is required
        self.client.login(username='testuser', password='pass')

    def test_create_post(self):
        url = reverse('post-create')
        data = {'title': 'New Post', 'description': 'New post description'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class LoginViewTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='testpass123')

    def test_login_success(self):
        response = self.client.post(reverse('login'), {'username': 'testuser', 'password': 'testpass123'}, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_login_failure(self):
        response = self.client.post(reverse('login'), {'username': 'wrong', 'password': 'wrong'}, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class LogoutViewTest(APITestCase):
    def test_logout(self):
       #not done yet
        pass

class SignupViewTest(APITestCase):
    def test_signup(self):
        # not done
        pass
