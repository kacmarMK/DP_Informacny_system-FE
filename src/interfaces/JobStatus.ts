import JobStatusEnum from '../modules/enums/JobStatusEnum';
import DataPoint from './DataPoint';

interface JobStatus {
    uid?: string;
    jobId?: string;
    retCode?: string;
    code?: string;
    currentStep?: number;
    totalSteps?: number;             
    currentCycle?: number;
    data?: Array<DataPoint>;
    createdAt?: number;
    //lastUpdated?: Date;           //TODO
}

export default JobStatus;