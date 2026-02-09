from rest_framework import permissions


class IsOwnerOrSuperUser(permissions.BasePermission):
    """
    Checks whether the user has permission to perform any unsafe actions
    """

    message = "Only the owner of this resource may modify or delete it."

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS or request.user.is_staff:
            return True

        owner = getattr(obj, "author", None) or getattr(obj, "user", None)

        if owner is None:
            return False

        return owner == request.user
