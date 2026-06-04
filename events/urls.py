from django.urls import path
from .api_views import (
    EventListCreateAPI,
    EventRegisterAPI,
    EventDetailAPI,
    MyRegistrationsAPI,
    CancelRegistrationAPI,
    MyEventsAPI,
    EventUpdateAPI,
    EventDeleteAPI,
)

urlpatterns = [
    path('events/', EventListCreateAPI.as_view()),
    path('events/<int:event_id>/register/', EventRegisterAPI.as_view()),
    path(
    'events/<int:pk>/',
    EventDetailAPI.as_view(),
    name='event-detail'),
    path(
    'my-registrations/',
    MyRegistrationsAPI.as_view(),
    name='my-registrations'),
    path(
    'registrations/<int:pk>/cancel/',
    CancelRegistrationAPI.as_view(),
    name='cancel-registration'
),
path(
    'events/<int:event_id>/cancel/',
    CancelRegistrationAPI.as_view(),
),
path(
    'my-events/',
    MyEventsAPI.as_view(),
    name='my-events'
),
path(
    'events/<int:pk>/update/',
    EventUpdateAPI.as_view(),
),

path(
    'events/<int:pk>/delete/',
    EventDeleteAPI.as_view(),
),
]