import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Row, Col } from 'react-bootstrap'
import truncate from 'html-truncate'

const Cards = ({ data }) => {
  const navigate = useNavigate()

  return (
    <>
      {data && data.length > 0 ? (
        <Row>
          {data.map((data, idx) => (
            <Col key={data._id} xs={12} sm={6} md={6} lg={4} className="mb-4">
              <Card
                className="shadow-sm h-100 border-0"
                style={{ borderRadius: '8px', overflow: 'hidden' }}
                data-aos="fade-up"
                data-aos-delay={100 + idx * 100}
              >
                <Card.Img
                  variant="top"
                  src={data.image?.name}
                  alt={data.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title
                    onClick={() => navigate(`/news/detail/${data._id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    {data.title}
                  </Card.Title>
                  <Card.Text>
                    <span
                      dangerouslySetInnerHTML={{ __html: truncate(data.content, 80) }}
                    />
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">{new Date(data.createdAt).toLocaleDateString()}</small>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center text-muted py-5">
          Tidak Ditemukan Data
        </div>      )}
    </>
  )
}

export default Cards
