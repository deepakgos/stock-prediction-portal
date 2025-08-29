from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8, style={'input_type':'password'}) # write_only=True ensures that the password is not included in the serialized representation when retrieving user data
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        #User.objects.create_user() handles password hashing automaitically
        #User.objects.create() would store the password as plain text
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password']
        )
        # user = User.objects.create_user(**validated_data) # alternative way
        return user

# Serializers are tools provided by Django REST Framework to convert complex data types, such as Django models, into native Python datatypes that can then be easily rendered into JSON, XML, or other content types.
# They help convert complex data types such as querysets and model instances to native Python datatypes that can then be easily rendered into JSON, XML or other content types.
# They also provide deserialization, allowing parsed data to be converted back into complex types, after first validating the incoming data.
# For Django websites → Model → View → Template → URL
# For Django REST API → Model → Serializer → View → URL → JSON Response