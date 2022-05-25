from django.contrib import admin
from music.models import Book, Category, Favorite

# Register your models here.
admin.site.register(Book)
admin.site.register(Favorite)
admin.site.register(Category)

