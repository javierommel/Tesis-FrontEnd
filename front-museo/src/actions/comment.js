import AuthService from "../services/comment.service";

export const getCommentList = async ({ page, pageSize }) => {
    return AuthService.getCommentList(page, pageSize).then(
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

export const deleteComment = async ({ id, usuario_modificacion }) => {
    return AuthService.deleteComment(id, usuario_modificacion).then(
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

export const updateComment = async (id, values, usuario_modificacion, roles, image) => {
    return AuthService.updateComment(id, values, usuario_modificacion, roles, image).then(
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

export const addComment = async (name, username, email, password, country, year, usuario_modificacion, roles) => {
    return AuthService.addComment(name, username, email, password, country, year, usuario_modificacion, roles).then(
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

export const getComment = async ( { page, pageSize } ) => {
    return AuthService.getComment(page, pageSize).then(
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