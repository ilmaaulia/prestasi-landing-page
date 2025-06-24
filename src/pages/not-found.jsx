import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const NotFoundPage = () => {
  return (
    <Container>
      <Row
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: '70vh' }}
      >
        <Col className="text-center">
          <h1 className="fw-bold">404 - Not Found</h1>
          <p className="text-secondary">
            Halaman tidak tersedia atau telah dipindahkan.
          </p>
        </Col>
      </Row>
    </Container>
  )
}

export default NotFoundPage
