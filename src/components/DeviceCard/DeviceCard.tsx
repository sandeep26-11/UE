import { DeviceData } from '../../types';
import { getSignalColor } from '../../utils/signalColors';
import './DeviceCard.css';

interface DeviceCardProps {
    device: DeviceData;
    onClick: (device: DeviceData) => void;
}

export const DeviceCard: React.FC<DeviceCardProps> = ({ device, onClick }) => {
    return (
        <div className="device-card" onClick={() => onClick(device)}>
            <div 
                className="signal-indicator" 
                style={{ backgroundColor: getSignalColor(device.rsrp) }}
            />
            <h3>Device {device.ip}</h3>
            <p>Distance: {device.distance?.toFixed(2)} km</p>
            <p>Throughput: {device.throughput} Mbps</p>
            <p>RSRP: {device.rsrp} dBm</p>
            <p>RSRQ: {device.rsrq} dB</p>
        </div>
    );
};
