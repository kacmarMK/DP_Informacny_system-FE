import CommandHelper from "./CommandHelper"

interface JobHelper {
    id?: string
    name: string
    commandEntitySet: Array<CommandHelper>
    periodic: boolean
    active: boolean
}

export default JobHelper;