import {
  START_FETCHING_STUDENTS,
  SUCCESS_FETCHING_STUDENTS,
  ERROR_FETCHING_STUDENTS,
  SET_KEYWORD,
  SET_STUDY_PROGRAM,
  SET_PAGE,
} from './constants'

const statuslist = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
}

const initialState = {
  data: [],
  keyword: '',
  study_program: '',
  page: 1,
  limit: 10,
  pages: 1,
  status: statuslist.idle,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case START_FETCHING_STUDENTS:
    return { ...state, status: statuslist.process }

  case ERROR_FETCHING_STUDENTS:
    return { ...state, status: statuslist.error }

  case SUCCESS_FETCHING_STUDENTS:
    return {
      ...state,
      status: statuslist.success,
      data: action.students,
    }

  case SET_KEYWORD:
    return {
      ...state,
      keyword: action.keyword,
    }

  case SET_STUDY_PROGRAM:
    return {
      ...state,
      study_program: action.study_program,
    }

  case SET_PAGE:
    return {
      ...state,
      page: action.page,
    }  

  default:
    return state
  }
}

export default reducer
