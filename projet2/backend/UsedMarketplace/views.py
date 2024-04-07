import json
from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.response import Response
from django.contrib.auth import authenticate, get_user_model, login, logout
from django.http import JsonResponse
from django.views.generic import View
from rest_framework.authtoken.models import Token
from .models import Post, Comment, User
from .serializers import CommentSerializer, PostSerializer, UserSerializer
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

class PostCreateAPIView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class PostUpdateAPIView(generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

class PostDeleteAPIView(generics.DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

class PostListAPIView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

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
    


# @method_decorator(csrf_exempt, name='dispatch')
# class CustomLoginView(View):
#     def post(self, request):
#         data = json.loads(request.body)
#         email = data.get('email')
#         password = data.get('password')

#         user = authenticate(request, username=email, password=password)  
#         if user is not None:
#             login(request, user)
#             return JsonResponse({'message': 'Login successful'}, status=200)
#         else:
#             return JsonResponse({'error': 'Invalid email or password'}, status=400)

        
        

# class CustomLogoutView(View):
#     def post(self, request):
#         logout(request)
#         return JsonResponse({'message': 'Logout successful'})


@csrf_exempt
@require_http_methods(["POST"])
def login_view(request):
    User = get_user_model()
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')
    print(username, password)
    try:

        user = User.objects.get(username=username)
        print(user.id)
    except User.DoesNotExist:

        return JsonResponse({"error": "Invalid credentials"}, status=400)

    if user.check_password(password):

        login(request, user)
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