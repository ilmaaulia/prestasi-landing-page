import {
  START_FETCHING_STUDENTS,
  SUCCESS_FETCHING_STUDENTS,
  ERROR_FETCHING_STUDENTS,
  SET_KEYWORD,
  SET_STUDY_PROGRAM,
  SET_PAGE,
} from './constants'

import { getData } from '../../utils/fetch'
import debounce from 'debounce-promise'

let debouncedFetchStudents = debounce(getData, 1000)

const startFetchingStudents = () => {
  return {
    type: START_FETCHING_STUDENTS,
  }
}

const successFetchingStudents = ({ students }) => {
  return {
    type: SUCCESS_FETCHING_STUDENTS,
    students,
  }
}

const errorFetchingStudents = () => {
  return {
    type: ERROR_FETCHING_STUDENTS,
  }
}

const fetchStudents = (status) => {
  return async (dispatch, getState) => {
    dispatch(startFetchingStudents())

    try {
      let params = {
        keyword: getState().students.keyword,
        page: getState().students.page || 1,
        limit: getState().students.limit || 10,
        study_program: getState().students.study_program,
      }

      if (status) {
        params.status = status
      }
      
      let res = await debouncedFetchStudents('/public/students', params)

      res.data.data.data.forEach((res) => {
        res.student_name = `${res.firstName} ${res.lastName}`
        res.achievements_count = res.achievements ? res.achievements.length : 0
      })

      const students = res.data.data.data.map((student) => ({
        student_name: `${student.firstName} ${student.lastName}`,
        student_id: student.student_id,
        study_program: student.study_program,
        achievements_count: student.achievements ? student.achievements.length : 0,
        id: student.id, 
      }))

      const filteredStudents = students.filter(student => student.achievements_count > 0)

      dispatch(
        successFetchingStudents({
          students: filteredStudents,
          pages: res.data.data.pages,
        }),
      )
    } catch (error) {
      dispatch(errorFetchingStudents())
    }
  }
}

const setKeyword = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  }
}

const setStudyProgram = (study_program) => {
  return {
    type: SET_STUDY_PROGRAM,
    study_program,
  }
}

const setPage = (page) => {
  return {
    type: SET_PAGE,
    page,
  }
}

export {
  startFetchingStudents,
  successFetchingStudents,
  errorFetchingStudents,
  fetchStudents,
  setKeyword,
  setStudyProgram,
  setPage,
}
