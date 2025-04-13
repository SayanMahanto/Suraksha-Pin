import React, { useState, useEffect } from "react";
import GPSData from "../components/Gps";
import Map from "../components/Map";
import {
  FaMapMarkerAlt,
  FaUserFriends,
  FaCog,
  FaHome,
  FaSpinner,
} from "react-icons/fa";

// Loader component with vibrant colors
const Loader = () => (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
    <div className="bg-gray-900 p-10 rounded-xl text-white text-center flex flex-col items-center space-y-6">
      <FaSpinner className="animate-spin text-5xl text-teal-500" />
      <span className="text-3xl font-semibold text-blue-400">Suraksha Pin</span>
    </div>
  </div>
);

const Home2 = () => {
  const [gps, setGps] = useState({ latitude: null, longitude: null });
  const [userId, setUserId] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([
    "user1",
    "user2",
    "user3",
    "user4",
  ]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // simulate load
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;
  console.log(
    "Window height:",
    window.innerHeight,
    "Body height:",
    document.body.offsetHeight
  );

  return (
    <div className="flex w-full min-h-screen bg-gray-900 text-white">
      {/* Sidebar with blue tones and hover effects */}
      <aside className="w-20 bg-gray-700 flex flex-col items-center py-6 shadow-2xl space-y-10 transition-all duration-300 hover:bg-gray-500">
        <FaHome className="text-3xl text-white hover:text-orange-300 cursor-pointer transition-colors duration-200" />
        <FaUserFriends className="text-3xl text-white hover:text-orange-300 cursor-pointer transition-colors duration-200" />
        <FaMapMarkerAlt className="text-3xl text-white hover:text-orange-300 cursor-pointer transition-colors duration-200" />
        <FaCog className="text-3xl text-white hover:text-orange-300 cursor-pointer transition-colors duration-200" />
      </aside>

      {/* Main Layout */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Alert Panel with gradient and shadow */}
        <section className="bg-teal-800 p-6 text-center text-xl font-bold text-white shadow-lg">
          🚨 System Operational. GPS tracking active.
        </section>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Center Map Panel */}
          <section className="flex-1 p-6 space-y-6 overflow-auto">
            <div className="flex gap-6">
              <div className="bg-gray-800 p-6 rounded-xl flex items-center gap-6 shadow-lg border border-gray-700">
                <FaMapMarkerAlt
                  className={[
                    "text-4xl",
                    gps.latitude ? "text-green-500" : "text-red-500",
                    "animate-pulse",
                  ].join(" ")}
                />
                <span className="text-2xl font-semibold text-teal-300 drop-shadow-md">
                  {gps.latitude ? "GPS Connected" : "GPS Not Connected"}
                </span>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 flex-1">
                <GPSData setGps={setGps} setUserId={setUserId} />
              </div>
            </div>

            {/* Map */}
            <div className="bg-gray-700 rounded-xl p-6 shadow-lg border border-gray-700 h-[450px]">
              {gps.latitude && gps.longitude ? (
                <Map latitude={gps.latitude} longitude={gps.longitude} />
              ) : (
                <div className="h-full flex items-center justify-center text-blue-300 text-xl">
                  Waiting for GPS data...
                </div>
              )}
            </div>
          </section>

          {/* Right Sidebar User List with vertical gradient */}
          <aside className="w-64 bg-gradient-to-b from-red-600 to-blue-600 p-6 shadow-lg space-y-6 max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-white drop-shadow-md">
              Users
            </h2>
            {connectedUsers.map((user) => (
              <div
                key={user}
                onClick={() => setSelectedUser(user)}
                className={[
                  "cursor-pointer p-3 rounded-lg hover:bg-blue-400 text-white transition-all duration-200",
                  selectedUser === user
                    ? "bg-blue-600 border-2 border-white"
                    : "",
                ].join(" ")}
              >
                {user}
              </div>
            ))}
          </aside>
        </div>

        {/* Bottom User Details Panel */}
        <footer className="bg-gray-800 p-6 shadow-inner border-t border-gray-700">
          {selectedUser ? (
            <div>
              <h3 className="text-xl font-semibold text-orange-400 drop-shadow-md">
                User Details
              </h3>
              <p className="text-lg text-teal-300 mt-2">ID: {selectedUser}</p>
              <p className="text-lg text-teal-300 mt-2">Status: Active</p>
              <p className="text-lg text-teal-300 mt-2">
                Last Known Location: Lat {gps.latitude}, Lon {gps.longitude}
              </p>
            </div>
          ) : (
            <p className="text-lg text-blue-300 mt-2">
              Select a user to view details
            </p>
          )}
        </footer>
      </main>
    </div>
  );
};

export default Home2;
