import Field from "./Field";
import DeviceTypeEnum from '../modules/enums/DeviceTypeEnum.js';

interface Command {
    id?: string;
    name?: string;
    params?: Array<number>;
    deviceType?: typeof DeviceTypeEnum;
    createdAt?: number;
    deactivated?: boolean;
}


export default Command;