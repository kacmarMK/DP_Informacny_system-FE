import http from "@/http-common";
import Command from "@/interfaces/Command";

class CommandService {

    createCommand(command: Command): Promise<any> {
        return http.post("jobs/command/createCommand", command);
    }

    getCommand(commandId: string): Promise<any> {
        return http.get("jobs/command/getCommandById/" + commandId);
    }

    getCommandByName(commandName: string): Promise<any> {
        return http.get("jobs/command/getCommandByName/" + commandName);
    }

    getAllCommands(sortBy: string, sortDirection: string): Promise<any> {
        return http.get("jobs/command/getAllCommands/" + sortBy + "/" + sortDirection);
    }

    getAllCommandsWithPagination(page: number, pageSize: number, sortBy: string, sortDirection: string): Promise<any> {
        return http.get("jobs/command/getAllCommandsWithPagination/" + page + "/" + pageSize + "/" + sortBy + "/" + sortDirection);
    }

    getCommandsByDeviceType(deviceType: string, sortBy: string, sortDirection: string): Promise<any> {
        return http.get("jobs/command/getCommandsByDeviceType/" + deviceType + "/" + sortBy + "/" + sortDirection);
    }

    getCommandByDeviceTypeAndPages(deviceType: string, page: number, pageSize: number, sortBy: string, sortDirection: string): Promise<any> {
        return http.get("jobs/command/getCommandByDeviceTypeAndPages/" + deviceType + "/" + page + "/" + pageSize + "/" + sortBy + "/" + sortDirection);
    }

    deleteCommand(commandId: string): Promise<any> {
        return http.delete("jobs/command/deleteCommand/" + commandId);
    }

    updateCommand(commandId: string): Promise<any> {
        return http.put("jobs/command/updateCommand/" + commandId);
    }
}

export default new CommandService;