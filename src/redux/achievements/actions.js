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

import { getData } from '../../utils/fetch'
import debounce from 'debounce-promise'

let debouncedFetchAchievement = debounce(getData, 1000)

const startFetchingAchievement = () => {
  return {
    type: START_FETCHING_ACHIEVEMENTS,
  }
}

const successFetchingAchievements = ({ achievements, pages }) => {
  return {
    type: SUCCESS_FETCHING_ACHIEVEMENTS,
    achievements,
    pages,
  }
}

const errorFetchingAchievements = () => {
  return {
    type: ERROR_FETCHING_ACHIEVEMENTS,
  }
}

const fetchAchievements = (id, activity_group) => {
  return async (dispatch, getState) => {
    dispatch(startFetchingAchievement())

    try {
      let params = {
        keyword: getState().achievements.keyword,
        page: getState().achievements.page || 1,
        limit: getState().achievements.limit || 50,
        activity_type: getState().achievements.activity_type,
        achievement_type: getState().achievements.achievement_type,
        competition_level: getState().achievements.competition_level,
      }

      if (getState().achievements.sort) {
        params.sort = getState().achievements.sort
      }

      if (id) {
        params.student = id
      }

      if (activity_group) {
        params.activity_group = activity_group
      }
      
      let res = await debouncedFetchAchievement('/public/achievements?status=Valid', params)

      res.data.data.data.forEach((res) => {
        if (res.student) {
          res.student_name = `${res.student.firstName} ${res.student.lastName}`
        } else {
          res.student_name = '-'
        }
      })

      dispatch(
        successFetchingAchievements({
          achievements: res.data.data.data,
          pages: res.data.data.pages,
        }),
      )
    } catch (error) {
      dispatch(errorFetchingAchievements())
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

const setActivityType = (activity_type) => ({
  type: SET_ACTIVITY_TYPE,
  activity_type,
})

const setAchievementType = (achievement_type) => ({
  type: SET_ACHIEVEMENT_TYPE,
  achievement_type,
})

const setCompetitionLevel = (competition_level) => ({
  type: SET_COMPETITION_LEVEL,
  competition_level,
})

const setSort = (sort) => ({
  type: SET_SORT,
  sort,
})

export {
  startFetchingAchievement,
  successFetchingAchievements,
  errorFetchingAchievements,
  fetchAchievements,
  setKeyword,
  setPage,
  setActivityType,
  setAchievementType,
  setCompetitionLevel,
  setSort,
}
