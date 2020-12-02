from django.db import models
from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator


# Create your models here.

class Donation(models.Model):
    by=models.ForeignKey(User,on_delete=models.CASCADE,related_name="donationDoneBy")
    amount=models.IntegerField()
    doneOn=models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering=['-doneOn']

class Report(models.Model):
    by=models.ForeignKey(User,on_delete=models.CASCADE,related_name="reportDoneBy")
    report=models.TextField()
    doneOn=models.DateTimeField(auto_now_add=True)
    type=models.CharField(max_length=20, blank=True)
    breed=models.CharField(max_length=40,blank=True)
    pic=models.ImageField(upload_to='posts', validators=[FileExtensionValidator(['png', 'jpg', 'jpeg'])], blank=True,null=True)

    class Meta:
        ordering=['-doneOn']


