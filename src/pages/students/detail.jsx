import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAchievements } from '../../redux/achievements/actions'
import { Card, Row, Col, Image, ListGroup, Badge } from 'react-bootstrap'
import { FaUserGraduate, FaBook, FaAward } from 'react-icons/fa'
import { tagColors } from '../../constants'
import { getData } from '../../utils/fetch'
import Breadcrumbs from '../../components/Breadcrumb'

const StudentDetailPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const achievements = useSelector((state) => state.achievements.data)
  
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchOneStudent = async () => {
    const res = await getData(`/public/students/${id}`)
    setStudent(res.data.data)
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await fetchOneStudent()
      await dispatch(fetchAchievements(id))
      setLoading(false)
    }
    fetchData()
  }, [id, dispatch])

  const getRelevantTags = () => {
    const tagSet = new Set()
    achievements.forEach((a) => {
      if (a.activity_group) tagSet.add(a.activity_group)
      if (a.activity_type) tagSet.add(a.activity_type)
      if (a.achievement_type) tagSet.add(a.achievement_type)
      if (a.competition_level) tagSet.add(a.competition_level)
    })
    return Array.from(tagSet)
  }

  return (
    <>
      <Breadcrumbs
        secondLevelText="Mahasiswa Berprestasi"
        secondLevelUrl={'/students'}
        thirdLevelText={
          student ? `${student.firstName} ${student.lastName}` : 'Detail'
        }
      />

      {loading ? (
        <>
          <Row className="mt-4">
            <Col md={5} className="mb-4">
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <div className="text-center">
                    <Skeleton circle height={150} width={150} className="mb-3" />
                    <Skeleton height={32} width={180} />
                  </div>
                  <ListGroup variant="flush" className="mt-3">
                    <ListGroup.Item>
                      <Skeleton height={20} width={120} />
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Skeleton height={20} width={120} />
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col md={7}>
              <Card className="shadow-sm border-0 mb-3">
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Skeleton height={28} width={120} className="mb-3" />
                  <Skeleton
                    height={28}
                    width={90}
                    count={3}
                    className="me-2 mb-2"
                  />
                </Card.Body>
              </Card>
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <Skeleton height={28} width={120} className="mb-3" />
                  <Skeleton
                    height={20}
                    width={220}
                    count={3}
                    className="mb-2"
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      ) : (
        <Row className="mt-4">
          <Col md={5} className="mb-4">
            <Card className="shadow-sm border-0">
              <Card.Body>
                <div className="text-center">
                  <Image
                    src={student.image?.name}
                    alt="Foto Profil"
                    roundedCircle
                    style={{
                      width: '150px',
                      height: '150px',
                      objectFit: 'cover',
                    }}
                  />
                  <h2 className="mt-3 text-primary">{`${student.firstName} ${student.lastName}`}</h2>
                </div>
                <ListGroup variant="flush" className="mt-3">
                  <ListGroup.Item className="d-flex align-items-center">
                    <FaUserGraduate className="me-3 text-secondary" />
                    {student.student_id}
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex align-items-center">
                    <FaBook className="me-3 text-secondary" />
                    {student.study_program}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          <Col md={7}>
            <Card className="shadow-sm border-0 mb-3">
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title className="text-primary">
                  Ragam Prestasi Diraih
                </Card.Title>
                <div className="d-flex flex-wrap gap-2 mt-2">
                  {getRelevantTags().map((tag, i) => (
                    <Badge key={i} bg={tagColors[i % tagColors.length]}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card.Body>
            </Card>

            <Card className="shadow-sm border-0">
              <Card.Body>
                <Card.Title className="text-primary">Prestasi</Card.Title>
                <ListGroup variant="flush">
                  {achievements.map((achievement, index) => (
                    <ListGroup.Item
                      key={index}
                      className="d-flex align-items-center"
                    >
                      <FaAward className="me-3 text-secondary" />
                      {achievement.name}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default StudentDetailPage
