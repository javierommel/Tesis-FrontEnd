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

export const deleteComment = async ( id, usuario_modificacion ) => {
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

export const updateComment = async (id, estado, usuario_modificacion) => {
    return AuthService.updateComment(id, estado, usuario_modificacion).then(
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

export const addComment = async (comentario, puntuacion, usuario) => {
    return AuthService.addComment(comentario, puntuacion, usuario).then(
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

export const getComment = async ( { page, pageSize, usuario } ) => {
    return AuthService.getComment(page, pageSize, usuario).then(
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