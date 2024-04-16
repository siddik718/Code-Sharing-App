
from rest_framework import serializers
from .models import Snippet

from root_app.settings import BASE_SNIPPETS_URL
import uuid,base64,hashlib

class SnippetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snippet
        fields = '__all__'
        extra_kwargs = {'owner': {'write_only': True}}
    
    def create(self, validated_data):
        code = validated_data.get('code')
        string_bytes = code.encode('utf-8')
        my_uuid = uuid.UUID(bytes=hashlib.md5(string_bytes).digest())
        encoded_uuid = base64.urlsafe_b64encode(my_uuid.bytes).decode('utf-8').rstrip('=')
        validated_data['unique_address'] = encoded_uuid
        return super().create(validated_data)