from django.urls import path
from . import views

urlpatterns = [
    path('posts/create/', views.PostCreateAPIView.as_view(), name='post-create'),
    path('posts/<int:pk>/update/', views.PostUpdateAPIView.as_view(), name='post-update'),
    path('posts/<int:pk>/delete/', views.PostDeleteAPIView.as_view(), name='post-delete'),
]
