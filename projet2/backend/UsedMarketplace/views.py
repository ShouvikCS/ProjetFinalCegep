import json
from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.response import Response
from django.contrib.auth import authenticate, get_user_model, login, logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.generic import View
from rest_framework.authtoken.models import Token
from .models import CurrentUser, Post, Comment, User, Image
from .serializers import CommentSerializer, PostSerializer, UserSerializer, ImageSerializer
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

class PostCreateAPIView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class PostUpdateAPIView(generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.AllowAny]

class PostDeleteAPIView(generics.DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.AllowAny]

class PostListAPIView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        for post in queryset:
            print(f"Post ID: {post.id} belongs to User: {post.user.username}")
            print(f"current user {request.user}")
            print(f"is_authenticated {request.user.is_authenticated}")

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class PostDetailAPIView(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class CommentListAPIView(generics.ListAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        post_id = self.kwargs['pk']
        return Comment.objects.filter(post_id=post_id)

class UserPostListAPIView(generics.ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        user_id = self.kwargs['pk']
        return Post.objects.filter(user_id=user_id)
    

@csrf_exempt
@require_http_methods(["POST"])
def login_view(request):

    if request.user.is_authenticated:
        print("Attempt to log in when already authenticated")
        return JsonResponse({"error": "Logout before logging in again."}, status=400)

    User = get_user_model()
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')
    print(username, password)
    try:
        user = authenticate(username='username', password='password')
        user = User.objects.get(username=username)
       
        print(user.id)
    except User.DoesNotExist:

        return JsonResponse({"error": "User does not exist"}, status=400)
    user.set_password(password)
    if user.check_password(password):

        login(request, user)
        print(request.user, "request.user")

        CurrentUser.objects.update_or_create(
            user_id=user.id,
            defaults={'username': user.username, 'logged_in': True}
        )

        return JsonResponse({"message": "Login successful"}, status=200)
    else:
        return JsonResponse({"error": "Invalid credentials"}, status=400)
    


    
@require_http_methods(["POST"])
def logout_view(request):
    logout(request)
    return JsonResponse({"message": "Logged out successfully"}, status=200)


class CustomSignupView(View):
    def post(self, request):
        return JsonResponse({'message': 'Signup successful'})
    
    

#@login_required
def current_user(request):
    try:
        current_user = CurrentUser.objects.first()
        if current_user and current_user.logged_in:
            return JsonResponse({
                'id': current_user.user_id,
                'username': current_user.username
            })
        else:
            return JsonResponse({'error': 'No currently logged-in user'}, status=404)
    except CurrentUser.DoesNotExist:
        return JsonResponse({'error': 'No user data available'}, status=404)



class PostImagesView(View):
    def get(self, request, post_id):
        images = Image.objects.filter(post_id=post_id)
        serializer = ImageSerializer(images, many=True)
        return Response(serializer.data)