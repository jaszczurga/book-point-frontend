import ApiConfig from "@/lib/backendApi/apiConfiguration";

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

class FetchWrapper {
    private baseURL?: string;
    private token: string;

    constructor(token: string, baseURL: string = ApiConfig.BaseUrl) {
        this.baseURL = baseURL;
        this.token = token;
    }

    private async request<T, B = undefined>(
        endpoint: string,
        method: Method,
        body?: B
    ): Promise<T> {
        const url = `${this.baseURL}${endpoint}`;
        const options: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`,
            },
        };

        if (body !== undefined) {
            options.body = JSON.stringify(body);
        }

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                console.log('error response:', response);
                throw new FetchError(response.status);
            }

            return (await response.json()) as T;
        } catch (error) {
            console.error('FetchWrapper request error:', error);
            throw error;
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
}

class FetchError extends Error {
    status: number;
    name: string;
    constructor(status: number, message: string = "No error message provided") {
        super(message);
        this.status = status;
        this.name = 'FetchError';
    }
}

export default FetchWrapper;
