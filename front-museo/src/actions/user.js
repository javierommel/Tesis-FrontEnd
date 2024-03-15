import AuthService from "../services/user.service";

export const getUser = async ({ page, pageSize }) => {
    return AuthService.getUser(page, pageSize).then(
        (response) => {
            //console.log("datos "+JSON.stringify(response.data))
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

export const deleteUser = async ( id, usuario_modificacion ) => {
    return AuthService.deleteUser(id, usuario_modificacion).then(
        (response) => {
            return { message: response.data.message, retcode: 0 }
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return { message, retcode: 1 };
        }
    );
};

export const updateUser = async (id, values, usuario_modificacion, roles, image) => {
    return AuthService.updateUser(id, values, usuario_modificacion, roles, image).then(
        (response) => {
            return { message: response.data.message, retcode: 0 };
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return { message, retcode: 1 };
        }
    );
};

export const addUser = async (name, username, email, password, country, year, usuario_modificacion, roles) => {
    return AuthService.addUser(name, username, email, password, country, year, usuario_modificacion, roles).then(
        (response) => {
            return { message: response.data.message, retcode: 0 };
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return { message, retcode: 1 };
        }
    );
};

export const getUserId = async ( usuario ) => {
    return AuthService.getUserId(usuario).then(
        (response) => {
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
        }
    );
};