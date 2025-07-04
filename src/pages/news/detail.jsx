import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Row, Col, Image, Container, Modal } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { getData } from '../../utils/fetch'
import Breadcrumbs from '../../components/Breadcrumb'

const NewsDetailPage = () => {
  const { id } = useParams()
  const [news, setNews] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const fetchOneNews = async () => {
    const res = await getData(`/public/news/${id}`)
    setNews(res.data.data)
    setLoading(false)
  }

  useEffect(() => {
    fetchOneNews()
  }, [id])

  const handleImageClick = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <Container style={{ maxWidth: 800 }} className="mt-4 mb-5">
        <Breadcrumbs
          secondLevelText="Berita Prestasi"
          secondLevelUrl={'/news'}
          thirdLevelText="Detail"
        />
        <Row className="justify-content-center">
          <Col xs={12}>
            {loading ? (
              <Card className="border-0 shadow-none bg-light">
                <Card.Body className="p-0">
                  <Skeleton height={40} width={300} className="mb-3" />
                  <Skeleton height={20} width={180} className="mb-4" />
                  <Skeleton height={300} className="mb-4 w-100 rounded" />
                  <Skeleton count={6} height={18} className="mb-2" />
                </Card.Body>
              </Card>
            ) : !news ? (
              <div>Berita tidak ditemukan.</div>
            ) : (
              <Card className="border-0 shadow-none bg-light">
                <Card.Body className="p-0">
                  <h1
                    className="fw-bold mb-3"
                    style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}
                  >
                    {news.title}
                  </h1>
                  <div className="mb-4 text-muted" style={{ fontSize: 'clamp(1rem, 2vw, 1.1rem)' }}>
                    {news.author} &middot; {news.createdAt && new Date(news.createdAt).toLocaleDateString()}
                  </div>
                  <Image
                    src={news.image?.name}
                    alt={news.title}
                    fluid
                    className="mb-4 w-100 rounded object-fit-cover"
                    style={{
                      maxHeight: 400,
                      cursor: 'pointer',
                    }}
                    onClick={handleImageClick}
                  />
                  <div
                    style={{
                      fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                      lineHeight: 1.7,
                      wordBreak: 'break-word',
                    }}
                    dangerouslySetInnerHTML={{ __html: news.content }}
                  />
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Body>
          <Image
            src={news?.image?.name}
            alt={news?.title}
            fluid
            className="w-100 rounded"
          />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default NewsDetailPage
