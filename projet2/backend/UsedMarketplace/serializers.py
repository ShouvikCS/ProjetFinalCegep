from rest_framework import serializers
from .models import User, Post, Image, Comment, Message
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
        fields = ['id', 'text', 'post', 'user']  # Include more fields as necessary
        extra_kwargs = {
            'user': {'read_only': True}
        }

    def create(self, validated_data):
        return Comment.objects.create(**validated_data)

class PostSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'title', 'description', 'user', 'images', 'comments']

    def create(self, validated_data):
        user_id = validated_data.pop('user_id', None)
        if user_id:
            user = get_user_model().objects.get(id=user_id) 
            validated_data['user'] = user
        return super(PostSerializer, self).create(validated_data)
    
class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    recipient = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Message
        fields = ['id', 'sender', 'recipient', 'content', 'timestamp']

    def create(self, validated_data):
        return Message.objects.create(**validated_data)
    