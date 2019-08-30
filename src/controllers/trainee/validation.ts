const validation = {
    create:
    {
        email:
        {
            required: true,
            errorMessage: 'email is required',
            in: ['body'],
            regex: '^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$',
        },
        password:
        {
            required: true,
            errorMessage: 'password is required',
            in: ['body'],
        },
        name:
        {
            required: true,
            errorMessage: 'Name is required',
            in: ['body'],
            regex: '^[a-zA-Z].*[\s\.]*$',
        },
    },
    delete:
    {
        id:
        {
            required: true,
            errorMessage: 'Id is required',
            in: ['params'],
        },
    },
    get:
    {
        limit:
        {
            required: false,
            default: 10,
            errorMessage: 'Limit is invalid',
            in: ['query'],
            number: true,
        },
        skip:
        {
            required: false,
            default: 0,
            errorMessage: 'Skip is invalid',
            in: ['query'],
            number: true,
        },
    },
    update:
    {
        dataToUpdate:
        {
            required: true,
            custom: (dataToUpdate) => {
                const { name, email, password } = dataToUpdate;
                const nameRegex = new RegExp('^[a-zA-Z].*[\s\.]*$');

                if (name === '' || !(nameRegex.test(name)) ) {
                    throw { error: 'Error Occured', message: 'name is required' };
                }
                if (email === '') {
                    throw { error: 'Error Occured', message: 'email is requireddd' };
                }
                if (password === '') {
                    throw { error: 'Error Occured', message: 'password is required' };
                }
            },
            in: ['body'],
            isObject: true,
        },
        id:
        {
            required: true,
            in: ['body'],
            string: true,
        },
    },
};
export default validation;
