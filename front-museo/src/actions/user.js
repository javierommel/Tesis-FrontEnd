import AuthService from "../services/user.service";

export const getUser = async ({page, pageSize}) => {
    return AuthService.getUser(page, pageSize).then(
        (response) => {
            console.log("datos "+JSON.stringify(response.data))
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