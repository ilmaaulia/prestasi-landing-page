import React, { useEffect, useState } from 'react'
import { getData } from '../../utils/fetch'
import Cards from './cards'

const LatestNews = () => {
  const [news, setNews] = useState([])

  const fetchLatestNews = async () => {
    const response = await getData('/public/newses?sort=date:desc&limit=3')
    setNews(response.data.data.data)
  }

  useEffect(() => {
    fetchLatestNews()
  }, [])

  return (
    <>
      <div className="py-5" id="latest-news">
        <h1 className="fs-3 mb-3" data-aos="fade-up">Berita Terbaru</h1>
        <Cards data={news} />
      </div>
    </>
  )
}

export default LatestNews
