import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon, PointTuple } from 'leaflet';
import { DeviceData, Tower } from '../../types';
import { MAP_CONFIG, ICONS } from '../../constants/config';
import './Map.css';

interface MapProps {
    towers: Tower[];  // Changed to accept array of towers
    devices: DeviceData[];
    onDeviceClick: (device: DeviceData) => void;
}

const towerIcon = new Icon({
    iconUrl: ICONS.tower.url,
    iconSize: ICONS.tower.size as PointTuple,
    iconAnchor: [ICONS.tower.size[0] / 2, ICONS.tower.size[1]],
    popupAnchor: [0, -ICONS.tower.size[1]]
});

const deviceIcon = new Icon({
    iconUrl: ICONS.device.url,
    iconSize: ICONS.device.size as PointTuple,
    iconAnchor: [ICONS.device.size[0] / 2, ICONS.device.size[1]],
    popupAnchor: [0, -ICONS.device.size[1]]
});

export const Map: React.FC<MapProps> = ({ towers, devices, onDeviceClick }) => {
    const validDevices = devices.filter(
        device => device.latitude && device.longitude
    );

    if (!towers.length) {
        return <div>Loading map...</div>;
    }

    return (
        <div className="map-container">
            <MapContainer
                center={[towers[0].latitude, towers[0].longitude]}
                zoom={MAP_CONFIG.defaultZoom}
                minZoom={MAP_CONFIG.minZoom}
                maxZoom={MAP_CONFIG.maxZoom}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    url={MAP_CONFIG.tileLayer}
                    attribution='&copy; OpenStreetMap contributors'
                />
                
                {towers.map((tower, index) => (
                    <Marker 
                        key={`tower-${index}`}
                        position={[tower.latitude, tower.longitude]} 
                        icon={towerIcon}
                    >
                        <Popup>
                            <h3>Network Tower {tower.pci}</h3>
                        </Popup>
                    </Marker>
                ))}

                {validDevices.map((device) => (
                    <Marker
                        key={`marker-${device.ip}-${device.latitude}-${device.longitude}`}
                        position={[device.latitude, device.longitude]}
                        icon={deviceIcon}
                        eventHandlers={{
                            click: () => onDeviceClick(device)
                        }}
                    >
                        <Popup>
                            <h3>Device {device.ip}</h3>
                            <p>PCI: {device.pci}</p>
                            <p>Distance: {device.distance?.toFixed(2)} km</p>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};
