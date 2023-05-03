import http from "@/http-common";
import JobStatus from "@/interfaces/JobStatus";

class JobStatusService {

    createJobStatus(jobStatus: JobStatus): Promise<any> {
        return http.post("jobs/status/create", jobStatus);
    }

    getJobStatus(jobStatusId: string): Promise<any> {
        return http.get("jobs/status/getJobStatus/" + jobStatusId);
    }

    updateJobStatus(jobStatusId: string, jobStatus: JobStatus): Promise<any> {
        return http.post("jobs/status/updateJobStatus/" + jobStatusId, jobStatus);
    }
}

export default new JobStatusService;