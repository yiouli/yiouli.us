# Generated by Django 3.2.16 on 2023-01-01 18:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0015_auto_20230101_0511'),
    ]

    operations = [
        migrations.AlterField(
            model_name='articlepage',
            name='body',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='individualpage',
            name='about',
            field=models.TextField(default=''),
        ),
    ]
