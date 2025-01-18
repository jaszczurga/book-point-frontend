const ApiConfig = {
    BaseUrl:'http://localhost:8080',
    Endpoints: {
        Auth: {
            Validate: '/customers/validate',
            Login: '/auth/login',
            Register: '/auth/register',
        },
        Books: {
            All: '/books',
            Create: "/books/create",
        },
    },
};

export default ApiConfig;
