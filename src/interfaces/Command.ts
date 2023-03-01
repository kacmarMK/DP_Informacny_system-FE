import Field from "./Field";

interface Command {
    id?: string;
    name: string;
    commandId: number;
    fields: Array<Field>;
}


export default Command;