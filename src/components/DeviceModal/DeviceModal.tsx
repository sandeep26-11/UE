import { DeviceData } from '../../types';
import './DeviceModal.css';

interface DeviceModalProps {
    device: DeviceData;
    onClose: () => void;
}

export const DeviceModal: React.FC<DeviceModalProps> = ({ device, onClose }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Device Details</h2>
                <p>IP Address: {device.ip}</p>
                <p>Location: {device.latitude}, {device.longitude}</p>
                <p>Distance from Tower: {device.distance?.toFixed(2)} km</p>
                <p>PCI: {device.pci}</p>
                <p>ARFCN: {device.arfcn}</p>
                <p>Throughput: {device.throughput} Mbps</p>
                <p>RSRP: {device.rsrp} dBm</p>
                <p>RSRQ: {device.rsrq} dB</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};
