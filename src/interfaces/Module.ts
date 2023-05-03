import Device from "./Device";

interface Module {
    uid?: string;
    name?: string;
    devices?: Array<Device>;
    createdAt?: number;
}

export default Module;