export const middle2 = (err, req, res, next) => {
    res.send({
        error: err,
        timestamp: new Date(),
    });
};
