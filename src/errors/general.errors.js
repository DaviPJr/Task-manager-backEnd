export const handleError = (res, error) => {
    console.error(error);
    res.status(500).send({
        error: "Ocorreu um erro interno. Tente novamente mais tarde.",
    });
};
