import http from "@/http-common";
import Job from "@/interfaces/Job";
class JobService {

    createJobFromRecipe(recipeId: string, deviceId: string, repetitions: number): Promise<any> {
        return http.post("jobs/job/runJobFromRecipe/" + recipeId + "/" + deviceId + "/" + repetitions);
    }

    runJob(job: Job, deviceId: string, repetitions: number): Promise<any> {
        return http.post("jobs/job/runJob/" + job + "/" + deviceId + "/" + repetitions);
    }

    resetJob(jobId: string): Promise<any> {
        return http.post("jobs/job/resetJob/" + jobId);
    }

    getJobById(jobId: string): Promise<any> {
        return http.get("jobs/job/getJobById/" + jobId);
    }

    getJobsByName(name: string): Promise<any> {
        return http.get("jobs/job/getJobsByName/" + name);
    }

    skipCycle(jobId: string): Promise<any> {
        return http.put("jobs/job/skipCycle/" + jobId);
    }

    skipStep(jobId: string): Promise<any> {
        return http.put("jobs/job/skipStep/" + jobId);
    }

    pauseJob(jobId: string): Promise<any> {
        return http.put("jobs/job/pauseJob/" + jobId);
    }

    cancelJob(jobId: string): Promise<any> {
        return http.put("jobs/job/cancelJob/" + jobId);
    }

    continueJob(jobId: string): Promise<any> {
        return http.put("jobs/job/continueJob/" + jobId);
    }

    getJobStatus(jobId: string): Promise<any> {
        return http.get("jobs/job/getJobStatus/" + jobId);
    }

    getAllJobsOnDevice(deviceId: string, sortBy: string, sortDirection: string): Promise<any> {
        return http.get("jobs/job/getAllJobsOnDevice/" + deviceId + "/" + sortBy + "/" + sortDirection);
    }

    getAllJobsOnDevicePageable(deviceId: string, page: number, pageSize: number, sortBy: string, sortDirection: string): Promise<any> {
        return http.get("jobs/job/getAllJobsOnDevicePageable/" + 
                            deviceId + "/" + page + "/" + pageSize + "/" 
                                + sortBy + "/" + sortDirection);
    }

    getFinishedJobsByStatus(deviceId: string, sortBy: string, sortDirection: string): Promise<any> {
        return http.get("jobs/job/getFinishedJobs/" + deviceId + "/" + sortBy + "/" + sortDirection);
    }

    getRunningJobsByStatus(deviceId: string, sortBy: string, sortDirection: string): Promise<any> {
        return http.get("jobs/job/getRunningJobs/" + deviceId + "/" + sortBy + "/" + sortDirection);
    }

    getJobsByStatus(deviceId: string, status: string, sortBy: string, sortDirection: string): Promise<any> {
        return http.get("jobs/job/getJobsByStatus/" + deviceId + "/" + status + "/" + sortBy + "/" + sortDirection);
    }

    getAllJobsByStatusPageable(deviceId: string, status: string, page: number, pageSize: number, sortBy: string, sortDirection: string): Promise<any> {
        return http.get("jobs/job/getAllJobsByStatusPageable/" + deviceId + "/" + status + "/" + page + "/" + pageSize + "/" + sortBy + "/" + sortDirection);
    }
}

export default new JobService;