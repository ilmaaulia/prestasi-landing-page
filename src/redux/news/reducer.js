import {
  START_FETCHING_NEWS,
  SUCCESS_FETCHING_NEWS,
  ERROR_FETCHING_NEWS,
  SET_KEYWORD,
  SET_PAGE,
  SET_SORT,
  START_FETCHING_LATEST_NEWS,
  SUCCESS_FETCHING_LATEST_NEWS,
  ERROR_FETCHING_LATEST_NEWS,
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
  status: statuslist.idle,
  page: 1,
  limit: 10,
  pages: 1,
  sort: '',
  latestNews: {
    data: [],
    status: statuslist.idle,
  },
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case START_FETCHING_NEWS:
    return { ...state, status: statuslist.process }

  case ERROR_FETCHING_NEWS:
    return { ...state, status: statuslist.error }

  case SUCCESS_FETCHING_NEWS:
    return {
      ...state,
      status: statuslist.success,
      data: action.news,
      pages: action.pages,
    }

  case START_FETCHING_LATEST_NEWS:
    return {
      ...state,
      latestNews: { ...state.latestNews, status: statuslist.process },
    }

  case SUCCESS_FETCHING_LATEST_NEWS:
    return {
      ...state,
      latestNews: { data: action.news, status: statuslist.success },
    }

  case ERROR_FETCHING_LATEST_NEWS:
    return {
      ...state,
      latestNews: { ...state.latestNews, status: statuslist.error },
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
