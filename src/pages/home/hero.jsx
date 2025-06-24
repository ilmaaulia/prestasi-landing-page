import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'

const Hero = () => {
  return (
    <>
      <Row className="align-items-center flex-column-reverse flex-md-row" id="hero">
        <Col md={8} xs={12} className="text-center text-md-start">
          <h1 className="fw-bold display-4" data-aos="fade-right">
            Sistem Informasi Prestasi IPI
          </h1>
          <p className="mb-4 fs-6 fs-md-5" data-aos="fade-right" data-aos-delay="100">
            Menampilkan Capaian dan Berita Terbaik Mahasiswa Institut Pendidikan Indonesia Garut.
          </p>
          <div className="d-grid d-sm-block" data-aos="fade-up" data-aos-delay="200">
            <Button
              as="a"
              variant="primary"
              href="#latest-news"
              className="mt-2 mb-3 px-4 py-2 fs-6 fs-md-5 btn-lift"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              Jelajahi
            </Button>
          </div>
        </Col>
        <Col md={4} xs={12} className="text-center">
          <model-viewer
            alt="Golden Trophy"
            src="/golden-trophy.glb"
            style={{ width: '100%', height: '500px' }}
            camera-controls
            touch-action="pan-y"
            disable-zoom
            shadow-intensity="1"
            auto-rotate
            auto-rotate-delay="0"
            data-aos="fade-left"
          ></model-viewer>
        </Col>
      </Row>
    </>
  )
}

export default Hero
