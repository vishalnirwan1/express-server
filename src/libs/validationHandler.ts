const validationHandler = (config) => (req, res, next) => {
    switch (req.method) {
        case 'POST':
            const allKeysPost = Object.keys(req.body);
            allKeysPost.forEach((bodyKey1) => {
                if (config.hasOwnProperty(bodyKey1)) {
                    const value = req.body[bodyKey1];
                    if (bodyKey1 === 'id') {
                        if (!value) {
                            next(bodyKey1 + ' is required');
                        }
                        if (!(typeof (value) === 'string')) {
                            next('invalid ' + bodyKey1);
                        }
                    }
                    else if (bodyKey1 === 'name') {
                        if (!value) {
                            next(config.name.errorMessage);
                        }
                    }
                }
                else {
                    next('not found post');
                }
            });
            break;
        case 'GET':
            const allKeysGet = Object.keys(req.query);
            allKeysGet.forEach((queryKey1) => {
                if (config.hasOwnProperty(queryKey1)) {
                    const value = req.query[queryKey1];
                    console.log(value);
                    if (queryKey1 === 'skip') {
                        if (isNaN(value)) {
                            next(config.skip.errorMessage);
                        }
                    }
                    else if (queryKey1 === 'limit') {
                        if (isNaN(value)) {
                            next(config.limit.errorMessage);
                        }
                    }
                }
                else {
                    next('not found get');
                }
            });
            break;
        case 'PUT':
            const allKeysPut = Object.keys(req.body);
            allKeysPut.forEach((bodyKey1) => {
                if (config.hasOwnProperty(bodyKey1)) {
                    const value = req.body[bodyKey1];
                    if (bodyKey1 === 'id') {
                        if (!value) {
                            next(bodyKey1 + ' is required');
                        }
                        if (!(typeof (value) === 'string')) {
                            next('invalid ' + bodyKey1);
                        }
                    }
                    else if (bodyKey1 === 'dataToUpdate') {
                        if (!value) {
                            next(bodyKey1 + ' is required');
                        }
                    }
                }
                else {
                    next('not found put');
                }
            });
            break;
        case 'DELETE':
            const allKeysDelete = Object.keys(req.query);
            allKeysDelete.forEach((bodyKey1) => {
                if (config.hasOwnProperty(bodyKey1)) {
                    const value = req.body[bodyKey1];
                    if (bodyKey1 === 'id') {
                        if (!value) {
                            next(config.id.errorMessage);
                        }
                    }
                }
                else {
                    next('not found delete');
                }
            });
            break;
    }
    next();
};
export default validationHandler;
