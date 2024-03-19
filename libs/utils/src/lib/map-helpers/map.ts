import { BoundingBox, LatLng } from "./types";

export function convertCoordinatesToPolygon(coordinates: LatLng[]) {
    return coordinates
        .map((item) => `${item.latitude} ${item.longitude}`)
        .join(", ");
}

export function convertPolygonToCoordinates(polygon?: string): LatLng[] {
    if (!polygon) return [];

    return polygon
        .split(",")
        .map((item) => item.trim().split(" "))
        .map((item) => ({
            latitude: parseFloat(item[0]),
            longitude: parseFloat(item[1]),
        }));
}

export function extractCoordinatesFromBoundaries({
    northEast,
    southWest,
}: BoundingBox): LatLng[] {
    return [
        {
            latitude: northEast.latitude,
            longitude: northEast.longitude,
        },
        {
            latitude: northEast.latitude,
            longitude: southWest.longitude,
        },
        {
            latitude: southWest.latitude,
            longitude: southWest.longitude,
        },
        {
            latitude: southWest.latitude,
            longitude: northEast.longitude,
        },
        {
            latitude: northEast.latitude,
            longitude: northEast.longitude,
        },
    ];
}
