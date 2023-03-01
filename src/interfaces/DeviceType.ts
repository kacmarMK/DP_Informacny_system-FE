import Command from "./Command";

interface DeviceType {
    id?: string;
    name: string;
    from: number;
    to: number;
    commands: Array<Command>
}

export default DeviceType;