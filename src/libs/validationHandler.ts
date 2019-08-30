const validationHandler = (config) => (req, res, next) => {
    Object.keys(config).map((configKey) => {
        const { in: inn } = config[configKey];

        Object.keys(config[configKey]).forEach((keyProperty) => {
            const value = req[inn][configKey];
            switch (keyProperty) {
                case 'required':
                    if (!config[configKey].required && !value) {
                        req[inn][configKey] = config[configKey].default;
                        break;
                    }
                    if ((!(configKey in req[inn]) || (value === '')) || (config[configKey].required === 'true')) {
                        next({
                            message: configKey + ' is required',
                            status: 400,
                        });
                    }
                    break;
                case 'string':
                    if (!(typeof (value) === 'string') || !(value !== '')) {
                        next({
                            message: configKey + ' is required or must be string',
                            status: 400,
                        });
                    }
                    break;
                case 'regex':
                    const regexx = new RegExp(config[configKey].regex);
                    if (!regexx.test(value)) {
                        next({
                            message: config[configKey].errorMessage,
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
                            message: config[configKey].errorMessage,
                            status: 400,
                        });
                    }
                    break;
                case 'isObject':
                    if (!(typeof (value) === 'object')) {
                        next({
                            message: 'data should be in object',
                            status: 400,
                        });
                    }
                    break;
                    case 'custom':
                        config[configKey].custom(value);
                        break;
            }
        });
    });
    next();
};
export default validationHandler;
