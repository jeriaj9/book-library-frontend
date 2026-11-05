import { useEffect, useMemo, useState } from 'react'
import { Alert, Button, Card, Table } from 'react-bootstrap'
import authorService from '../../shared/services/authorService'
import Avatar from '../../shared/components/Avatar'
import Loading from '../../shared/components/Loading'
import PageHeader from '../../shared/components/PageHeader'
import TablePagination from '../../shared/components/TablePagination'
import AuthorForm from '../components/AuthorForm'

const PAGE_SIZE = 10

const fullName = (author) => `${author.firstName} ${author.lastName}`

export default function AuthorList() {
  const [authors, setAuthors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [selectedAuthor, setSelectedAuthor] = useState(null)

  useEffect(() => {
    authorService
      .getAll()
      .then(setAuthors)
      .catch(() => setError('No se pudieron cargar los autores.'))
      .finally(() => setLoading(false))
  }, [])

  const booksCount = useMemo(() => {
    const count = {}
    authors.forEach((a) => {
      count[fullName(a)] = (count[fullName(a)] || 0) + 1
    })
    return count
  }, [authors])

  const totalPages = Math.max(1, Math.ceil(authors.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageAuthors = authors.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const openNew = () => {
    setSelectedAuthor(null)
    setShowForm(true)
  }

  const openEdit = (author) => {
    setSelectedAuthor(author)
    setShowForm(true)
  }

  const handleSave = async (data) => {
    if (selectedAuthor) {
      const updated = await authorService.update(selectedAuthor.id, { ...data, id: selectedAuthor.id })
      setAuthors(authors.map((a) => (a.id === updated.id ? updated : a)))
    } else {
      const newId = Math.max(0, ...authors.map((a) => a.id)) + 1
      const created = await authorService.create({ ...data, id: newId })
      setAuthors([...authors, created])
      setPage(Math.ceil((authors.length + 1) / PAGE_SIZE))
    }
    setShowForm(false)
  }

  const handleDelete = async (author) => {
    if (!window.confirm(`¿Seguro que deseas eliminar a ${fullName(author)}?`)) return

    try {
      await authorService.remove(author.id)
      setAuthors(authors.filter((a) => a.id !== author.id))
    } catch {
      setError('No se pudo eliminar el autor.')
    }
  }

  if (loading) return <Loading />

  return (
    <>
      <PageHeader title="Autores" subtitle={`${authors.length} autores registrados`}>
        <Button variant="dark" onClick={openNew}>
          <i className="bi bi-plus-lg" />
          Nuevo autor
        </Button>
      </PageHeader>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <Card className="overflow-hidden">
        <Table hover responsive className="mb-0 align-middle">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Libros publicados</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pageAuthors.map((author) => (
              <tr key={author.id}>
                <td className="text-nowrap">
                  <div className="d-flex align-items-center gap-3">
                    <Avatar firstName={author.firstName} lastName={author.lastName} />
                    <div>
                      <div className="fw-semibold">{fullName(author)}</div>
                      <div className="mono small text-muted">ID {author.id}</div>
                    </div>
                  </div>
                </td>
                <td className="text-nowrap">
                  <span className="chip chip-muted">
                    <i className="bi bi-book" />
                    {booksCount[fullName(author)]} {booksCount[fullName(author)] === 1 ? 'libro' : 'libros'}
                  </span>
                </td>
                <td className="text-end text-nowrap">
                  <div className="d-inline-flex gap-2">
                    <Button
                      size="sm"
                      variant="white"
                      className="btn-icon"
                      title="Editar"
                      aria-label={`Editar ${fullName(author)}`}
                      onClick={() => openEdit(author)}
                    >
                      <i className="bi bi-pencil" />
                    </Button>
                    <Button
                      size="sm"
                      variant="white"
                      className="btn-icon text-danger"
                      title="Eliminar"
                      aria-label={`Eliminar ${fullName(author)}`}
                      onClick={() => handleDelete(author)}
                    >
                      <i className="bi bi-trash3" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {authors.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center text-muted py-4">
                  No hay autores para mostrar.
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        <Card.Footer>
          <TablePagination page={currentPage} pageSize={PAGE_SIZE} totalItems={authors.length} onPageChange={setPage} />
        </Card.Footer>
      </Card>

      {showForm && <AuthorForm author={selectedAuthor} onSave={handleSave} onClose={() => setShowForm(false)} />}
    </>
  )
}
