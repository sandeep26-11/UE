import { DeviceData } from '../types';

export class UDPService {
    private messageCallback: (data: DeviceData) => void;
    private eventSource!: EventSource;  // Definite assignment assertion

    constructor(port: number, onMessage: (data: DeviceData) => void) {
        this.messageCallback = onMessage;
        this.setupEventSource(port);
    }

    private setupEventSource(port: number) {
        // Connect to backend running on localhost:4047
        this.eventSource = new EventSource(`http://localhost:${port}/api/udp-events`);

        this.eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                this.messageCallback(data);
            } catch (error) {
                console.error('Error parsing UDP message:', error);
            }
        };

        this.eventSource.onerror = () => {
            console.log('EventSource disconnected. Attempting to reconnect...');
            setTimeout(() => this.setupEventSource(port), 8000);
        };
    }

    public close() {
        this.eventSource.close();
    }
}
