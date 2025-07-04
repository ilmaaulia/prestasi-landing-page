import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Row, Col } from 'react-bootstrap'
import truncate from 'html-truncate'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Cards = ({ data, status, skeleton = 6 }) => {
  const navigate = useNavigate()

  return (
    <>
      {status === 'process' ? (
        <Row>
          {Array.from({ length: skeleton }).map((_, idx) => (
            <Col key={idx} xs={12} sm={6} md={6} lg={4} className="mb-4">
              <Card className="shadow-sm h-100 border-0 rounded-2 overflow-hidden">
                <Skeleton
                  height={200}
                  className="w-100"
                  style={{ borderRadius: '8px 8px 0 0' }}
                />
                <Card.Body>
                  <Skeleton height={24} width="70%" className="mb-2" />
                  <Skeleton height={16} width="100%" />
                </Card.Body>
                <Card.Footer>
                  <Skeleton height={12} width="40%" />
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      ) : data.length ? (
        <Row>
          {data.map((data, idx) => (
            <Col key={data._id} xs={12} sm={6} md={6} lg={4} className="mb-4">
              <Card
                className="shadow-sm h-100 border-0 rounded-2 overflow-hidden"
                data-aos="fade-up"
                data-aos-delay={100 + idx * 100}
              >
                <Card.Img
                  variant="top"
                  src={data.image?.name}
                  alt={data.name}
                  className="object-fit-cover"
                  style={{ height: '200px' }}
                />
                <Card.Body>
                  <Card.Title
                    onClick={() => navigate(`/news/detail/${data._id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    {data.title && truncate(data.title, 50)}
                  </Card.Title>
                  <Card.Text>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: truncate(data.content, 80),
                      }}
                    />
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    {new Date(data.createdAt).toLocaleDateString()}
                  </small>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center text-muted py-5">Tidak Ditemukan Data</div>
      )}
    </>
  )
}

export default Cards
