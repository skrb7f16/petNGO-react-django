# Generated by Django 3.1.3 on 2020-12-01 15:02

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0002_auto_20201201_1058'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='donation',
            options={'ordering': ['-doneOn']},
        ),
        migrations.AlterField(
            model_name='donation',
            name='by',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='donationDoneBy', to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='Report',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('report', models.TextField()),
                ('doneOn', models.DateTimeField(auto_now_add=True)),
                ('pic', models.ImageField(blank=True, null=True, upload_to='posts', validators=[django.core.validators.FileExtensionValidator(['png', 'jpg', 'jpeg'])])),
                ('by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reportDoneBy', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-doneOn'],
            },
        ),
    ]
