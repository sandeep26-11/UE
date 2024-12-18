export function getSignalColor(rsrp: number): string {
    if (rsrp >= -80) return '#4CAF50';  // Excellent
    if (rsrp >= -90) return '#8BC34A';  // Good
    if (rsrp >= -100) return '#FFEB3B'; // Fair
    if (rsrp >= -110) return '#FFC107'; // Poor
    return '#F44336';                   // Very Poor
}
