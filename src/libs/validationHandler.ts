const validationHandler = (config) => (req, res, next) => {
    switch (req.method) {
        case 'POST':
            const allKeysPost = Object.keys(req.body);
            allKeysPost.forEach((bodyKey1) => {
                if (config.hasOwnProperty(bodyKey1)) {
                    const value = req.body[bodyKey1];
                    if (bodyKey1 === 'id') {
                        if (!value) {
                            next({
                                error: bodyKey1 + ' is required',
                                status: 404,
                            });
                        }
                        if (!(typeof (value) === 'string')) {
                            next({
                                error: 'invalid ' + bodyKey1,
                                status: 403,
                            });
                        }
                    }
                    else if (bodyKey1 === 'name') {
                        if (!value) {
                            next({
                                error: config.name.errorMessage,
                                status: 404,
                            });
                        }
                    }
                }
                else {
                    next({
                        error: 'not found post',
                        status: 404,
                    });
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
                            next({
                                error: config.skip.errorMessage,
                                status: 403,
                            });
                        }
                    }
                    else if (queryKey1 === 'limit') {
                        if (isNaN(value)) {
                            next({
                                error: config.limit.errorMessage,
                                status: 403,
                            });
                        }
                    }
                }
                else {
                    next({
                        error: 'not found get',
                        status: 404,
                    });
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
                            next({
                                error: bodyKey1 + ' is required',
                                status: 404,
                            });
                        }
                        if (!(typeof (value) === 'string')) {
                            next({
                                error: 'invalid ' + bodyKey1,
                                status: 403,
                            });
                        }
                    }
                    else if (bodyKey1 === 'dataToUpdate') {
                        if (!value) {
                            next({
                                error: bodyKey1 + ' is required',
                                status: 404,
                            });
                        }
                    }
                }
                else {
                    next({
                        error: 'not found put',
                        status: 404,
                    });
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
                            next({
                                error: config.id.errorMessage,
                                status: 404,
                            });
                        }
                    }
                }
                else {
                    next({
                        error: 'not found delete',
                        status: 404,
                    });
                }
            });
            break;
    }
    next();
};
export default validationHandler;
