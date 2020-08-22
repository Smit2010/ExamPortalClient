import {DRAWER} from './types';

export const drawerClose = () => dispatch => {
    dispatch({
        type: DRAWER.DRAWER_CLOSED
      });
};

export const drawerOpen = () => dispatch => {
    dispatch({
        type: DRAWER.DRAWER_OPEN
      });
};