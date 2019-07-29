export const middle2 = (err, req, res, next) => {
    console.log('inside middleware 2', err);
    res.send({
        error: 'Not Found',
        message: err,
        status: 500,
        timestamp: new Date(),
    });
};
