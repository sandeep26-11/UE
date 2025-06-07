import { DeviceTable } from './components/DeviceTable/DeviceTable';
import { Map } from './components/Map/Map';
import { DeviceModal } from './components/DeviceModal/DeviceModal';
import { useDeviceMonitor } from './hooks/useDeviceMonitor';
import towerLocations from './data/towerLocation.json';
import './App.css';

function App() {
    const {
        devices,
        selectedDevice,
        handleDeviceClick,
        handleModalClose
    } = useDeviceMonitor();

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
