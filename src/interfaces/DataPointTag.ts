import StoredData from './StoredData';

interface DataPointTag {
    uid?: string;
    tag?: string;
    name?: string;
    unit?: string;
    decimal?: number;
    storedData?: Array<StoredData>;
    createdAt?: number;
    deactivated?: boolean;
}

export default DataPointTag;