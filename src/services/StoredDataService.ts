import http from "@/http-common"
import StoredData from "@/interfaces/StoredData";

class StoredDataService {

    getStoredData(): Promise<any> {
        return http.get('datapoint/datapointsave');
    }

    createStoredData(storedData: StoredData): Promise<any> {
        return http.post('datapoint/datapointsave/create', storedData);
    }

    getStoredDataById(storedDataId: string): Promise<any> {
        return http.get('datapoint/datapointsave/getStoredDataById/' + storedDataId);
    }

    updateStoredData(storedDataId: string): Promise<any> {
        return http.put('datapoint/datapointsave/updateStoredData/' + storedDataId);
    }

    deleteStoredData(storedDataId: string): Promise<any> {
        return http.delete('datapoint/datapointsave/deleteStoredData/' + storedDataId);
    }

} 

export default new StoredDataService;