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

export const deleteUser = async ({id, usuario_modificacion}) => {
    console.log("id: "+id+" user: "+usuario_modificacion)
    return AuthService.deleteUser(id, usuario_modificacion).then(
        (response) => {
            console.log(response.message)
            return response.message
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
                return message;
        }
    );
};

export const updateUser = async ({page, pageSize}) => {
    return AuthService.getUser(page, pageSize).then(
        (response) => {
            console.log("datos "+JSON.stringify(response.data))
            return response.data
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