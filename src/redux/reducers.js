const initialState = {
    user:{}
}

function userReducer(state=initialState , action) {
    switch (action.type) {
      case 'USER_SUBMITED':
        return {
            ...state,
            user: action.data
        } 
      default:
        return state
    }
}

export default userReducer;