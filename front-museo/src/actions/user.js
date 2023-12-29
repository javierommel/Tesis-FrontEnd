import AuthService from "../services/user.service";

export const getUser = async () => {
    return AuthService.getUser().then(
        (response) => {
            console.log("datos "+JSON.stringify(response.data.data))
            return response.data.data
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