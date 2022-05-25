import json
from unicodedata import category
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, render

from music.models import Book, Category, Favorite

# Create your views here.
def index(request):
    books = Book.objects.all()[:10]
    categories = Category.objects.all()[:3]

    context = {
        "books": books,
        "categories": categories
    }
    return render(request, 'index.html', context)


def addToFevorite(req):
    body_unicode = req.body.decode('utf-8')
    body = json.loads(body_unicode)

    id  = body['id']

    if req.user.is_authenticated:
        book = get_object_or_404(Book, pk=id)
        
        obj, created = Favorite.objects.get_or_create(book=book, user=req.user)
        print(created)
        if not created:
            obj.delete()
            return JsonResponse({"data": False }, status=200)
        return JsonResponse({"data": True }, status=200)
    else:
        return JsonResponse({"data": "You are not autheticated!"}, status=400)


def getBook(req):
    body_unicode = req.body.decode('utf-8')
    body = json.loads(body_unicode)
    id  = body['id']

    book = get_object_or_404(Book, pk=id)

    if book is not None:
        data = {
            "book_name": book.book_name,
            "book_audio_url": book.book_audio_file.url,
            "book_cover_url": book.book_cover_file.url,
            "book_author": book.author,
            "description": book.description
        }

        return JsonResponse({"data": data}, status=200)
    return JsonResponse({"data": "book not found!"}, status=200)


def explore(req):
    books = Book.objects.all()
    return render(req, 'explorer.html', {"books": books})

def search(req):
    q = req.GET.get('q')
    
    books = Book.objects.filter(book_name__contains=q)
    return render(req, 'explorer.html', {"books": books, "search_result": True})