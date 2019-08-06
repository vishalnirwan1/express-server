const validation = {
    create:
    {
        id:
        {
            required: true,
            custom: (value) => {
                console.log('Value', value);
                throw { error: 'Error Occured', message: 'Message' };
            },
            in: ['body'],
            string: true,
        },
        name:
        {
            required: true,
            errorMessage: 'Name is required',
            in: ['body'],
            regex: '^[a-zA-Z_]+$',
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
                console.log('Value', dataToUpdate);
                throw { error: 'Error Occured', message: 'Message' };
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
