from rest_framework.pagination import CursorPagination

class NotificationCursorPagination(CursorPagination):
    page_size = 15
    ordering = "-created_at"
