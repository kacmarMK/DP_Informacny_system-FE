import Command from "./Command";

interface Job {
    id?: string
    name: string
    commandEntitySet: Array<Command>
    periodic: boolean
    active: boolean
}

export default Job;