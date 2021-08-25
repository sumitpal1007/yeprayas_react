# Generated by Django 3.2.3 on 2021-05-22 06:35

from django.db import migrations, models
import django.db.models.deletion
import party_register.utils


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Party',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('party_id', models.CharField(default=party_register.utils.create_new_ref_number, editable=False, max_length=10, unique=True)),
                ('name', models.CharField(max_length=50)),
                ('contact_number', models.CharField(max_length=15)),
                ('status', models.CharField(default='ACTIVE', max_length=10)),
                ('isDeleted', models.CharField(default='N', max_length=1)),
                ('description', models.CharField(max_length=250)),
            ],
        ),
        migrations.CreateModel(
            name='PartyRegister',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=100)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('party', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='party_register.party')),
            ],
        ),
        migrations.CreateModel(
            name='File',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=30)),
                ('document', models.FileField(max_length=30, upload_to='')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('party', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='party_register.party')),
            ],
        ),
    ]