export const middle2 = (err, req, res, next) => {
    res.send({
        error: 'Not Found',
        message: err,
        status: 404,
        timestamp: new Date(),
    });
};
