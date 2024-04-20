from rest_framework import serializers
from .models import User, Post, Image, Comment
from django.contrib.auth import get_user_model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'image', 'post']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'text', 'user', 'post']

class PostSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'title', 'description', 'user', 'images', 'comments']

    def create(self, validated_data):
        # Extract user_id from validated_data and then remove it
        user_id = validated_data.pop('user_id', None)
        if user_id:
            user = get_user_model().objects.get(id=user_id)  # Retrieve the User instance
            validated_data['user'] = user
        return super(PostSerializer, self).create(validated_data)