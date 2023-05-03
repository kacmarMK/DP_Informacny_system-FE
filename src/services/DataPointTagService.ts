import http from "@/http-common";
import DataPointTag from "@/interfaces/DataPointTag";

class DataPointTagService {

    getDataPointTags(): Promise<any> {
        return http.get("datapoint/datapointtag");
    }

    createDataPointTag(dataPointTag: DataPointTag): Promise<any> {
        return http.post("datapoint/datapointtag/create", dataPointTag);
    }

    getDataPointTagById(dataPointTagId: string): Promise<any> {
        return http.get("datapoint/datapointtag/getDataPointTagById/" + dataPointTagId);
    }

    getStoredData(dataPointTagId: string): Promise<any> {
        return http.get("datapoint/datapointtag/getStoredData/" + dataPointTagId);
    }

    updateDataPointTag(dataPointTagId: string, changeDataPointTag: DataPointTag): Promise<any> {
        return http.post("datapoint/datapointtag/updateDataPointTag/" + dataPointTagId, changeDataPointTag);
    }

    deleteDataPointTag(dataPointTagId: string): Promise<any> {
        return http.delete("datapoint/datapointtag/deleteDataPointTag/" + dataPointTagId);
    }
}

export default new DataPointTagService;