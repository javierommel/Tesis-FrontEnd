import AuthService from "../services/general.service";

export const getCountry = async () => {
    return AuthService.getCountry().then(
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

export const getContent = async () => {
    return AuthService.getContent().then(
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

export const updateContent = async (data, usuario_modificacion, imagen1, imagen2, imagen3, imagen4) => {
    return AuthService.updateContent(data, usuario_modificacion, imagen1, imagen2, imagen3, imagen4).then(
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

export const getReport = async (tipo) => {
    return AuthService.getReport(tipo).then(
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