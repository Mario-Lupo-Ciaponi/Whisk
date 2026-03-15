import requests
from math import radians, sin, atan2, cos, sqrt

def calculate_distance(latitude_1: float, longitude_1: float, latitude_2:float, longitude_2: float) -> float:
    """
    Calculates the distance between two coordinates with the Haversine formula.
    """
    R = 6371 # Radius of the Earth in kilometers

    latitude_1, longitude_1, latitude_2, longitude_2 = map(
        radians,
        [latitude_1, longitude_1, latitude_2, longitude_2]
    )

    delta_latitude = latitude_2 - latitude_1
    delta_longitude = longitude_2 - longitude_1

    a = sin(delta_latitude / 2) ** 2 + cos(latitude_1) * cos(latitude_2) * sin(delta_longitude / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return R * c
