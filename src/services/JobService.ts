import http from "@/http-common";
import Job from "@/interfaces/Job";
import JobHelper from "@/interfaces/JobHelper";
class JobService {

    getAllJobs(): Promise<any> {
        return http.get("job/getAllEsp32Jobs");
    }

    getJobById(id: string): Promise<any> {
        return http.get("job/getEsp32JobById/" + id);
    }

    addJob(job: JobHelper): Promise<any> {
        return http.post("job/addEsp32Job", job);
    }

    deleteJobById(id: string): Promise<any> {
        return http.delete("job/deleteById?Id=" + id)
    }

}

export default new JobService;