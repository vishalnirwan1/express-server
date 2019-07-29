export const middle1 = (req, res, next) => {
    console.log('inside 1st middleware');
    next('Not Found');
};
