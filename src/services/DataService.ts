import http from "@/http-common";
import Data from "@/interfaces/Data";

class DataService {

    getData(dateFrom: string, dateTo: string, limit: number): Promise<any> {
        return http.get("data?_limit=" + limit );
    }

    getTableData(millisFrom: number, millisTo: number, pageNo: number): Promise<any> {
        return http.get("ping/getAllPingsBetweenDatesWithPagination?millisFrom=" + millisFrom + "&millisTo=" + millisTo + "&pageNo=" + pageNo +"&pageSize=10")
    }

    getChartData(millisFrom: number, millisTo: number, pageSize: number): Promise<any> {       
        return http.get("ping/getAllPingsBetweenDatesWithPagination?millisFrom=" + millisFrom + "&millisTo=" + millisTo + "&pageNo=1&pageSize=" + pageSize)
    }

    getAllData(millisFrom: number, millisTo: number): Promise<any>{
        return http.get("ping/getAllPingsBetweenDates?millisFrom=" + millisFrom + "&millisTo=" + millisTo)
    }
}

export default new DataService;