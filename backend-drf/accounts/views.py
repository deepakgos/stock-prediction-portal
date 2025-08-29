from django.shortcuts import render
from .serializers import UserSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny

# Create your views here.
class RegisterView(generics.CreateAPIView): # CreateAPIView provides a post method handler for creating model instances
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Allow any user (authenticated or not) to access this view    

#     Explanation

# serializer_class → tells DRF which serializer to use when creating users.

# serializer (what you wrote) → DRF ignores it, so it thought no serializer was provided, hence the AssertionError.