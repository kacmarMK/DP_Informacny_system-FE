import Command from "./Command";
import JobStatusEnum from '../modules/enums/JobStatusEnum';
import JobStatus from "./JobStatus";

interface Job {
    uid?: string;
    deviceId?: string;
    name?: string;
    noOfCmds?: number;
    noOfReps?: number;
    status?: JobStatus;
    currentStatus?: typeof JobStatusEnum;
    commands?: Array<Command>;
    toCancel?: boolean;
    paused?: boolean;
    createdAt?: number;
    startedAt?: number;
    finishedAt?: number;
}

export default Job;