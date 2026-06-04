from rest_framework import serializers
from .models import Event, Registration


class EventSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source='created_by.username')
    registered_count = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = '__all__'

    def get_registered_count(self, obj):
        return obj.registration_set.count()

    def validate_capacity(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Capacity must be greater than 0"
            )
        return value


class RegistrationSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    event = serializers.ReadOnlyField(source='event.title')

    class Meta:
        model = Registration
        fields = [
            'id',
            'user',
            'event',
            'status',
            'registered_at',
        ]