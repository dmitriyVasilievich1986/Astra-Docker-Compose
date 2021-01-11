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
    axios.get('/api/blog/catalog/1/')
        .then(data => dispatch({
            type: ACTIONTYPES.GET_FULL_CATALOG,
            payload: data.data
        }))
        .catch(err => console.log(err))
}

export const getComments = blogName => dispatch => {
    axios.get(`/api/blog/blog/${blogName}/get_by_name/`)
        .then(data => dispatch({
            type: ACTIONTYPES.GET_COMMENTS,
            payload: data.data.get_comments
        }))
        .catch(err => console.log(err))
}
