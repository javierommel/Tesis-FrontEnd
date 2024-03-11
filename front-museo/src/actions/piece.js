import AuthService from "../services/piece.service";

export const getPiece = async ({page, pageSize}) => {
    return AuthService.getPiece(page, pageSize).then(
        (response) => {
            //console.log("datosp "+JSON.stringify(response.data.data))
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

export const addPiece = async (file) => {
    return AuthService.addPiece(file).then(
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