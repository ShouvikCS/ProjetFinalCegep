from django.urls import path
from . import views

urlpatterns = [
    path('posts/create/', views.PostCreateAPIView.as_view(), name='post-create'),
    path('posts/<int:pk>/update/', views.PostUpdateAPIView.as_view(), name='post-update'),
    path('posts/<int:pk>/delete/', views.PostDeleteAPIView.as_view(), name='post-delete'),
    path('posts/', views.PostListAPIView.as_view(), name='post-list'), 
    path('posts/<int:pk>/', views.PostDetailAPIView.as_view(), name='post-detail'),  
    path('posts/<int:pk>/comments/', views.CommentListAPIView.as_view(), name='post-comments'),  
    path('user/<int:pk>/posts/', views.UserPostListAPIView.as_view(), name='user-post-list'), 
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('signup/', views.CustomSignupView.as_view(), name='signup'),
]
