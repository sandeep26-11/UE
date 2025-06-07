import { useState, useEffect } from 'react';
import { UDPService } from '../services/UDPService';
import { DeviceData } from '../types';
import { calculateDistance } from '../utils/calculateDistance';
import towerLocations from '../data/towerLocation.json';

export const useDeviceMonitor = () => {
    const [devices, setDevices] = useState<DeviceData[]>([]);
    const [selectedDevice, setSelectedDevice] = useState<DeviceData | null>(null);

    useEffect(() => {
        const udpService = new UDPService(4047, (newData) => {
            console.log('Received new data:', newData);
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

    return {
        devices,
        selectedDevice,
        handleDeviceClick,
        handleModalClose
    };
};
