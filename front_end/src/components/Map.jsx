"use client";

import { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import { firestore } from "../config/firebase";
import LoadingSpinner from "./LoadingSpinner";
import ErrorLoadingSpinner from "./ErrorLoading";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    url: "/vehicleIcon.png",
    scaledSize: null,
  });

  const [data, setData] = useState([]);
  const [vehiclePosition, setVehiclePosition] = useState(center);
  const [pathCoordinates, setPathCoordinates] = useState([]);

  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  useEffect(() => {
    if (isLoaded) {
      setVehicleIcon((prevIcon) => ({
        ...prevIcon,
        scaledSize: new window.google.maps.Size(40, 40),
      }));

      const vehicleId = "3MlPDEStfBZvXo6g6gFN";
      const gpsLocationRef = collection(
        firestore,
        `Vehicles/${vehicleId}/History`
      );

      const startTimestamp = Timestamp.fromDate(startTime);
      const endTimestamp = Timestamp.fromDate(endTime);

      const q = query(
        gpsLocationRef,
        where("time", ">=", startTimestamp),
        where("time", "<=", endTimestamp),
        orderBy("time", "asc")
      );

      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const items = [];
          const coordinates = [];
          querySnapshot.forEach((doc) => {
            const locationData = doc.data();
            items.push({ id: doc.id, ...locationData });

            if (locationData.coordinate) {
              coordinates.push({
                lat: locationData.coordinate.latitude,
                lng: locationData.coordinate.longitude,
              });

              setVehiclePosition({
                lat: locationData.coordinate.latitude,
                lng: locationData.coordinate.longitude,
              });
            }
          });
          setData(items);
          setPathCoordinates(coordinates);
        },
        (error) => {
          console.error("Error fetching GPS locations:", error);
        }
      );

      return () => unsubscribe();
    }
  }, [isLoaded, startTime, endTime]);

  if (loadError) return <ErrorLoadingSpinner />;
  if (!isLoaded) return <LoadingSpinner />;

  return (
    <div className="flex flex-col w-full h-[calc(100vh-164px)] rounded-lg">
      <div className="flex gap-4 p-4 bg-black">
        <div>
          <label className="text-white">Start Time: </label>
          <DatePicker
            selected={startTime}
            onChange={(date) => setStartTime(date)}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
            className="text-black rounded-md p-2 w-64 cursor-pointer shadow-gray-500 shadow-md"
          />
        </div>
        <div>
          <label className="text-white">End Time: </label>
          <DatePicker
            selected={endTime}
            onChange={(date) => setEndTime(date)}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
            className="text-black rounded-md p-2 w-64 cursor-pointer shadow-gray-500 shadow-md"
          />
        </div>
      </div>

      <div className="flex-1">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={12}
          center={vehiclePosition}
        >
          {vehicleIcon.scaledSize && (
            <Marker icon={vehicleIcon} position={vehiclePosition} />
          )}

          {pathCoordinates.length > 1 && (
            <Polyline
              path={pathCoordinates}
              options={{
                strokeColor: "#FF0000", // Red color
                strokeOpacity: 1.0,
                strokeWeight: 2,
              }}
            />
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default Map;
