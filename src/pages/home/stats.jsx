import { useEffect, useState } from 'react'
import { Card, Row, Col, ListGroup } from 'react-bootstrap'
import { getData } from '../../utils/fetch'
import { studentStudyProgram } from '../../constants'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const AchievementsStats = () => {
  const [counts, setCounts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await getData('/public/students')

        const students = res.data.data.data.filter(
          (student) => student.achievements_count > 0,
        )

        const countsByStudyProgram = studentStudyProgram.map((program) => {
          const count = students.filter(
            (student) => student.study_program === program,
          ).length

          return { program, count }
        })

        setCounts(countsByStudyProgram)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchStudents()
  }, [])

  const mid = Math.ceil(counts.length / 2)
  const leftColumn = counts.slice(0, mid)
  const rightColumn = counts.slice(mid)

  return (
    <div className="my-4">
      <h1 className="fs-3 mb-3" data-aos="fade-up">
        Jumlah Prestasi Berdasarkan Program Studi
      </h1>
      {loading ? (
        <Card className="bg-light border-0 mx-auto w-100" data-aos="zoom-in">
          <Card.Body className="bg-white rounded-3 shadow-sm border-1 p-2 p-md-4">
            <Row>
              <Col xs={12} md={6} className="mb-3 mb-md-0">
                <ListGroup variant="flush">
                  {Array.from({ length: Math.ceil(studentStudyProgram.length / 2) }).map((_, idx) => (
                    <ListGroup.Item key={idx}>
                      <Skeleton height={24} width={180} className="mb-1" />
                      <Skeleton height={16} width={100} />
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
              <Col xs={12} md={6}>
                <ListGroup variant="flush">
                  {Array.from({ length: Math.floor(studentStudyProgram.length / 2) }).map((_, idx) => (
                    <ListGroup.Item key={idx}>
                      <Skeleton height={24} width={180} className="mb-1" />
                      <Skeleton height={16} width={100} />
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ) : counts.length > 0 ? (
        <Card className="bg-light border-0 mx-auto w-100" data-aos="zoom-in">
          <Card.Body className="bg-white rounded-3 shadow-sm border-1 p-2 p-md-4">
            <Row>
              <Col xs={12} md={6} className="mb-3 mb-md-0">
                <ListGroup variant="flush">
                  {leftColumn.map((data, idx) => (
                    <ListGroup.Item
                      key={data.program}
                      className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center flex-wrap"
                      data-aos="fade-up"
                      data-aos-delay={100 + idx * 50}
                    >
                      <span className="fw-medium w-100 w-md-auto mb-1 mb-md-0">
                        {data.program}
                      </span>
                      <span className="text-secondary small small-md text-md-end">
                        {data.count} Mahasiswa
                      </span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
              <Col xs={12} md={6}>
                <ListGroup variant="flush">
                  {rightColumn.map((data, idx) => (
                    <ListGroup.Item
                      key={data.program}
                      className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center flex-wrap"
                      data-aos="fade-up"
                      data-aos-delay={100 + (idx + leftColumn.length) * 50}
                    >
                      <span className="fw-medium w-100 w-md-auto mb-1 mb-md-0">
                        {data.program}
                      </span>
                      <span className="text-secondary small small-md text-md-end">
                        {data.count} Mahasiswa
                      </span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ) : (
        <div className="text-center text-muted py-5">
          Tidak Ditemukan Data
        </div>
      )}
    </div>
  )
}

export default AchievementsStats
