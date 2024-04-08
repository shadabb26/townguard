import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import PropTypes from "prop-types";
export default function Map({ position }) {
  return (
    <div className="col-md-6 map-container">
      {/* <h2>Map Placeholder</h2> */}
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        className="map"
        style={{ height: "100%" }} // Set height to 100%
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            your location
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

Map.propTypes = {
  position: PropTypes.array,
};
