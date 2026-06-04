from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from .permissions import IsOrganizer
from .models import Event, Registration
from .serializers import EventSerializer, RegistrationSerializer
from django.utils import timezone
from .permissions import IsEventOwner
# -----------------------------
# EVENT LIST + CREATE API
# -----------------------------
class EventListCreateAPI(generics.ListCreateAPIView):
    queryset = Event.objects.all().order_by('-created_at')
    serializer_class = EventSerializer
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsOrganizer()]
        return [IsAuthenticatedOrReadOnly()]

    def perform_create(self, serializer):
        # Automatically assign logged-in user as event creator
        serializer.save(created_by=self.request.user)
class MyEventsAPI(generics.ListAPIView):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Event.objects.filter(
            created_by=self.request.user
        ).order_by('-created_at')
class EventDetailAPI(generics.RetrieveAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
class MyRegistrationsAPI(generics.ListAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Registration.objects.filter(
            user=self.request.user
        )
class CancelRegistrationAPI(generics.DestroyAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Registration.objects.filter(
            user=self.request.user
        )
# -----------------------------
# EVENT REGISTRATION API
# -----------------------------
class EventRegisterAPI(generics.GenericAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, event_id):
        try:
            event = Event.objects.get(id=event_id)
        except Event.DoesNotExist:
            return Response(
                {"error": "Event not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        user = request.user
        # Check registration deadline
        if timezone.now() > event.registration_deadline:
            return Response(
                {"error": "Registration deadline has passed"},
                status=status.HTTP_400_BAD_REQUEST
            )
        # -----------------------------
        # Business Rule 1: Prevent duplicate registration
        # -----------------------------
        if Registration.objects.filter(user=user, event=event).exists():
            return Response(
                {"message": "You are already registered for this event"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # -----------------------------
        # Business Rule 2: Check capacity
        # -----------------------------
        current_count = Registration.objects.filter(event=event).count()
        if current_count >= event.capacity:
            return Response(
                {"error": "Event is full"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # -----------------------------
        # Business Rule 3: Create registration
        # -----------------------------
        registration = Registration.objects.create(
            user=user,
            event=event
        )

        serializer = self.get_serializer(registration)

        return Response(
            {
                "message": "Registration successful",
                "data": serializer.data
            },
            status=status.HTTP_201_CREATED
        )
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Event
from .serializers import EventSerializer


class EventUpdateAPI(generics.UpdateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]


class EventDeleteAPI(generics.DestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]  

    