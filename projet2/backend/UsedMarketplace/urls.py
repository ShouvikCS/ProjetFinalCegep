from django.urls import path
from . import views

urlpatterns = [
    path('posts/create/', views.PostCreateAPIView, name='post-create'),
    path('posts/<int:pk>/update/', views.PostUpdateAPIView.as_view(), name='post-update'),
    path('posts/<int:pk>/delete/', views.PostDeleteAPIView.as_view(), name='post-delete'),
    path('posts/', views.PostListAPIView.as_view(), name='post-list'), 
    path('posts/<int:pk>/', views.PostDetailAPIView.as_view(), name='post-detail'),  
    path('posts/<int:pk>/comments/', views.CommentListAPIView.as_view(), name='post-comments'),  
    path('user/<int:pk>/posts/', views.UserPostListAPIView.as_view(), name='user-post-list'), 
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('signup/', views.signup_view, name='signup'),
    path('current_user/', views.current_user, name='current_user'),
    path('posts/<int:post_id>/images/', views.PostImagesView.as_view(), name='post-images'),
    path('posts/<int:post_id>/addcomment/', views.add_comment_to_post, name='add-comment'),
    path('messages/create/', views.create_message, name='create-message'),
    path('messages/<int:user_id>/', views.ConversationView.as_view(), name='get-conversation'),
]
