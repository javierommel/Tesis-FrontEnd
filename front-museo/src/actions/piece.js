import AuthService from "../services/piece.service";

export const getPiece = async ({page, pageSize}) => {
    return AuthService.getPiece(page, pageSize).then(
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
            //return Promise.reject();
        }
    );
};
export const getInformationPiece = async () => {
    return AuthService.getInformationPiece().then(
        (response) => {
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

export const addPiece = async (file, usuario_modificacion) => {
    return AuthService.addPiece(file, usuario_modificacion).then(
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

export const updatePiece = async (id, values, usuario_modificacion, materiales, deterioros, imagen1, imagen2) => {
    return AuthService.updatePiece(id, values, usuario_modificacion, materiales, deterioros, imagen1, imagen2).then(
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

export const deletePiece = async ( id, usuario_modificacion ) => {
    return AuthService.deletePiece(id, usuario_modificacion).then(
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

