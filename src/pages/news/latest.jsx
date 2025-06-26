import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLatestNews } from '../../redux/news/actions'
import Cards from './cards'

const LatestNews = () => {
  const dispatch = useDispatch()
  const news = useSelector(state => state.news.latestNews)

  useEffect(() => {
    dispatch(fetchLatestNews())
  }, [dispatch])

  return (
    <>
      <div className="py-5" id="latest-news">
        <h1 className="fs-3 mb-3" data-aos="fade-up">Berita Terbaru</h1>
        <Cards status={news.status} data={news.data} skeleton={3} />
      </div>
    </>
  )
}

export default LatestNews
