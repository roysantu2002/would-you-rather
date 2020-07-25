import {
    _getUsers,
    _saveQuestion,
    _getQuestions,
    _saveQuestionAnswer,
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

export function savePollAnswerAPI (info) {
  return _saveQuestionAnswer(info)
}

export function formatQuestion ({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    }
  }
}

// export function _saveQuestion (question) {
//   return new Promise((res, rej) => {
//     const authedUser = question.author;
//     const formattedQuestion = formatQuestion(question);

//     setTimeout(() => {
//       questions = {
//         ...questions,
//         [formattedQuestion.id]: formattedQuestion
//       }
      
//       users = {
//         ...users,
//         [authedUser]: {
//           ...users[authedUser],
//           questions: users[authedUser].questions.concat([formattedQuestion.id])
//         }
//       }

//       res(formattedQuestion)
//     }, 1000)
//   })
// }

export function _saveQuestionAnswer ({ authedUser, qid, answer }) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          answers: {
            ...users[authedUser].answers,
            [qid]: answer
          }
        }
      }

      questions = {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([authedUser])
          }
        }
      }

      res()
    }, 500)
  })
}
