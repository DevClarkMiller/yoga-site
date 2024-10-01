
import { useNavigate } from "react-router-dom";

// Components
import {
    MapContainer,
    TileLayer,
    Marker
} from "react-leaflet";

import L from 'leaflet';

// Images
import MapPin from '../Images/mapPin.webp';

// CSS
import "leaflet/dist/leaflet.css";

const Map = ({locations}) => {
    const navigate = useNavigate();

    const GetIcon = (_iconSize) =>{
        return L.icon({
            iconUrl: MapPin,
            iconSize: _iconSize
        });
    }

    const onMarkerClick = (index) => {
        navigate(`selectedLocation/${index}`);
    }

    return (
        <MapContainer
            className="w-full lg:w-1/3 aspect-square z-0"

            center={[42.77609410483303, -81.17618696666715]}
            zoom={13}

        >
            {/* add google map tile url  */}
            <TileLayer
                attribution="Google Maps"
                url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
            />
            {locations?.map((location, index) => (
                <Marker 
                    key={toString(location?.lat) + "|" + toString(location?.long)} 
                    position={[parseFloat(location?.lat), parseFloat(location?.long)]} 
                    icon={GetIcon(50)} 
                    eventHandlers={{click: () => onMarkerClick(index)}}
                ></Marker>
            ))}
      </MapContainer>
    );
}

export default Map