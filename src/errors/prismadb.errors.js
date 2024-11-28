export const notFoundError = (res) => {
    return res
        .status(404)
        .send("Esse dado não foi encontrado no banco de dados!");
};
