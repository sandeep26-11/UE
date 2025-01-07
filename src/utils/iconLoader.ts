import { Icon, PointTuple } from 'leaflet';
import { ICONS } from '../constants/config';

export const MAP_ICONS = {
    tower: new Icon({
        iconUrl: ICONS.tower.url,
        iconSize: ICONS.tower.size as [number, number],
        iconAnchor: [ICONS.tower.size[0] / 2, ICONS.tower.size[1]] as [number, number],
        popupAnchor: [0, -ICONS.tower.size[1]] as [number, number]
    }),
    device: new Icon({
        iconUrl: ICONS.device.url,
        iconSize: ICONS.device.size as [number, number],
        iconAnchor: [ICONS.device.size[0] / 2, ICONS.device.size[1]] as [number, number],
        popupAnchor: [0, -ICONS.device.size[1]] as [number, number]
    })
};
