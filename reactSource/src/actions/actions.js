import ACTIONTYPES from './actionTypes'
import axios from 'axios'

export const setSidePanelStatus = (sidePanelStatus) => dispatch => {
    dispatch({
        type: ACTIONTYPES.OPEN_PANEL,
        payload: sidePanelStatus,
    })
}

export const setModalStatus = modalPanelStatus => dispatch => {
    dispatch({
        type: ACTIONTYPES.OPEN_MODAL,
        payload: modalPanelStatus,
    })
}

export const getFullCatalog = () => dispatch => {
    axios.get('/api/blog/fullcatalog/names_only/')
        .then(data => dispatch({
            type: ACTIONTYPES.GET_FULL_CATALOG,
            payload: data.data
        })).catch(err => console.log(err))
    axios.get('/api/blog/catalog/names_only/')
        .then(data => dispatch({
            type: ACTIONTYPES.GET_CATALOG,
            payload: data.data
        })).catch(err => console.log(err))
}