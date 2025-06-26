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

import { getData } from '../../utils/fetch'
import debounce from 'debounce-promise'

let debouncedFetchNews = debounce(getData, 1000)

const startFetchingNews = () => {
  return {
    type: START_FETCHING_NEWS,
  }
}

const successFetchingNews = ({ news, pages }) => {
  return {
    type: SUCCESS_FETCHING_NEWS,
    news,
    pages,
  }
}

const errorFetchingNews = () => {
  return {
    type: ERROR_FETCHING_NEWS,
  }
}

const fetchNews = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingNews())

    try {
      let { keyword, page, limit } = getState().news

      let params = {
        keyword,
        page,
        limit,
      }

      let res = await debouncedFetchNews('/public/newses', params)

      dispatch(
        successFetchingNews({
          news: res.data.data.data,
          pages: res.data.data.pages,
        }),
      )
    } catch (error) {
      dispatch(errorFetchingNews())
    }
  }
}

const fetchLatestNews = () => {
  return async (dispatch) => {
    dispatch({ type: START_FETCHING_LATEST_NEWS })
    try {
      const response = await getData('/public/newses?sort=date:desc&limit=3')
      dispatch({ type: SUCCESS_FETCHING_LATEST_NEWS, news: response.data.data.data })
    } catch (err) {
      dispatch({ type: ERROR_FETCHING_LATEST_NEWS })
    }
  }
}

const setKeyword = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  }
}

const setPage = (page) => {
  return {
    type: SET_PAGE,
    page,
  }
}

const setSort = (sort) => {
  return {
    type: SET_SORT,
    sort,
  }
}

export {
  startFetchingNews,
  successFetchingNews,
  errorFetchingNews,
  fetchNews,
  fetchLatestNews,
  setKeyword,
  setPage,
  setSort,
}
