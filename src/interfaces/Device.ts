import DeviceTypeEnum from '../modules/enums/DeviceTypeEnum.js';
import Job from './Job';
import DataPointTag from './DataPointTag';

interface Device {
    uid?: string;
    name?: string;
    mac?: number;
    type?: typeof DeviceTypeEnum;
    version?: string;
    firmware?: string;
    jobs?: Array<Job>;
    dataPointTags?: Array<DataPointTag>;
    responseTime?: number;
    addTime?: number;
    initExpireTime?: number;
    initApiKey?: string;
    deactivated?: boolean;
}

export default Device;