import { getInitialData, addPollAPI } from '../utils/api'
import { receiveUsers, addUserPoll, saveUserAnswer } from '../actions/users'
import { addPoll, receivePolls, savePollAnswer} from '../actions/polls'
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'
import { getInitialPolls } from '../utils/api'
import { savePollAPI, savePollAnswerAPI } from '../utils/api'

// const AUTHED_ID = 'tylermcginnis'

export function handleInitialData (AUTHED_ID) {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(( {users} ) => {
                dispatch(receiveUsers(users))
                dispatch(setAuthedUser(AUTHED_ID))
                dispatch(hideLoading())
            })
    }
}

export function addPollAction (optionOneText, optionTwoText) {

    console.log(optionOneText, optionTwoText)

    return (dispatch, getState) => {
        const { authedUser } = getState()
        const author = authedUser
        dispatch(showLoading())
        return addPollAPI({optionOneText, optionTwoText, author})
            .then((poll) => {
                dispatch(addPoll(poll))
                dispatch(addUserPoll(authedUser, poll.id))
                dispatch(hideLoading())
            })
    }
}

export function handleInitialPolls () {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialPolls()
            .then((questions) => {
                dispatch(receivePolls(questions))
                dispatch(hideLoading())
            })
    }
}

export function handleSavePollAnswer (qid, answer) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        dispatch(showLoading())
        return savePollAnswerAPI({authedUser, qid, answer})
            .then(() => {
                dispatch(savePollAnswer(authedUser, qid, answer))
                dispatch(saveUserAnswer(authedUser, qid, answer))
                dispatch(hideLoading())
            })  
    }
}

export function handleAddPoll (optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        const author = authedUser
        dispatch(showLoading())
        return savePollAPI({optionOneText, optionTwoText, author})
            .then((poll) => {
                dispatch(addPoll(poll))
                dispatch(addUserPoll(authedUser, poll.id))
                dispatch(hideLoading())
            })
    }
}

