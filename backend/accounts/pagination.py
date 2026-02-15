from rest_framework.pagination import PageNumberPagination


class UserResultsSetPagination(PageNumberPagination):
    page_size = 9
    max_page_size = 9
    page_size_query_param = "page_size"
