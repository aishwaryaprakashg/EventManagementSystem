from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
def home(request):
    return render(request, 'events/home.html')
class CancelRegistrationAPI(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, event_id):
        try:
            registration = Registration.objects.get(
                user=request.user,
                event_id=event_id
            )
        except Registration.DoesNotExist:
            return Response(
                {"error": "Registration not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        registration.delete()

        return Response(
            {"message": "Registration cancelled successfully"},
            status=status.HTTP_200_OK
        )