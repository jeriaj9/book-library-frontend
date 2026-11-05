import { Spinner } from 'react-bootstrap'

export default function Loading() {
  return (
    <div className="d-flex justify-content-center align-items-center gap-2 text-muted my-5">
      <Spinner animation="border" size="sm" role="status" />
      Cargando...
    </div>
  )
}
