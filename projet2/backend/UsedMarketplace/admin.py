from django.contrib import admin
from .models import User, Post, Image, Comment, CurrentUser, Message

admin.site.register(User)
admin.site.register(Post)
admin.site.register(Image)
admin.site.register(Comment)
admin.site.register(CurrentUser)
admin.site.register(Message)
