# Generated by Django 3.2.16 on 2022-12-31 03:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0011_alter_articlepage_body'),
    ]

    operations = [
        migrations.AlterField(
            model_name='topicpage',
            name='description',
            field=models.TextField(default=''),
        ),
    ]
