import { LocationTransformer } from "@zix/api";

export function getDistance(location1: LocationTransformer, location2: LocationTransformer) {
    const earthRadius = 6371; // Radius of the Earth in kilometers

    // Convert latitude and longitude to radians
    const lat1 = toRadians(Number(location1.latitude));
    const lon1 = toRadians(Number(location1.longitude));
    const lat2 = toRadians(Number(location2.latitude));
    const lon2 = toRadians(Number(location2.longitude));

    // Haversine formula
    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1) *
            Math.cos(lat2) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance;
}

// Helper function to convert degrees to radians
export function toRadians(degrees: number) {
    return degrees * (Math.PI / 180);
}
