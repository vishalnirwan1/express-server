const validationHandler = (config) => (req, res, next) => {
    Object.keys(config).map((configKey) => {
        const { in: inn } = config[configKey];
        let returnIt = false;

        Object.keys(config[configKey]).forEach((keyProperty) => {
            const value = req[inn][configKey];
            if (returnIt) {
                return;
            }
            switch (keyProperty) {
                case 'required':
                    if (!config[configKey].required && !value) {
                        returnIt = true;
                        break;
                    }
                    if ((!(configKey in req[inn]) || (value === '')) || (config[configKey].required === 'true')) {
                        next({
                            error: configKey + ' is required',
                            status: 404,
                        });
                    }
                    break;
                case 'string':
                    if (!(typeof (value) === 'string') || !(value !== '')) {
                        next({
                            error: configKey + ' is required or must be string',
                            status: 404,
                        });
                    }
                    break;
                case 'regex':
                    const regexx = new RegExp(config[configKey].regex);
                    if (!regexx.test(value)) {
                        next({
                            error: config[configKey].errorMessage,
                            status: 400,
                        });
                    }
                    break;
                case 'number':
                    if (config[configKey].required === 'false') {
                        next();
                    }
                    if (isNaN(value)) {
                        next({
                            error: config[configKey].errorMessage,
                            status: 400,
                        });
                    }
                    break;
                case 'isObject':
                    if (!(typeof (value) === 'object')) {
                        next({
                            error: 'data should be in object',
                            status: 400,
                        });
                    }
                    break;
            }
        });
    });
    next();
};
export default validationHandler;
