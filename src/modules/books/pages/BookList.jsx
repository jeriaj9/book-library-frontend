import { useEffect, useState } from 'react'
import { Alert, Button, Card, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import bookService from '../../shared/services/bookService'
import Loading from '../../shared/components/Loading'
import PageHeader from '../../shared/components/PageHeader'
import TablePagination from '../../shared/components/TablePagination'
import BookForm from '../components/BookForm'

const PAGE_SIZE = 10

export default function BookList() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)

  useEffect(() => {
    bookService
      .getAll()
      .then(setBooks)
      .catch(() => setError('No se pudieron cargar los libros.'))
      .finally(() => setLoading(false))
  }, [])

  const totalPages = Math.max(1, Math.ceil(books.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageBooks = books.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const openNew = () => {
    setSelectedBook(null)
    setShowForm(true)
  }

  const openEdit = (book) => {
    setSelectedBook(book)
    setShowForm(true)
  }

  const handleSave = async (data) => {
    if (selectedBook) {
      const updated = await bookService.update(selectedBook.id, { ...data, id: selectedBook.id })
      setBooks(books.map((b) => (b.id === updated.id ? updated : b)))
    } else {
      const newId = Math.max(0, ...books.map((b) => b.id)) + 1
      const created = await bookService.create({ ...data, id: newId })
      setBooks([...books, created])
      setPage(Math.ceil((books.length + 1) / PAGE_SIZE))
    }
    setShowForm(false)
  }

  const handleDelete = async (book) => {
    if (!window.confirm(`¿Seguro que deseas eliminar "${book.title}"?`)) return

    try {
      await bookService.remove(book.id)
      setBooks(books.filter((b) => b.id !== book.id))
    } catch {
      setError('No se pudo eliminar el libro.')
    }
  }

  if (loading) return <Loading />

  return (
    <>
      <PageHeader title="Libros" subtitle={`${books.length} libros registrados`}>
        <Button variant="dark" onClick={openNew}>
          <i className="bi bi-plus-lg" />
          Nuevo libro
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
              <th>Título</th>
              <th>Descripción</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pageBooks.map((book) => (
              <tr key={book.id}>
                <td className="text-nowrap">
                  <div className="d-flex align-items-center gap-3">
                    <span className="tile">
                      <i className="bi bi-book" />
                    </span>
                    <div>
                      <div className="fw-semibold">{book.title}</div>
                      <div className="mono small text-muted">ID {book.id}</div>
                    </div>
                  </div>
                </td>
                <td className="text-muted description-cell">
                  <div className="text-truncate">{book.description}</div>
                </td>
                <td className="text-end text-nowrap">
                  <div className="d-inline-flex gap-2">
                    <Button as={Link} to={`/books/${book.id}`} size="sm" variant="white" title="Ver detalle">
                      <i className="bi bi-eye" />
                      <span className="d-none d-md-inline">Ver detalle</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="white"
                      className="btn-icon"
                      title="Editar"
                      aria-label={`Editar ${book.title}`}
                      onClick={() => openEdit(book)}
                    >
                      <i className="bi bi-pencil" />
                    </Button>
                    <Button
                      size="sm"
                      variant="white"
                      className="btn-icon text-danger"
                      title="Eliminar"
                      aria-label={`Eliminar ${book.title}`}
                      onClick={() => handleDelete(book)}
                    >
                      <i className="bi bi-trash3" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {books.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center text-muted py-4">
                  No hay libros para mostrar.
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        <Card.Footer>
          <TablePagination page={currentPage} pageSize={PAGE_SIZE} totalItems={books.length} onPageChange={setPage} />
        </Card.Footer>
      </Card>

      {showForm && <BookForm book={selectedBook} onSave={handleSave} onClose={() => setShowForm(false)} />}
    </>
  )
}
