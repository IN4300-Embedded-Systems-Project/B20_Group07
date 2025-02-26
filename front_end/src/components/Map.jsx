'use client';

import { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import LoadingSpinner from "./LoadingSpinner";
import ErrorLoadingSpinner from "./ErrorLoading";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 7.8731,
  lng: 80.7718,
};

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const [vehicleIcon, setVehicleIcon] = useState({
    url: '/vehicleIcon.png',
    scaledSize: null, 
  });

  useEffect(() => {
    if (isLoaded) {
      setVehicleIcon((prevIcon) => ({
        ...prevIcon,
        scaledSize: new window.google.maps.Size(40, 40), 
      }));

      // Reference to the Firebase Realtime Database path
      // const vehicleRef = ref(database, 'vehicle/location');

      // Listen for real-time updates
      // onValue(vehicleRef, (snapshot) => {
      //   const data = snapshot.val();
      //   if (data) {
      //     setVehiclePosition({
      //       lat: data.latitude,
      //       lng: data.longitude,
      //     });
      //   }
      // });
    }
  }, [isLoaded]);

  if (loadError) return <ErrorLoadingSpinner />;
  if (!isLoaded) return <LoadingSpinner />;

  return (
    <div className="flex w-full h-[calc(100vh-164px)] rounded-lg">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
      >
        {
          vehicleIcon.scaledSize && (
            <Marker position={center} icon={vehicleIcon} />
          )
        }
      </GoogleMap>
    </div>
  );
};

export default Map;
