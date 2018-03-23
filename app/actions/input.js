import { createAction } from '~/libs/actions';

const action_types = {
    FILTER_CHANGED: 'FILTER_CHANGED'
};

const filterChanged = createAction( action_types.FILTER_CHANGED );

export default {
    action_types,

    filterChanged
};
