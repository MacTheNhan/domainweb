from django.conf.urls import url
from django.conf.urls.static import static
from django.contrib import admin

from tenmien import settings
from .views import *

urlpatterns = [
    # URL for User model
    url(r'^trangchu/', index, name='index'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
