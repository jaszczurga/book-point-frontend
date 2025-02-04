import ApiConfig from "@/lib/backendApi/apiConfiguration";

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

class FetchWrapper {
    private baseURL?: string;
    private token: string | null;

    constructor(token?: string, baseURL: string = ApiConfig.BaseUrl) {
        this.baseURL = baseURL;
        this.token = token ?? null;
    }

    private async request<T, B = undefined>(
        endpoint: string,
        method: Method,
        body?: B,
    ): Promise<T> {
        const url = `${this.baseURL}${endpoint}`;
        const headers: Record<string,string> = {};

        if(!(body instanceof FormData)) {
            headers['Content-Type'] = 'application/json';
        }
        if(this.token !== null) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        const options: RequestInit = {
            method,
            headers,
        };

        if (body !== undefined) {
            options.body = body instanceof FormData ? body : JSON.stringify(body);
        }

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                let errorBody: any;
                try {
                    errorBody = await response.json(); // Attempt to parse JSON error response
                } catch {
                    throw new FetchError(response.status, "Unknown error from server");
                }

                const errorCode = errorBody?.errorCode || "UNKNOWN_ERROR";
                const errorMessage = errorBody?.errorMessage || `HTTP error! Status: ${response.status}`;
                const errorPath = errorBody?.apiPath || "Unknown path";
                const errorTime = errorBody?.errorTime || new Date().toISOString();

                throw new FetchError(response.status, errorMessage, errorCode, errorPath, errorTime);
            }

            return (await response.json()) as T;
        } catch (error) {
            console.error('FetchWrapper request error:', error);
            if (error instanceof FetchError) {
                throw error;
            } else {
                throw new FetchError(0, "Network error: Unable to reach API");
            }
        }
    }

    async get<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, 'GET');
    }

    async post<T, B>(endpoint: string, body: B): Promise<T> {
        return this.request<T, B>(endpoint, 'POST', body);
    }

    async put<T, B>(endpoint: string, body: B): Promise<T> {
        return this.request<T, B>(endpoint, 'PUT', body);
    }

    async delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, 'DELETE');
    }

    async postForm<T, FormData>(endpoint: string, body: FormData): Promise<T> {
        return this.request<T, FormData>(endpoint, 'POST', body);
    }
}

export class FetchError extends Error {
    status: number;
    errorCode: string;
    apiPath: string;
    errorTime: string;

    constructor(
        status: number,
        message: string = "Unknown error",
        errorCode: string = "UNKNOWN_ERROR",
        apiPath: string = "Unknown path",
        errorTime: string = new Date().toISOString()
    ) {
        super(message);
        this.status = status;
        this.errorCode = errorCode;
        this.apiPath = apiPath;
        this.errorTime = errorTime;
        this.name = 'FetchError';
    }
}

export default FetchWrapper;
