export const middle2 = (err, req, res, next) => {
    res.send({
        message: err,
        timestamp: new Date(),
    });
};
