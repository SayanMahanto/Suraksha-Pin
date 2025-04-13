import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const Map = ({ latitude, longitude }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBBcGVeJwl7e-84xLoiRP4ONU9GuqUgUZ4",
  });

  return isLoaded ? (
    <GoogleMap
      center={{ lat: latitude, lng: longitude }}
      zoom={15}
      mapContainerStyle={{ width: "100%", height: "400px" }}
    >
      <Marker position={{ lat: latitude, lng: longitude }} />
    </GoogleMap>
  ) : (
    <p>Loading map...</p>
  );
};

export default Map;
