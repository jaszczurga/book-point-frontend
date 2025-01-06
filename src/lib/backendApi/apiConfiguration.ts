const ApiConfig = {
    BaseUrl: process.env.BACKEND_API_URL || 'http://localhost:3000',
    Endpoints: {
        Auth: {
            Login: '/auth/login',
            Register: '/auth/register',
        },
        Posts: {
            All: '/posts',
            Create: '/posts/create',
        },
    },
};

export default ApiConfig;
