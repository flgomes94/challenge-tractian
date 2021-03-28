export default interface IAsset {
    id: number;
    model: string;
    name: string;
    healthscore: number;
    image: string;
    companyId: number;
    unitId: number;
    status: 'inAlert' | 'inOperation' | 'inDowntime';
    specifications: {
        maxTemp: number;
        power: number;
        rpm: number;
    };
    metrics: {
        lastUptimeAt: string;
        totalUptime: number;
        totalCollectsUptime: number;
    };
}
