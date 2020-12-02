from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from .serializers import DonationSerializer,Donation,User,UserSerializer,Report,ReportSerializer
from rest_framework.permissions import IsAuthenticated

# Create your views here.


@api_view(['GET'])
def hello(request):
    print(request.user)
    content={"message":"hello world"}
    return Response(content)

@api_view(['POST'])
def register(request):
    data=request.data
    print(data)
    user=User.objects.filter(username=data['username']).first()
    if user is not None:
        return Response({'msg':"this user already exists"},status=403)
    serializer=UserSerializer()
    serializer.create(data)
    return Response({"msg":"registered successfully"},status=201)




@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def donation(request):
    if request.method=="POST":
        data=request.data
        data['by']=request.user.id
        serializer=DonationSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({"msg":"done donation"},status=201)
        else:
            return Response({"mes":"error"},status=400)
    elif request.method=="GET":
        donations=Donation.objects.filter(by=request.user)
        if donations.exists():
            serializer=DonationSerializer(donations,many=True)
            return Response(serializer.data,status=200)
        else:
            return Response({"message":"This user has not made any Donations"},status=200)


@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def report(request):
    if request.method=="POST":
        reportData={
            "report":request.data['report'],
            "type":request.data['type'],
            "pic":request.data['pic'],
            "breed":request.data['breed'],
            "by":request.user
        }
        Report.objects.create(report=reportData['report'],type=reportData['type'],by=reportData['by'],breed=reportData['breed'],pic=reportData['pic'])
        return Response({"msg":"done Report"},status=201)
        
    elif request.method=="GET":
        report=Report.objects.filter(by=request.user)
        if report.exists():
            serializer=ReportSerializer(report,many=True)
            return Response(serializer.data,status=200)
        else:
            return Response([{"message":"This user has not made any Report"}],status=200)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUser(request):
    userSerializer=UserSerializer(request.user)
    return Response(userSerializer.data,status=200)











    
    



