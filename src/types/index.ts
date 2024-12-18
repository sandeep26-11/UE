export interface DeviceData {
    throughput: number;
    rsrp: number;
    rsrq: number;
    latitude: number;
    longitude: number;
    ip: string;
    distance?: number;
    pci: number;
    arfcn: number;
}

export interface Tower {
    latitude: number;
    longitude: number;
    pci: number;
}
export interface MapProps {
    towers: Tower[];  // Changed from 'tower' to 'towers'
    devices: DeviceData[];
    onDeviceClick: (device: DeviceData) => void;
}

