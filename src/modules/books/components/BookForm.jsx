import { useState } from 'react'
import { Alert, Button, Form, Modal } from 'react-bootstrap'

export default function BookForm({ book, onSave, onClose }) {
  const [form, setForm] = useState({
    title: book?.title ?? '',
    description: book?.description ?? '',
    pageCount: book?.pageCount ?? 0,
    excerpt: book?.excerpt ?? '',
    publishDate: book?.publishDate?.substring(0, 10) ?? '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      await onSave({ ...form, pageCount: Number(form.pageCount) })
    } catch {
      setError('No se pudo guardar el libro.')
      setSaving(false)
    }
  }

  return (
    <Modal show centered onHide={onClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <div>
            <Modal.Title>{book ? 'Editar libro' : 'Nuevo libro'}</Modal.Title>
            <p className="text-muted mt-1 mb-0">Completa los datos del libro.</p>
          </div>
        </Modal.Header>

        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-3" controlId="title">
            <Form.Label>
              Título <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control name="title" value={form.title} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Descripción</Form.Label>
            <Form.Control as="textarea" rows={2} name="description" value={form.description} onChange={handleChange} />
          </Form.Group>

          <div className="row">
            <Form.Group className="mb-3 col" controlId="pageCount">
              <Form.Label>Páginas</Form.Label>
              <Form.Control type="number" min="0" name="pageCount" value={form.pageCount} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3 col" controlId="publishDate">
              <Form.Label>
                Fecha de publicación <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control type="date" name="publishDate" value={form.publishDate} onChange={handleChange} required />
            </Form.Group>
          </div>

          <Form.Group controlId="excerpt">
            <Form.Label>Extracto</Form.Label>
            <Form.Control as="textarea" rows={3} name="excerpt" value={form.excerpt} onChange={handleChange} />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="white" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="dark" disabled={saving}>
            {saving ? 'Guardando...' : 'Guardar'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
