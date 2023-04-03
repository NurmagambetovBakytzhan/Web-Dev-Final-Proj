# Generated by Django 4.1.5 on 2023-03-30 19:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0002_alter_category_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movie',
            name='category',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='movies.category', verbose_name='Category'),
        ),
    ]
