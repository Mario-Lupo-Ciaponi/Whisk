from rest_framework import permissions


class IsOwner(permissions.BasePermission):
    """
    Checks whether the user has permission to perform any unsafe actions
    """

    message = "Only the owner of this resource may modify or delete it."

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.author == request.user
