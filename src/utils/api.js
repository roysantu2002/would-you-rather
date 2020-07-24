import {
    _getUsers,
    _saveQuestion,
    _getQuestions,
  } from './_DATA.js'
  
  export function getInitialData () {
    return Promise.all([
      _getUsers(),
    ]).then(([users]) => ({
      users,
    }))
  }
  
  export function addPollAPI (info) {
    return _saveQuestion(info)
}
export function getInitialPolls() {
  return _getQuestions()
      .then(questions => ({
          questions 
      }))
}