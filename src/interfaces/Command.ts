import DeviceTypeEnum from '../modules/enums/DeviceTypeEnum.js';

interface Command {
    id: string;
    name?: string;
    params?: Array<number>;
    deviceType?: string;
    createdAt?: number;
    deactivated?: boolean;
}


export default Command;