from django.urls import path

from . import views

app_name = "main"

urlpatterns = [
    path("", views.index, name="index"),
    path("contact/submit/", views.contact_submit, name="contact_submit"),
]
