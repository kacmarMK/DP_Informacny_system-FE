import Command from "./Command";
import JobStatus from "./JobStatus";

interface Job {
    uid?: string;
    deviceId?: string;
    name?: string;
    noOfCmds?: number;
    noOfReps?: number;
    status?: JobStatus;
    currentStatus?: string;
    commands?: Array<Command>;
    toCancel?: boolean;
    paused?: boolean;
    createdAt?: number;
    startedAt?: number;
    finishedAt?: number;
}

export default Job;