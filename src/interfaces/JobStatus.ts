import JobStatusEnum from '../modules/enums/JobStatusEnum';
import DataPoint from './DataPoint';

interface JobStatus {
    uid?: string;
    jobId?: string;
    retCode?: typeof JobStatusEnum;
    code?: typeof JobStatusEnum;
    currentStep?: number;
    totalSteps?: number;             
    currentCycle?: number;
    data?: Array<DataPoint>;
    createdAt?: number;
    lastUpdated?: Date;
}

export default JobStatus;