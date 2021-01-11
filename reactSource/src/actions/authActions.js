import ACTIONTYPES from './actionTypes'
import axios from 'axios'

export const updateUser = newUserData => dispatch => {
    dispatch({
        type: ACTIONTYPES.GET_USER,
        payload: newUserData,
    })
}

export const clearUser = () => dispatch => {
    dispatch({
        type: ACTIONTYPES.CLEAR_USER
    })

}

export const getUser = () => (dispatch, getState,) => {
    dispatch({ type: ACTIONTYPES.USER_LOADING, payload: true })

    const token = getState().auth.token

    const context = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if (token)
        context.headers['Authorization'] = `Token ${token}`

    axios.get('/api/auth/account/', context)
        .then(data => {
            dispatch({
                type: ACTIONTYPES.GET_USER,
                payload: data.data.user,
            })
        })
        .catch(() => dispatch({
            type: ACTIONTYPES.USER_LOADING,
            paylaod: false
        }))
}

export const changeUserData = newUserData => dispatch => {
    if (newUserData.token && newUserData.user) {
        dispatch({
            type: ACTIONTYPES.CHANGE_USER_DATA,
            payload: newUserData,
        })
    }
}