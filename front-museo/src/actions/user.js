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

export const addUser = async (estado, name, username, email, password, country, year, usuario_modificacion, roles) => {
    return AuthService.addUser(estado, name, username, email, password, country, year, usuario_modificacion, roles).then(
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

export const addUserGoogle = async (name, username, email, imagen) => {
    return AuthService.addUserGoogle(name, username, email, imagen).then(
        (response) => {
            //console.log("correcto")
            return { message: response.data.message, retcode: 0 };
        },
        (error) => {
            //console.log("incorrecto")
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