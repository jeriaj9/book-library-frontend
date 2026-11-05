import { Pagination } from 'react-bootstrap'

export default function TablePagination({ page, pageSize, totalItems, onPageChange }) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const from = totalItems === 0 ? 0 : (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, totalItems)

  const start = Math.max(1, Math.min(page - 2, totalPages - 4))
  const end = Math.min(totalPages, start + 4)
  const pages = []
  for (let i = start; i <= end; i++) pages.push(i)

  return (
    <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
      <span className="text-muted small">
        Mostrando{' '}
        <span className="text-body fw-medium">
          {from}–{to}
        </span>{' '}
        de <span className="text-body fw-medium">{totalItems}</span>
      </span>

      <Pagination className="mb-0">
        <Pagination.First label="Primera página" disabled={page === 1} onClick={() => onPageChange(1)}>
          <i className="bi bi-chevron-double-left" />
        </Pagination.First>
        <Pagination.Prev label="Página anterior" disabled={page === 1} onClick={() => onPageChange(page - 1)}>
          <i className="bi bi-chevron-left" />
        </Pagination.Prev>
        {pages.map((p) => (
          <Pagination.Item key={p} active={p === page} onClick={() => onPageChange(p)}>
            {p}
          </Pagination.Item>
        ))}
        <Pagination.Next label="Página siguiente" disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>
          <i className="bi bi-chevron-right" />
        </Pagination.Next>
        <Pagination.Last label="Última página" disabled={page === totalPages} onClick={() => onPageChange(totalPages)}>
          <i className="bi bi-chevron-double-right" />
        </Pagination.Last>
      </Pagination>
    </div>
  )
}
