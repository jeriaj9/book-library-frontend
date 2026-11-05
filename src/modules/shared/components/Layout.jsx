import { Link, NavLink, useLocation } from 'react-router-dom'

export default function Layout({ children }) {
  const { pathname } = useLocation()
  const isAuthors = pathname.startsWith('/authors')
  const isBookDetail = /^\/books\/\d+/.test(pathname)

  return (
    <div className="app">
      <aside className="sidebar">
        <Link to="/books" className="brand">
          <span className="brand-mark">
            <i className="bi bi-book" />
          </span>
          Biblioteca
        </Link>

        <nav className="sidebar-nav">
          <span className="sidebar-label">Catálogo</span>
          <NavLink to="/books" className="sidebar-link">
            <i className="bi bi-book" />
            Libros
          </NavLink>
          <NavLink to="/authors" className="sidebar-link">
            <i className="bi bi-people" />
            Autores
          </NavLink>
        </nav>
      </aside>

      <main className="main">
        <header className="topbar">
          <span>Catálogo</span>
          <span className="separator">/</span>
          {isAuthors && <span className="current">Autores</span>}
          {!isAuthors && !isBookDetail && <span className="current">Libros</span>}
          {isBookDetail && (
            <>
              <Link to="/books">Libros</Link>
              <span className="separator">/</span>
              <span className="current">Detalle</span>
            </>
          )}
        </header>

        <div className="content">{children}</div>
      </main>
    </div>
  )
}
