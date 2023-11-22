export const getEnvironments = () => {
    return {
        VITE_APP_DOCKER_PORT: import.meta.env.VITE_APP_DOCKER_PORT,
        VITE_APP_URL: import.meta.env.VITE_APP_URL,
    };
};