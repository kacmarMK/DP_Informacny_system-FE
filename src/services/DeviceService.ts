import http from "@/http-common";
import Device from "@/interfaces/Device";

class DeviceService {

        createDevice(device: Device): Promise<any> {
            return http.post('device/create' , device);
        }

        getDevices(): Promise<any> {
            return http.get("device");
        }

        initializeDevice(macAddress: string): Promise<any> {
            return http.get("device/initializeDevice/" + macAddress);
        }

        initExpireTime(deviceId: string): Promise<any> {
            return http.get("device/initExpireTime/" + deviceId);
        }

        deleteDevice(deviceId: string): Promise<any> {
            return http.delete("device/delete/" + deviceId);
        }

        getDeviceById(deviceId: string): Promise<any> {
            return http.get("device/getDeviceById/" + deviceId);
        }

        addJobToDevice(deviceId: string, jobId: string): Promise<any> {
            return http.put("device/addJobToDevice/" + deviceId + "/" + jobId);
        }

        addDataPointTagToDevice(deviceId: string, dataPointTagId: string): Promise<any> {
            return http.put("device/addDataPointTagToDevice/" + deviceId + "/" + dataPointTagId);
        }

        getAllDeviceJobs(deviceId: string, pending: boolean): Promise<any> {
            return http.get("device/getAllDeviceJobs/" + deviceId + "/" + pending);
        }

        updateJobStatus(deviceId: string, jobStatusId: string): Promise<any> {
            return http.post("device/updateJobStatus/" + deviceId + "/" + jobStatusId);
        }

        getDeviceStatus(deviceId: string): Promise<any> {
            return http.get("device/getDeviceStatus/" + deviceId);
        }
}

export default new DeviceService;