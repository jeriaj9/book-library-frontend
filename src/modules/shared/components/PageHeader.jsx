export default function PageHeader({ title, subtitle, children }) {
  return (
    <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
      <div>
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="text-muted mt-1 mb-0">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}
