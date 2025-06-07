# UE Devices Map Viewer

This is a real-time web application built with React to display User Equipment (UE) devices on an interactive OpenStreetMap. The project provides both a visual map view and a tabular view of connected network devices.

## 🌐 Live Map + Realtime Devices

The application uses a modular structure with reusable components like `DeviceCard`, `DeviceModal`, `DeviceTable`, and `Map` to fetch and render live UE device information.

---

## 📁 Project Structure

src/
├── components/
│ ├── DeviceCard/ # Card layout for device info
│ ├── DeviceModal/ # Modal popup for device details
│ ├── DeviceTable/ # Tabular data of UE devices
│ └── Map/ # Map component (OpenStreetMap)
├── hooks/ # Custom React hooks
├── services/ # API interaction and device services
├── types/ # TypeScript types
├── utils/ # Utility functions
├── App.tsx # Main application entry
└── index.tsx # React entry point

yaml
Copy
Edit

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or above)
- npm (v8 or above)

### Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/sandeep26-11/UE.git
cd UE
npm install
npm start

## 📸 Screenshot

Here’s how the real-time UE devices appear on the map:

![UE Device Map Screenshot](https://raw.githubusercontent.com/sandeep26-11/UE/main/ue.PNG)

