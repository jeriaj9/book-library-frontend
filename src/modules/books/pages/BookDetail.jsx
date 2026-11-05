import { useEffect, useState } from 'react'
import { Alert, Card, Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import bookService from '../../shared/services/bookService'
import authorService from '../../shared/services/authorService'
import Avatar from '../../shared/components/Avatar'
import Loading from '../../shared/components/Loading'

const formatDate = (date) => new Date(date).toLocaleDateString('es', { day: 'numeric', month: 'short', year: 'numeric' })

export default function BookDetail() {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [authors, setAuthors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([bookService.getById(id), authorService.getAll()])
      .then(([bookData, authorsData]) => {
        setBook(bookData)
        setAuthors(authorsData.filter((a) => a.idBook === bookData.id))
      })
      .catch((err) => {
        setError(err.response?.status === 404 ? 'El libro no existe.' : 'No se pudo cargar el libro.')
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <Loading />

  if (error) return <Alert variant="danger">{error}</Alert>

  return (
    <>
      <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
        <span className="tile tile-lg">
          <i className="bi bi-book" />
        </span>
        <div>
          <h1 className="page-title mb-2">{book.title}</h1>
          <div className="d-flex flex-wrap gap-2">
            <span className="chip">
              <i className="bi bi-file-earmark-text" />
              {book.pageCount} páginas
            </span>
            <span className="chip">
              <i className="bi bi-calendar3" />
              Publicado el {formatDate(book.publishDate)}
            </span>
          </div>
        </div>
      </div>

      <Row className="g-4">
        <Col lg={8}>
          <Card>
            <Card.Body className="p-4">
              <h2 className="card-heading">Descripción</h2>
              <p className="mb-0" style={{ lineHeight: 1.7, color: '#3f3f46' }}>
                {book.description}
              </p>

              <hr className="my-4" />

              <h2 className="card-heading">Extracto</h2>
              <p className="excerpt mb-0">{book.excerpt}</p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4} className="d-flex flex-column gap-4">
          <Card>
            <Card.Body className="px-4 py-3">
              <h2 className="card-heading mt-1">Información</h2>
              <dl className="info-list mb-0">
                <div>
                  <dt>ID</dt>
                  <dd className="mono">{book.id}</dd>
                </div>
                <div>
                  <dt>Páginas</dt>
                  <dd>{book.pageCount}</dd>
                </div>
                <div>
                  <dt>Publicación</dt>
                  <dd>{formatDate(book.publishDate)}</dd>
                </div>
              </dl>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body className="px-4 py-3">
              <div className="d-flex justify-content-between align-items-center mt-1 mb-2">
                <h2 className="card-heading mb-0">{authors.length === 1 ? 'Autor' : 'Autores'}</h2>
                <span className="count">{authors.length}</span>
              </div>

              {authors.length === 0 ? (
                <p className="text-muted mb-1">Este libro no tiene autor registrado.</p>
              ) : (
                <ul className="author-list">
                  {authors.map((author) => (
                    <li key={author.id}>
                      <Avatar firstName={author.firstName} lastName={author.lastName} />
                      <div>
                        <div className="fw-medium">
                          {author.firstName} {author.lastName}
                        </div>
                        <div className="mono small text-muted">ID {author.id}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}
