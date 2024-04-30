from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.status import HTTP_200_OK,HTTP_401_UNAUTHORIZED,HTTP_400_BAD_REQUEST,HTTP_404_NOT_FOUND,HTTP_204_NO_CONTENT

from snippets.models import Snippet
from accounts.models import User
from .serializers import SnippetSerializer
from root_app.settings import BASE_SNIPPETS_URL

import jwt

JWT_SECRET_KEY = 'AUTH'

@api_view(['GET'])
def TestAPI(req):
    return Response({"message":"Connection build with snippets api"})

@api_view(['GET', 'POST'])
def SnippetView(req):

    user = authenticate_request(req)

    if not user:
        return Response({'message': 'Unauthorized'}, status=HTTP_401_UNAUTHORIZED)
    
    if req.method == 'GET':
        snippets = Snippet.objects.filter(owner=user.id) # type: ignore
        serializer = SnippetSerializer(snippets,many=True)
        return Response(serializer.data,status=HTTP_200_OK)
    else:
        # req.data['url'] = BASE_SNIPPETS_URL
        req.data['owner'] = user.id # type: ignore

        serializer = SnippetSerializer(data=req.data,context={'request': req})
        if serializer.is_valid():
            serializer.save(owner=user)
            return Response(serializer.data, status=HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

@api_view(['GET' , 'PUT' , 'DELETE'])
def SnippetDetailView(req, str):

    client = req.headers.get('Origin') if req.headers.get('Origin') else BASE_SNIPPETS_URL 
    print("Client Host : " , client)


    try:
        snippet = Snippet.objects.filter(unique_address=str).first()
    except Snippet.DoesNotExist:
        return Response(status=HTTP_404_NOT_FOUND)
    
    user = authenticate_request(req)
    
    # print(snippet)
    # print(user)
    # print(snippet.owner)
    # print(user.id)

    isOwner = False
    if user and user == snippet.owner:
        isOwner = True

    if req.method == 'GET':
        return Response({
            "title": snippet.title,
            "code": snippet.code,
            "language": snippet.language,
            "url": f"{client}/{snippet.unique_address}",
            "isOwner": isOwner
        })
    


    if not user:
        return Response({'message': 'Unauthorized'}, status=HTTP_401_UNAUTHORIZED)


    if req.method == 'PUT':
        serializer = SnippetSerializer(snippet, data=req.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    
    if req.method == 'DELETE':
        snippet.delete()
        return Response(status=HTTP_204_NO_CONTENT)

def authenticate_request(request):
    print("Cookies : ", request.COOKIES);
    token = request.COOKIES.get('access')
    print("Token : ", token)
    if not token:
        return None
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=['HS256'])
        user = User.objects.get(pk=payload['id'])
        return user
    except jwt.ExpiredSignatureError:
        return None
    except jwt.DecodeError:
        return None
    except User.DoesNotExist:
        return None
