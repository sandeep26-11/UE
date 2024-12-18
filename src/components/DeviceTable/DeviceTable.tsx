import { useState } from 'react';
import { 
    DataGrid, 
    GridColDef,
    GridRenderCellParams,
    GridValueGetterParams,
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

    const columns: GridColDef[] = [
        { 
            field: 'signalStrength', 
            headerName: 'Signal',
            width: 70,
            renderCell: (params: GridRenderCellParams<DeviceData>) => (
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
            width: 130,
            valueGetter: (params: GridValueGetterParams<DeviceData>) => params.row.ip
        },
        {
            field: 'location',
            headerName: 'Location',
            width: 200,
            valueGetter: (params: GridValueGetterParams<DeviceData>) => 
                `${params.row.latitude}, ${params.row.longitude}`
        },
        {
            field: 'distance',
            headerName: 'Distance (km)',
            width: 130,
            valueGetter: (params: GridValueGetterParams<DeviceData>) => 
                params.row.distance?.toFixed(2) || ''
        },
        {
            field: 'throughput',
            headerName: 'Throughput (Mbps)',
            width: 150,
            valueGetter: (params: GridValueGetterParams<DeviceData>) => 
                params.row.throughput
        },
        {
            field: 'rsrp',
            headerName: 'RSRP (dBm)',
            width: 130,
            valueGetter: (params: GridValueGetterParams<DeviceData>) => 
                params.row.rsrp
        },
        {
            field: 'rsrq',
            headerName: 'RSRQ (dB)',
            width: 130,
            valueGetter: (params: GridValueGetterParams<DeviceData>) => 
                params.row.rsrq
        },
        {
            field: 'pci',
            headerName: 'PCI',
            width: 100,
            valueGetter: (params: GridValueGetterParams<DeviceData>) => params.row.pci
        },
        {
            field: 'arfcn',
            headerName: 'ARFCN',
            width: 100,
            valueGetter: (params: GridValueGetterParams<DeviceData>) => params.row.arfcn
        }
    ];

    const processedRows = devices.map((device, index) => ({
        id: device.ip || `row-${index}`,
        ...device
    }));

    return (
        <Box sx={{ height: 600, width: '100%' }}>
            <DataGrid
                rows={processedRows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10, 25, 50]}
                checkboxSelection
                disableSelectionOnClick
                components={{
                    Toolbar: GridToolbar
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
