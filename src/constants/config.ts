export const UDP_PORT = 8000;

export const MAP_CONFIG = {
    defaultZoom: 13,
    minZoom: 3,
    maxZoom: 18,
    tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
};
export const ICONS = {
    tower: {
        size: [32, 32] as [number, number],
         url: '/assets/tower-icon.png'
    },
    device: {
        size: [24, 24] as [number, number],
        url: '/assets/device-icon.png'
    }

};
