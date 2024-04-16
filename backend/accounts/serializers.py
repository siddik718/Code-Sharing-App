from rest_framework import serializers
from accounts.models import User
from django.contrib.auth.hashers import make_password
    
class SignupSerializer(serializers.ModelSerializer):

    first_name = serializers.CharField(required=True)
    last_name  = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'password']
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)



