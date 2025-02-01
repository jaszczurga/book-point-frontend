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
            GetById: '/books',
        },
        Categories: {
            All: '/categories',
            AllFull: '/categories/full',
        },
        GoogleBooks: {
            Search: '/api/v1/books/google',
        },
    },
};

export default ApiConfig;
