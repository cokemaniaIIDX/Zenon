# Generated by Django 3.2.12 on 2022-03-12 07:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_auto_20220312_1604'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ingredient',
            name='price',
            field=models.PositiveIntegerField(blank=True, null=True, verbose_name='Price'),
        ),
    ]
