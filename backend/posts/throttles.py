from rest_framework.throttling import UserRateThrottle, AnonRateThrottle

class LocationCreateThrottle(UserRateThrottle):
    scope = "location_create"

class LocationCreateAnonThrottle(AnonRateThrottle):
    scope = "location_create_anon"
