import os
from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAdminOrReadOnly(BasePermission):
    """Allow read-only access to everyone, but require a matching
    ADMIN_API_KEY in the X-API-KEY header for write operations.

    This is intentionally minimal for a dev scaffold. For production,
    use proper auth (tokens, sessions, or Supabase) and TLS.
    """

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        api_key = os.getenv("ADMIN_API_KEY")
        if not api_key:
            return False
        return request.headers.get("X-API-KEY") == api_key
