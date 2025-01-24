export type ParamValue =
    | string
    | number
    | (string | number)[]
    | null
    | undefined;

type ParamsObject = Record<string, ParamValue>;

export class URLBuilder {
    private baseUrl: string;
    private params: URLSearchParams;

    private constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.params = new URLSearchParams();
    }

    static get builder(): URLBuilder {
        return new URLBuilder('');
    }

    setBaseUrl(baseUrl: string): this {
        this.baseUrl = baseUrl;
        return this;
    }

    addParam(key: string, value: ParamValue): this {
        if (value != null && value !== "") {
            if (Array.isArray(value)) {
                if(value.length > 0)  this.params.append(key, value.join(','));
            } else {
                this.params.append(key, value.toString());
            }
        }
        return this;
    }

    addParams(paramsObject: ParamsObject): this {
        Object.entries(paramsObject).forEach(([key, value]) => {
            this.addParam(key, value);
        });
        return this;
    }

    toString(): string {
        if (!this.baseUrl) {
            throw new Error('Base URL must be set before converting to string.');
        }
        return `${this.baseUrl}?${this.params.toString()}`;
    }
}