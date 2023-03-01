import DeviceType from '@/interfaces/DeviceType'
interface Dashboard {
    id?: string;
    name: string;
    icon?: string;
    layout?: Object;
    type?: string;
    value?: number;
    deviceName?: string;
}


export default Dashboard;