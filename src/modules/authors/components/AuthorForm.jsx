import { useState } from 'react'
import { Alert, Button, Form, Modal } from 'react-bootstrap'

export default function AuthorForm({ author, onSave, onClose }) {
  const [form, setForm] = useState({
    firstName: author?.firstName ?? '',
    lastName: author?.lastName ?? '',
    idBook: author?.idBook ?? 1,
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
      await onSave({ ...form, idBook: Number(form.idBook) })
    } catch {
      setError('No se pudo guardar el autor.')
      setSaving(false)
    }
  }

  return (
    <Modal show centered onHide={onClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <div>
            <Modal.Title>{author ? 'Editar autor' : 'Nuevo autor'}</Modal.Title>
            <p className="text-muted mt-1 mb-0">Completa los datos del autor.</p>
          </div>
        </Modal.Header>

        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>
              Nombre <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control name="firstName" value={form.firstName} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label>
              Apellido <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control name="lastName" value={form.lastName} onChange={handleChange} required />
          </Form.Group>

          <Form.Group controlId="idBook">
            <Form.Label>
              ID del libro <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control type="number" min="1" name="idBook" value={form.idBook} onChange={handleChange} required />
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
