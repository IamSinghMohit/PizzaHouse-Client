import axios from "axios";

const api = axios.create({
    baseURL:'http://localhost:3001',
    withCredentials: true,
});

api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response?.status === 401 &&
            originalRequest &&
            !originalRequest?._isRetry
        ) {
            originalRequest._isRetry = true;
            try {
                await axios.get(
                    `${'http://localhost:3001'}/auth/refresh`,
                    {
                        withCredentials: true,
                    }
                );

                return api.request(originalRequest);
            } catch (err:any) {
                console.log(err.message);
            }
        }
        throw error;
    }
);

export default api;
