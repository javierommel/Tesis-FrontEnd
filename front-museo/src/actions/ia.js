import AuthService from "../services/ia.service";

export const getRecommendation = async (user) => {
    return AuthService.getRecommendation(user).then(
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

