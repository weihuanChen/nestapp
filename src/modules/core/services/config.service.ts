import { get } from 'lodash';

const config: Record<string, any> = {
    name: '3r',
};
export class ConfigService {
    protected config: RecordAny;

    constructor(data: RecordAny) {
        this.config = data;
    }

    get<T>(key: string, defaultValue?: T): T | undefined {
        return get(config, key, defaultValue);
    }
}
