# Generated by Django 3.1.3 on 2020-12-02 04:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20201201_2032'),
    ]

    operations = [
        migrations.AddField(
            model_name='report',
            name='breed',
            field=models.CharField(blank=True, max_length=40),
        ),
        migrations.AddField(
            model_name='report',
            name='type',
            field=models.CharField(blank=True, max_length=20),
        ),
    ]