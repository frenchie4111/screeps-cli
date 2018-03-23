const createAction = ( type ) => {
    return ( data ) => {
        return {
            type, data
        };
    };
};

export default { createAction }
