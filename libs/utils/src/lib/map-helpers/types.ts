export type LatLng = {
  latitude: number;
  longitude: number;
};

export type BoundingBox = {
  northEast: LatLng;
  southWest: LatLng;
};
