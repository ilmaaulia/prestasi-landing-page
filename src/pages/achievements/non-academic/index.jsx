import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchAchievements,
  setKeyword,
  setPage,
  setActivityType,
  setAchievementType,
  setCompetitionLevel,
} from '../../../redux/achievements/actions'
import {
  activityTypeOptions,
  achievementTypeOptions,
  competitionLevelOptions,
} from '../../../constants'
import Breadcrumb from '../../../components/Breadcrumb'
import SearchInput from '../../../components/SearchInput'
import Dropdown from '../../../components/Dropdown'
import Table from '../../../components/Table'

const NonAcademicAchievementsPage = () => {
  const dispatch = useDispatch()
  const achievements = useSelector((state) => state.achievements)

  useEffect(() => {
    dispatch(fetchAchievements(undefined, 'Non-akademik'))
  }, [
    dispatch,
    achievements.keyword,
    achievements.page,
    achievements.activity_type,
    achievements.achievement_type,
    achievements.competition_level,
  ])

  return (
    <>
      <Breadcrumb secondLevelText="Prestasi Non Akademik" />
      <h1 className="fs-3 mb-3">Prestasi Non Akademik</h1>
      <div className="mb-3">
        <div className="row g-2 align-items-end">
          <div className="col-12 col-md-4">
            <SearchInput
              query={achievements.keyword}
              handleChange={(e) => {
                dispatch(setKeyword(e.target.value))
                dispatch(setPage(1))
              }}
            />
          </div>
          <div className="col-12 col-md-2">
            <Dropdown
              name="activity_type"
              value={achievements.activity_type}
              onChange={(e) => {
                dispatch(setActivityType(e.target.value))
                dispatch(setPage(1))
              }}
              options={activityTypeOptions}
            />
          </div>
          <div className="col-12 col-md-3">
            <Dropdown
              name="achievement_type"
              value={achievements.achievement_type}
              onChange={(e) => {
                dispatch(setAchievementType(e.target.value))
                dispatch(setPage(1))
              }}
              options={achievementTypeOptions}
            />
          </div>
          <div className="col-12 col-md-3">
            <Dropdown
              name="competition_level"
              value={achievements.competition_level}
              onChange={(e) => {
                dispatch(setCompetitionLevel(e.target.value))
                dispatch(setPage(1))
              }}
              options={competitionLevelOptions}
            />
          </div>
        </div>
      </div>
      <Table
        status={achievements.status}
        thead={[
          'Nama Prestasi',
          'Tanggal',
          'Jenis Kegiatan',
          'Jenis Prestasi',
          'Tingkat Kompetisi',
          'Nama Mahasiswa',
        ]}
        data={achievements.data}
        tbody={[
          'name',
          'date',
          'activity_type',
          'achievement_type',
          'competition_level',
          'student_name',
        ]}
        pages={achievements.pages}
        withPagination
        handlePageClick={({ selected }) => dispatch(setPage(selected + 1))}
      />
    </>
  )
}

export default NonAcademicAchievementsPage
