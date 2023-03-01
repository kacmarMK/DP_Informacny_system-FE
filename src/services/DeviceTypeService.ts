import http from "@/http-common";
import DeviceType from "@/interfaces/DeviceType";

class DeviceTypeService {

        addDeviceType(type: DeviceType): Promise<any> {
            return http.post('typeOfDevices/addTypeOfDevices' , type)
        }

        getAllTypes(): Promise<any> {
            return http.get("typeOfDevices/getAllTypesOfDevices");
        }

        getTypeById(id: string): Promise<any> {
            return http.get("typeOfDevices/getTypesOfDevicesById/" + id);
        }

        getTypeOfDeviceByName(name: string): Promise<any> {
            return http.get("typeOfDevices/getTypesOfDeviceByName/" + name);
        }

        deleteTypeById(id: string): Promise<any> {
            return http.delete("typeOfDevices/deleteById?Id=" + id)
        }

}

export default new DeviceTypeService;