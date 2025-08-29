from django.urls import path, include
from accounts import views as UserViews

urlpatterns = [
    path('register/', UserViews.RegisterView.as_view()), # as_view() is used to convert a class-based view into a view function that can be used in URL routing
]