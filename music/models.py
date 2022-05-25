from statistics import mode
from unicodedata import category
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Category(models.Model):
    category = models.CharField(max_length=250)

    def __str__(self):
        return self.category
    
class Book(models.Model):
    book_name = models.CharField(max_length=250)
    author = models.CharField(max_length=250)
    book_audio_file = models.FileField()
    book_cover_file = models.FileField()
    description = models.TextField()
    category = models.ForeignKey(Category, related_name="books", on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"{self.book_name} - {self.author}"

class Favorite(models.Model):
    book = models.ForeignKey(Book, related_name="fav_book", on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"{self.book} - {self.user}"
