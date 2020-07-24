export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_USER_POLL = 'ADD_USER_POLL'

export function receiveUsers (users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}

export function addUserPoll (authedUser, id) {
    return {
        type: ADD_USER_POLL,
        authedUser,
        id,
    }
}
