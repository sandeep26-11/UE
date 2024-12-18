import { DeviceData } from '../types';

export class UDPService {
    private messageCallback: (data: DeviceData) => void;
    private eventSource!: EventSource;  // Using definite assignment assertion

    constructor(port: number, onMessage: (data: DeviceData) => void) {
        this.messageCallback = onMessage;
        this.setupEventSource(port);
    }

    private setupEventSource(port: number) {
        this.eventSource = new EventSource(`/api/udp-events`);
        
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
