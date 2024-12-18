import { useState, useEffect } from 'react';
import { DeviceTable } from './components/DeviceTable/DeviceTable';
import { Map } from './components/Map/Map';
import { DeviceModal } from './components/DeviceModal/DeviceModal';
import { UDPService } from './services/UDPService';
import { DeviceData } from './types';
import { UDP_PORT } from './constants/config';
import { calculateDistance } from './utils/calculateDistance';
import towerLocations from './data/towerLocation.json';
import './App.css';

function App() {
    const [devices, setDevices] = useState<DeviceData[]>([]);
    const [selectedDevice, setSelectedDevice] = useState<DeviceData | null>(null);

    useEffect(() => {
        const udpService = new UDPService(UDP_PORT, (newData) => {
            setDevices(prevDevices => {
                const index = prevDevices.findIndex(d => d.ip === newData.ip);
                const matchingTower = towerLocations.towers.find(t => t.pci === newData.pci);

                const deviceWithDistance = {
                    ...newData,
                    distance: matchingTower ? calculateDistance(
                        matchingTower.latitude,
                        matchingTower.longitude,
                        newData.latitude,
                        newData.longitude
                    ) : undefined
                };

                if (index !== -1) {
                    const updatedDevices = [...prevDevices];
                    updatedDevices[index] = deviceWithDistance;
                    return updatedDevices;
                }
                return [...prevDevices, deviceWithDistance];
            });
        });

        return () => udpService.close();
    }, []);

    const handleDeviceClick = (device: DeviceData) => {
        setSelectedDevice(device);
    };

    const handleModalClose = () => {
        setSelectedDevice(null);
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Network Device Monitor</h1>
            </header>

            <main className="app-main">
                <div className="map-section">
                    <Map 
                        towers={towerLocations.towers}
                        devices={devices}
                        onDeviceClick={handleDeviceClick}
                    />
                </div>

                <div className="table-section">
                    <DeviceTable
                        devices={devices}
                        onDeviceClick={handleDeviceClick}
                    />
                </div>
            </main>

            {selectedDevice && (
                <DeviceModal
                    device={selectedDevice}
                    onClose={handleModalClose}
                />
            )}
        </div>
    );
}

export default App;
