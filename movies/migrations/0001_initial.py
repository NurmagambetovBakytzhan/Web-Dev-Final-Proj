# Generated by Django 4.1.5 on 2023-03-30 19:50

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100, unique=True, verbose_name='Title')),
                ('description', models.TextField(blank=True, null=True, verbose_name='Description')),
                ('is_top', models.BooleanField(default=False, verbose_name='Is Top?')),
                ('age_limit', models.CharField(choices=[('All', 'All'), ('Kids', 'Kids')], max_length=10, verbose_name='Age Limit')),
                ('image', models.ImageField(upload_to='covers')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('category', models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='movies.category', verbose_name='Type')),
            ],
            options={
                'verbose_name': 'Movie',
                'verbose_name_plural': 'Movies',
                'ordering': ('is_top', '-created_at'),
            },
        ),
        migrations.CreateModel(
            name='Video',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, unique=True, verbose_name='Title')),
                ('file', models.FileField(upload_to='movies')),
            ],
        ),
        migrations.CreateModel(
            name='MovieImage',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('image', models.ImageField(upload_to='movie-images/%Y/%m/%d/', verbose_name='Image')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='movie_images', to='movies.movie', verbose_name='Movie')),
            ],
            options={
                'verbose_name': 'Movie Image',
                'verbose_name_plural': 'Movie Images',
                'ordering': ('-created_at',),
            },
        ),
        migrations.AddField(
            model_name='movie',
            name='video',
            field=models.ManyToManyField(to='movies.video'),
        ),
    ]
