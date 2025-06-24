import { Route, Routes } from 'react-router-dom'

import Layout from '../layout'
import HomePage from '../pages/home'
import AcademicAchievementsPage from '../pages/achievements/academic'
import NonAcademicAchievementsPage from '../pages/achievements/non-academic'
import StudentsPage from '../pages/students'
import StudentsDetailPage from '../pages/students/detail'
import NewsPage from '../pages/news'
import NewsDetailPage from '../pages/news/detail'
import NotFoundPage from '../pages/not-found'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='achievements'>
          <Route path='academic' element={<AcademicAchievementsPage />} />
          <Route path='non-academic' element={<NonAcademicAchievementsPage />} />
        </Route>
        <Route path='students'>
          <Route index element={<StudentsPage />} />
          <Route path='detail/:id' element={<StudentsDetailPage />} />
        </Route>
        <Route path='news'>
          <Route index element={<NewsPage />} />
          <Route path='detail/:id' element={<NewsDetailPage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}	
export default AppRoutes
