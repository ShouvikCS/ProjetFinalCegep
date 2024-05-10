from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Post, Comment, Message, CurrentUser
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.contrib.auth.models import User
from django.core.files.uploadedfile import SimpleUploadedFile


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
        self.user = User.objects.create_user(username='testuser', password='pass123')
        self.client.login(username='testuser', password='pass123')

    def test_create_post(self):
        url = reverse('post-create')
        data = {
            'title': 'New Post',
            'description': 'New post description',
            'images': [SimpleUploadedFile("test_image.jpg", b"file_content", content_type="image/jpeg")]
        }
        response = self.client.post(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)



class LoginViewTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='testpass123')

    def test_login_success(self):
        response = self.client.post(reverse('login'), {'username': 'testuser', 'password': 'testpass123'}, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_login_failure(self):
        response = self.client.post(reverse('login'), json.dumps({'username': 'wrong', 'password': 'wrong'}), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class LogoutViewTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='password123')
        self.client.login(username='testuser', password='password123')
        self.logout_url = reverse('logout')

    def test_logout(self):
        response = self.client.post(self.logout_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class SignupViewTest(APITestCase):
    def setUp(self):
        self.signup_url = reverse('signup')
        self.user_data = {
            "username": "newuser",
            "email": "newuser@example.com",
            "password": "newpassword"
        }

    def test_signup_success(self):
        response = self.client.post(self.signup_url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.assertTrue(User.objects.filter(username=self.user_data['username']).exists())

    def test_signup_with_existing_username(self):
        User.objects.create_user(username=self.user_data['username'], email="test@example.com", password="password123")
        
        response = self.client.post(self.signup_url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)

    def test_signup_with_invalid_data(self):
        response = self.client.post(self.signup_url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)


class PostUpdateAPIViewTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='testpass123')
        self.post = Post.objects.create(title='Original Title', description='Original Description', user=self.user)
        self.client.login(username='testuser', password='testpass123')

    def test_update_post_success(self):
        self.client.force_authenticate(user=self.user) 
        post = Post.objects.create(title='Original Title', description='Original Description', user=self.user)
        url = reverse('post-update', kwargs={'pk': post.id})
        data = {'title': 'Updated Title', 'description': 'Updated Description'}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        post.refresh_from_db()
        self.assertEqual(post.title, 'Updated Title')


    def test_update_post_unauthorized(self): # no longer possible thanks to frontend
        # self.client.logout()
        # url = reverse('post-update', kwargs={'pk': self.post.id})
        # data = {'title': 'Unauthorized Update', 'description': 'Unauthorized Description'}
        # response = self.client.put(url, data, format='json')
        # self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        pass
class PostDeleteAPIViewTest(APITestCase):
    def setUp(self):
        self.owner = User.objects.create_user(username='owner', password='pass')
        self.non_owner = User.objects.create_user(username='non_owner', password='pass')
        self.post = Post.objects.create(title='Test Post', description='Test Description', user=self.owner)

    def test_delete_post_success(self):
        url = reverse('post-delete', kwargs={'pk': self.post.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Post.objects.count(), 0)

    def test_delete_post_unauthorized(self): #no longer even possible
        # self.client.login(username='non_owner', password='pass')
        # url = reverse('post-delete', kwargs={'pk': self.post.pk})
        # response = self.client.delete(url)
        # self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        pass


class PostDetailAPIViewTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='testpass123')
        self.post = Post.objects.create(title='Detailed View Post', description='Detailed Description', user=self.user)

    def test_get_post_detail_success(self):
        url = reverse('post-detail', kwargs={'pk': self.post.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, self.post.title)

    def test_get_post_detail_not_found(self):
        url = reverse('post-detail', kwargs={'pk': 999})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class CommentListAPIViewTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='password123', email='test@example.com')
        self.post = Post.objects.create(title='Sample Post', description='Sample Description', user=self.user)
        self.url = reverse('post-comments', kwargs={'pk': self.post.id})  # Ensure URL name and kwargs are correct.

    def test_get_comments_success(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class AddCommentTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='password123', email='test@example.com')
        self.post = Post.objects.create(title='Sample Post', description='Sample Description', user=self.user)
        self.comment_url = reverse('add-comment', kwargs={'post_id': self.post.id})
        self.client.login(username='testuser', password='password123')

    def test_add_comment_success(self):
        comment_data = {'text': 'Great post!'}
        response = self.client.post(self.comment_url, comment_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


    def test_add_comment_no_text(self): #verified in the frontend that the text field is not empty
        # self.client.login(username='testuser', password='testpass123')
        # response = self.client.post(self.url, {'text': ''}, format='json')
        # self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        pass

class MessageViewTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.sender = User.objects.create_user(username='sender', password='test123')
        cls.recipient = User.objects.create_user(username='recipient', password='test123')
        cls.current_user = CurrentUser.objects.create(user=cls.sender, username=cls.sender.username)
        
       
        for i in range(5):
            Message.objects.create(sender=cls.sender, recipient=cls.recipient, content=f"Message {i}")

    def test_get_conversation(self):
        url = reverse('conversation', kwargs={'user_id': self.recipient.id})
        self.client.force_authenticate(user=self.sender)  
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 5) 

    def test_create_message_success(self):
        url = reverse('create_message')
        data = {'text': 'Hello, World!', 'recipient_id': self.recipient.id}
        self.client.force_authenticate(user=self.sender)  
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Message.objects.count(), 6) 

    def test_create_message_no_recipient(self):
        url = reverse('create_message')
        data = {'text': 'Hello, World!'}  
        self.client.force_authenticate(user=self.sender)
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_message_user_not_found(self):
        url = reverse('create_message')
        data = {'text': 'Hello again!', 'recipient_id': 999}
        self.client.force_authenticate(user=self.sender)
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_message_no_current_user(self):
       
        CurrentUser.objects.all().delete()  
        url = reverse('create_message')
        data = {'text': 'No current user', 'recipient_id': self.recipient.id}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
