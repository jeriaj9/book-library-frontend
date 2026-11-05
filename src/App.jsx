import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './modules/shared/components/Layout'
import Loading from './modules/shared/components/Loading'

const BooksModule = lazy(() => import('./modules/books/BooksModule'))
const AuthorsModule = lazy(() => import('./modules/authors/AuthorsModule'))

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/books/*" element={<BooksModule />} />
            <Route path="/authors/*" element={<AuthorsModule />} />
            <Route path="*" element={<Navigate to="/books" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  )
}

export default App
