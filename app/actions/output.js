import { createAction } from '~/libs/actions';

const action_types = {
    SET_SCROLL_LOCK: 'SET_SCROLL_LOCK'
};

const setScrollLock = createAction( action_types.SET_SCROLL_LOCK );

export default {
    action_types,

    setScrollLock
};
