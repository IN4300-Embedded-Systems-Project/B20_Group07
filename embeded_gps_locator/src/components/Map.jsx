// components/Map.js
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
    lat: 37.7749, // Latitude for San Francisco
    lng: -122.4194, // Longitude for San Francisco
};

const pathCoordinates = [
  { lat: 37.7749, lng: -122.4194 }, // San Francisco
  { lat: 34.0522, lng: -118.2437 }, // Los Angeles
  { lat: 36.1699, lng: -115.1398 }, // Las Vegas
];

const polylineOptions = {
  strokeColor: "#FF0000", // Red color
  strokeOpacity: 1.0,
  strokeWeight: 2,
  geodesic: true,
};

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div className="flex w-full h-screen">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
      >
        <Marker position={center} />
        <Polyline path={pathCoordinates} options={polylineOptions} />
      </GoogleMap>
    </div>
  );
};

export default Map;
