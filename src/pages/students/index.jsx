import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchStudents, setKeyword, setPage, setStudyProgram } from '../../redux/students/actions'
import { studyProgramOptions } from '../../constants'
import Breadcrumb from '../../components/Breadcrumb'
import SearchInput from '../../components/SearchInput'
import Dropdown from '../../components/Dropdown'
import Table from '../../components/Table'

const StudentsPage = () => {
  const dispatch = useDispatch()
  const students = useSelector((state) => state.students)

  useEffect(() => {
    dispatch(fetchStudents('Aktif'))
  }, [
    dispatch,
    students.keyword,
    students.page,
    students.study_program,
  ])

  const getRelevantTags = () => {
    const tagSet = new Set()

    students.achievements.forEach((a) => {
      if (a.activity_group) tagSet.add(a.activity_group)
      if (a.activity_type) tagSet.add(a.activity_type)
      if (a.achievement_type) tagSet.add(a.achievement_type)
      if (a.competition_level) tagSet.add(a.competition_level)
    })

    return Array.from(tagSet).slice(0, 10)
  }


  return (
    <>
      <Breadcrumb secondLevelText="Mahasiswa Berprestasi" />
      <h1 className="fs-3 mb-3">Mahasiswa Berprestasi</h1>
      <div className="mb-3">
        <div className="row g-2 align-items-end">
          <div className="col-12 col-md-6 col-lg-4">
            <SearchInput
              query={students.keyword}
              handleChange={(e) => {
                dispatch(setKeyword(e.target.value))
                dispatch(setPage(1))
              }}
            />
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <Dropdown
              name="activity_type"
              value={students.activity_type}
              onChange={e => {
                dispatch(setStudyProgram(e.target.value))
                dispatch(setPage(1))
              }}
              options={studyProgramOptions}
            />
          </div>
        </div>
      </div>
      <Table
        status={students.status}
        thead={[
          'Nama Lengkap',
          'NIM',
          'Program Studi',
          'Jumlah Prestasi',
          '',
        ]}
        data={students.data}
        tbody={[
          'student_name',
          'student_id',
          'study_program',
          'achievements_count',
          'id',
        ]}
        pages={students.pages}
        withPagination
        handlePageClick={({ selected }) => dispatch(setPage(selected + 1))}
      />
    </>
  )
}

export default StudentsPage
