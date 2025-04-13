import React, { useState, useEffect } from "react";
import axios from "axios";

const GPSData = ({ setGps, setUserId }) => {
  const [gpsData, setGpsData] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    const fetchGPS = async () => {
      try {
        const res = await axios.get("http://192.168.134.94/data");
        const packets = res.data;

        if (Array.isArray(packets) && packets.length > 0) {
          const latest = packets[packets.length - 1];
          const { latitude, longitude, unique_id } = latest;

          setGpsData({ latitude, longitude });
          setGps({
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
          });
          setUserId(unique_id);
        }
      } catch (error) {
        setGpsData({ error: "❌ Unable to fetch data from ESP32" });
        setUserId(null);
      }
    };

    fetchGPS();
    const interval = setInterval(fetchGPS, 5000);
    return () => clearInterval(interval);
  }, [setGps, setUserId]);

  return (
    <div>
      <h2 className="text-xl font-bold">GPS Data</h2>
      {gpsData.error ? (
        <p className="text-red-400">{gpsData.error}</p>
      ) : (
        <div>
          <p>Latitude: {gpsData.latitude || "..."}</p>
          <p>Longitude: {gpsData.longitude || "..."}</p>
        </div>
      )}
    </div>
  );
};

export default GPSData;
