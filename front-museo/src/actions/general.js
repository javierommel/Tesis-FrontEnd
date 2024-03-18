import AuthService from "../services/general.service";

export const getCountry = async () => {
    return AuthService.getCountry().then(
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