export const errorHandler = (err, req, res, next) => {
    res.send({
        error: err,
        timestamp: new Date(),
    });
};
