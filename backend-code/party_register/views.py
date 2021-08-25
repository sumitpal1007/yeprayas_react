from rest_framework.views import APIView
from rest_framework import viewsets, status, parsers
from rest_framework.response import Response
from .models import Party
#from .models import PartyRegister
from .serializers import PartySerializer
from .models import File
from .serializers import FileSerializer
# from .serializers import PartyRegisterSerializer
from django.db import transaction
from rest_framework.exceptions import ParseError

class LoginAPIView(APIView):
    @transaction.atomic
    def post(self, request, *args, **kwargs):
        try:
            if request.data.get('email') is not None and request.data.get('password') is not None:
                
                parties = Party.objects.all().filter(email=request.data.get('email')).filter(password = request.data.get('password'))

                if len(parties)==1 and parties[0] is not None:
                  
                    serializer = PartySerializer(parties[0])

                    return Response({
                        'success': True,
                        'data': serializer.data
                    }, status=status.HTTP_200_OK)
                else:
                    return Response({
                    'success': False,
                    'message': 'Unauthorized Request'
                }, status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Response({
                    'success': False,
                    'message': 'Invalid Request'
                }, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({
                    'success': False,
                    'message': 'INTERNAL_SERVER_ERROR'
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class PartyAPIView(APIView):

    def get(self, request):
        try:
            if 'party_id' in request.query_params and request.query_params["party_id"] != "":
                party_id = request.query_params["party_id"]
                party = Party.objects.get(party_id=party_id)
                serializer = PartySerializer(party)

                return Response({
                    'success': True,
                    'data': serializer.data
                }, status=status.HTTP_200_OK)
            else:
                parties = Party.objects.all()
                serializer = PartySerializer(parties, many=True)
                return Response({
                    'success': True,
                    'data': serializer.data
                }, status=status.HTTP_200_OK)
                
        except:
            return Response({
                    'success': False,
                    'message': 'INTERNAL_SERVER_ERROR'
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @transaction.atomic
    def post(self, request, *args, **kwargs):
        try:
            if request.data.get('name') is not None and request.data.get('email') is not None and request.data.get('password') is not None and request.data.get('contact_number') is not None and request.data.get('company_name') is not None:
                party = Party(email=request.data.get('email'), password=request.data.get('password'), name=request.data.get('name'), contact_number=request.data.get('contact_number'), company_name=request.data.get('company_name'))
                party.save()

                serializer = PartySerializer(party)

                return Response({
                    'success': True,
                    'data': serializer.data
                }, status=status.HTTP_201_CREATED)
            else:
                return Response({
                    'success': False,
                    'message': 'Invalid Request'
                }, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({
                    'success': False,
                    'message': 'INTERNAL_SERVER_ERROR'
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
              
    @transaction.atomic
    def patch(self, request, *args, **kwargs):
        try:
            party_id = request.query_params["party_id"]
            if party_id is not None and party_id != "":
                party = Party.objects.get(party_id=party_id)

                data = request.data

                party.name = data.get("name", party.name)
                party.contact_number = data.get("contact_number", party.contact_number)
                party.company_name = data.get("company_name", party.company_name)
                party.email = data.get("email", party.email)
                party.status = data.get("status", party.status)

                party.save()

                serializer = PartySerializer(party)

                return Response({
                    'success': True,
                    'data': serializer.data
                }, status=status.HTTP_202_ACCEPTED)

            else:
                return Response({
                    'success': False,
                    'message': 'Invalid Request'
                }, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({
                    'success': False,
                    'message': 'INTERNAL_SERVER_ERROR'
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



    @transaction.atomic
    def delete(self, request, *args, **kwargs):
        try:
            party_id = request.query_params["party_id"]
            if party_id is not None and party_id != "":
                party = Party.objects.get(party_id=party_id)

                party.delete()

                return Response({
                    'success': True,
                    'message': ""+party_id+" deleted successfully !!"
                }, status=status.HTTP_200_OK)

            else:
                return Response({
                    'success': False,
                    'message': 'Invalid Request'
                }, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({
                    'success': False,
                    'message': 'INTERNAL_SERVER_ERROR'
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# class PartyRegisterViewSets(viewsets.ModelViewSet):
#     queryset = PartyRegister.objects.all()
#     serializer_class = PartyRegisterSerializer




########################################################################
########################################################################

class FileAPIView(APIView):
    parser_class = (parsers.FileUploadParser,)

    def get(self, request):
        try:
            if request.query_params["party_id"] != "":
                party_id = request.query_params["party_id"]
                party = Party.objects.get(party_id=party_id)
                files = File.objects.all().filter(party=party)
                serializer = FileSerializer(files, many=True)

                return Response({
                    'success': True,
                    'data': serializer.data
                }, status=status.HTTP_200_OK)

            else:
                return Response({
                    'success': False,
                    'message': 'Invalid Request'
                }, status=status.HTTP_400_BAD_REQUEST)
                
        except:
            return Response({
                    'success': False,
                    'message': 'INTERNAL_SERVER_ERROR'
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

                

    @transaction.atomic
    def post(self, request, format=None):
        try:
            party_id = request.query_params["party_id"]
            if party_id is not None and party_id != "" and request.data['file'] is not None :
                party = Party.objects.get(party_id=party_id)

                fileData = request.data['file']

                uploadedFile = File(title=fileData.name, document=fileData, party=party)
                
                uploadedFile.save()

                return Response({
                    'success': True,
                    'message': "File uploaded successfully !!"
                }, status=status.HTTP_201_CREATED)

            else:
                return Response({
                    'success': False,
                    'message': 'Invalid Request'
                }, status=status.HTTP_400_BAD_REQUEST)

        except:
            return Response({
                    'success': False,
                    'message': 'INTERNAL_SERVER_ERROR'
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
    @transaction.atomic
    def delete(self, request, format=None):
        try:
            party_id = request.query_params["party_id"]
            if party_id is not None and party_id != "":
                party = Party.objects.get(party_id=party_id)

                files = File.objects.all().filter(party=party)

                files.delete()

                return Response({
                    'success': True,
                    'message': "Files deleted successfully !!"
                }, status=status.HTTP_200_OK)

            else:
                return Response({
                    'success': False,
                    'message': 'Invalid Request'
                }, status=status.HTTP_400_BAD_REQUEST)

        except:
            return Response({
                    'success': False,
                    'message': 'INTERNAL_SERVER_ERROR'
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
