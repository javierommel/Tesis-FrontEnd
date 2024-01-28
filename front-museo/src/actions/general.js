import AuthService from "../services/general.service";

export const getCountry = async () => {
    return AuthService.getCountry().then(
        (response) => {
            console.log("datosp "+JSON.stringify(response.data.data))
            return response.data
            //return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

                return message;
            //return Promise.reject();
        }
    );
};