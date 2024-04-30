from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.status import HTTP_200_OK,HTTP_400_BAD_REQUEST,HTTP_404_NOT_FOUND,HTTP_401_UNAUTHORIZED

from accounts.serializers import SignupSerializer
from accounts.models import User

import jwt,datetime
JWT_SECRET_KEY = 'AUTH'

@api_view(['GET'])
def TestAPI(req):
    print(req.data)
    return Response({
        "Message" : "Connection Build"
    },status=HTTP_200_OK)

@api_view(['POST'])
def RegisterView(req):
    serializer = SignupSerializer(data=req.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response({
        "Message" : "Sign Up Successfull",
        # "Data": serializer.data
    },status=HTTP_200_OK)

@api_view(['POST'])
def LoginView(req):
    print(req.headers.get('Origin'))
    email = req.data.get('email')
    password = req.data.get('password')
    if not email or not password:
        return Response({
            "message": "Validation Data Missing",
            "required-data": "password , email"
        },status=HTTP_400_BAD_REQUEST)

    user = User.objects.filter(email=email).first()

    if not user or not user.check_password(password):
        return Response({
            "message": "Invalid Credentials"
        }, status=HTTP_404_NOT_FOUND)

    payload = {
        'id': user.id,
        'username': user.username,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
        "iat": datetime.datetime.utcnow(),
    }

    token = jwt.encode(payload, JWT_SECRET_KEY)
    response = Response()
    response.data = {"access_key": token}
    response.set_cookie(key="test", value='test', secure=True, httponly=True)
    response.set_cookie(key='access', value=token, httponly=True)
    return response

@api_view(['POST'])
def logoutView(req):
    response = Response({'message': 'Logout Successful'})
    response.delete_cookie('access')
    return response

@api_view(['GET'])
def AllAccounts(req):
    token = req.COOKIES.get('access')

    if not token:
        return Response({'message': 'No Access Token Found'}, status=HTTP_401_UNAUTHORIZED)
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=['HS256'])
        user = User.objects.get(pk=payload['id'])
    except jwt.ExpiredSignatureError:
        return Response({
            'message': 'JWT Expired'
            }, status=HTTP_401_UNAUTHORIZED)
    except jwt.DecodeError:
        return Response({
            'message': 'Invalid JWT'
            }, status=HTTP_401_UNAUTHORIZED)
    except User.DoesNotExist:
        return Response({
            'message': 'No User Found'
            }, status=HTTP_404_NOT_FOUND)

    if not user.is_superuser or not user.is_staff:
        return Response({
            'message': 'You Are Not Authorized'
        },status=HTTP_401_UNAUTHORIZED)

    users = User.objects.all()
    serializer = SignupSerializer(users,many=True)
    return Response(serializer.data,status=HTTP_200_OK)


