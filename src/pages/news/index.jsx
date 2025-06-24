import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchNews, setKeyword, setPage } from '../../redux/news/actions'
import Breadcrumb from '../../components/Breadcrumb'
import SearchInput from '../../components/SearchInput'
import Cards from './cards'
import Pagination from '../../components/Pagination'
import Loading from '../../components/Loading'

const NewsPage = () => {
  const dispatch = useDispatch()
  const news = useSelector((state) => state.news)

  useEffect(() => {
    dispatch(fetchNews())
  }, [dispatch, news.keyword, news.page])

  const handlePageClick = (data) => {
    dispatch(setPage(data.selected + 1))
  }

  return (
    <>
      <Breadcrumb secondLevelText="Berita Prestasi" />
      <h1 className="fs-3">Berita Prestasi</h1>
      <SearchInput
        query={news.keyword}
        handleChange={(e) => dispatch(setKeyword(e.target.value))}
        className={'my-4'}
      />
      {news.status === 'process' ? (
        <Loading />
      ) : news.data.length ? (
        <>
          <Cards data={news.data} />
          <Pagination
            pages={news.pages}
            page={news.page}
            handlePageClick={handlePageClick}
          />
        </>
      ) : (
        <div className="text-center text-muted py-5">
          Tidak Ditemukan Data
        </div>
      )}
    </>
  )
}

export default NewsPage
