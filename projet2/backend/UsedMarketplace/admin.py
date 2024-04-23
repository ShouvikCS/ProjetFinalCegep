from django.contrib import admin
from .models import User, Post, Image, Comment, CurrentUser

admin.site.register(User)
admin.site.register(Post)
admin.site.register(Image)
admin.site.register(Comment)
admin.site.register(CurrentUser)
