import http from "@/http-common";
import Command from "@/interfaces/Command";
import CommandHelper from "@/interfaces/CommandHelper";

class CommandService {

    getAllCommands(): Promise<any> {
        return http.get("command/getAllCommands");
    }

    getAllCommandByName(): Promise<any> {
        return http.get("command/getAllCommands");
    }

    getCommandById(id: string): Promise<any> {
        return http.get("command/getCommandById/" + id);
    }

    addCommand(command: CommandHelper): Promise<any> {
        return http.post("command/addCommand", command);
    }

    deleteCommandById(id: string): Promise<any> {
        return http.delete("command/deleteById?Id=" + id)
    }

    pendingRequest(command: CommandHelper): Promise<any> {
        return http.post('command/pendingRequest', command)
    }
}

export default new CommandService;