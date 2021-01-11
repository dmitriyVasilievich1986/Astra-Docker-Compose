import ACTIONTYPES from '../actions/actionTypes'

const initState = {
    fullCatalog: {},
    comments: [],
    catalog: [],
}

export default function (state = initState, action) {
    switch (action.type) {
        case ACTIONTYPES.GET_FULL_CATALOG:
            return {
                ...state,
                fullCatalog: action.payload.get_child,
            }
        case ACTIONTYPES.GET_CATALOG:
            return {
                ...state,
                catalog: action.payload,
            }
        case ACTIONTYPES.GET_COMMENTS:
            return {
                ...state,
                comments: action.payload,
            }
        default:
            return state
    }
}