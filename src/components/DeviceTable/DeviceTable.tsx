import { useState } from 'react';
import { 
    DataGrid, 
    GridColDef,
    GridRenderCellParams,
    GridToolbar,
    GridColumnVisibilityModel
} from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { DeviceData } from '../../types';
import { getSignalColor } from '../../utils/signalColors';

interface DeviceTableProps {
    devices: DeviceData[];
    onDeviceClick: (device: DeviceData) => void;
}

export const DeviceTable: React.FC<DeviceTableProps> = ({ devices, onDeviceClick }) => {
    const [columnVisibilityModel, setColumnVisibilityModel] = useState<GridColumnVisibilityModel>({});

    const processedRows = devices.map((device, index) => ({
        id: device.ip || `row-${index}`,
        signalStrength: device.rsrp,
        ip: device.ip,
        location: `${device.latitude}, ${device.longitude}`,
        distance: device.distance?.toFixed(2) || '',
        throughput: device.throughput,
        rsrp: device.rsrp,
        rsrq: device.rsrq,
        pci: device.pci,
        arfcn: device.arfcn,
        latitude: device.latitude,
        longitude: device.longitude
    }));

    const columns: GridColDef[] = [
        { 
            field: 'signalStrength', 
            headerName: 'Signal',
            width: 70,
            renderCell: (params: GridRenderCellParams) => (
                <Box
                    sx={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        backgroundColor: getSignalColor(params.row.rsrp)
                    }}
                />
            )
        },
        { 
            field: 'ip', 
            headerName: 'IP Address', 
            width: 130
        },
        {
            field: 'location',
            headerName: 'Location',
            width: 200
        },
        {
            field: 'distance',
            headerName: 'Distance (km)',
            width: 130
        },
        {
            field: 'throughput',
            headerName: 'Throughput (Mbps)',
            width: 150
        },
        {
            field: 'rsrp',
            headerName: 'RSRP (dBm)',
            width: 130
        },
        {
            field: 'rsrq',
            headerName: 'RSRQ (dB)',
            width: 130
        },
        {
            field: 'pci',
            headerName: 'PCI',
            width: 100
        },
        {
            field: 'arfcn',
            headerName: 'ARFCN',
            width: 100
        }
    ];

    return (
        <Box sx={{ height: 600, width: '100%' }}>
            <DataGrid
                rows={processedRows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 10, page: 0 },
                    },
                }}
                pageSizeOptions={[10, 25, 50]}
                checkboxSelection
                disableRowSelectionOnClick
                slots={{
                    toolbar: GridToolbar
                }}
                columnVisibilityModel={columnVisibilityModel}
                onColumnVisibilityModelChange={(newModel) => {
                    setColumnVisibilityModel(newModel);
                }}
                onRowClick={(params) => {
                    const device = devices.find(d => d.ip === params.row.ip);
                    if (device) onDeviceClick(device);
                }}
                sx={{
                    '& .MuiDataGrid-row:hover': {
                        cursor: 'pointer',
                        backgroundColor: 'rgba(0, 0, 0, 0.04)'
                    }
                }}
            />
        </Box>
    );
};
