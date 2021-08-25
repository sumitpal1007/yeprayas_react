from rest_framework import serializers
from .models import Party
#from .models import class PartyRegister
from .models import File
# from .models import PartyRegister

class PartySerializer(serializers.ModelSerializer):
    class Meta:
        model = Party
        fields = ["party_id","name","contact_number","email","company_name","status"]

#class PartyRegisterSerializer(serializers.ModelSerializer):
 #   class Meta:
 #       model = PartyRegister
 #       fields = ["email"]

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = '__all__'

# class PartyRegisterSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = PartyRegister
#         fields = '__all__'
