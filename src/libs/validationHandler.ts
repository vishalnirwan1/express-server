const validationHandler = (config) => (req, res, next) => {
  const errorCount = {};
  const message = 'message';
  const status = 'status';
  Object.keys(config).map((configKey) => {

    const key = config[configKey];
    const { in: inn } = key;
    Object.keys(key).forEach((keyProperty) => {
      const value = req[inn][configKey];

      switch (keyProperty) {

        case 'required':
          if (!key.required && !value) {
            req[inn][configKey] = key.default;
            break;
          }
          if ((!(configKey in req[inn]) || !value) || (key.required === 'true') || (Object.keys(value).length === 0)) {
            if (!errorCount[message]) {
              errorCount[message] = [];
            }
            errorCount[message].push(key.errorMessage);
            errorCount[status] = 400;
          }
          break;

        case 'string':
          if (!(typeof (value) === 'string') || !(value !== '')) {
            if (!errorCount[message]) {
              errorCount[message] = [];
            }
            if (value) {
              errorCount[message].push(configKey + ' is required or must be string');
              errorCount[status] = 400;
            }
          }
          break;

        case 'regex':
          const regexx = new RegExp(key.regex);
          if (!regexx.test(value)) {
            if (!errorCount[message]) {
              errorCount[message] = [];
            }
            if (value) {
              errorCount[message].push('invalid ' + configKey);
              errorCount[status] = 400;
            }
          }
          break;

        case 'number':
          if (key.required === 'false') {
            next();
          }
          if (isNaN(value)) {
            if (!errorCount[message]) {
              errorCount[message] = [];
            }

            errorCount[message].push(key.errorMessage);
            errorCount[status] = 400;
          }
          break;

        case 'isObject':
          if (!(typeof (value) === 'object')) {
            if (!errorCount[message]) {
              errorCount[message] = [];
            }

            errorCount[message].push('update data must be in object type');
            errorCount[status] = 400;
          }
          break;

        case 'custom':
          if (value) {
            key.custom(value);
          }
          break;
      }
    });

  });

  if (Object.keys(errorCount).length === 0) {
    return next();
  }
  next(errorCount);
};
export default validationHandler;
