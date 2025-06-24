import {
  START_FETCHING_ACHIEVEMENTS,
  SUCCESS_FETCHING_ACHIEVEMENTS,
  ERROR_FETCHING_ACHIEVEMENTS,
  SET_KEYWORD,
  SET_PAGE,
  SET_ACTIVITY_TYPE,
  SET_ACHIEVEMENT_TYPE,
  SET_COMPETITION_LEVEL,
  SET_SORT,
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
  page: 1,
  limit: 10,
  pages: 1,
  status: statuslist.idle,
  activity_type: '',
  achievement_type: '',
  competition_level: '',
  sort: '',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case START_FETCHING_ACHIEVEMENTS:
    return { ...state, status: statuslist.process }

  case ERROR_FETCHING_ACHIEVEMENTS:
    return { ...state, status: statuslist.error }

  case SUCCESS_FETCHING_ACHIEVEMENTS:
    return {
      ...state,
      status: statuslist.success,
      data: action.achievements,
      pages: action.pages,
    }

  case SET_KEYWORD:
    return {
      ...state,
      keyword: action.keyword,
    }

  case SET_PAGE:
    return {
      ...state,
      page: action.page,
    }

  case SET_ACTIVITY_TYPE:
    return {
      ...state,
      activity_type: action.activity_type,
    }

  case SET_ACHIEVEMENT_TYPE:
    return {
      ...state,
      achievement_type: action.achievement_type,
    }

  case SET_COMPETITION_LEVEL:
    return {
      ...state,
      competition_level: action.competition_level,
    }
    
  case SET_SORT:
    return {
      ...state,
      sort: action.sort,
    }
    
  default:
    return state
  }
}

export default reducer
