import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MAP_ICONS } from '../../utils/iconLoader';
import { DeviceData, Tower } from '../../types';
import { MAP_CONFIG } from '../../constants/config';
import 'leaflet/dist/leaflet.css';

import './Map.css';

interface MapProps {
    towers: Tower[];
    devices: DeviceData[];
    onDeviceClick: (device: DeviceData) => void;
}

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
                        key={`tower-${tower.pci}-${index}`}
                        position={[tower.latitude, tower.longitude]} 
                        icon={MAP_ICONS.tower}
                    >
                        <Popup>
                            <h3>Network Tower {tower.pci}</h3>
                        </Popup>
                    </Marker>
                ))}

                {validDevices.map((device) => (
                    <Marker
                        key={`device-${device.ip}-${Date.now()}`}
                        position={[device.latitude, device.longitude]}
                        icon={MAP_ICONS.device}
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
