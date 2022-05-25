from django.urls import path

from music import views

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.index, name='index'),
    path('add-to-favorite/', views.addToFevorite, name='add_to_favorite'),
    path('get-book/', views.getBook, name='get_book'),
    # path('explore/', views.demo, name="explore")
]

urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
