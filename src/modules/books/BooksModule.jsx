import { Route, Routes } from 'react-router-dom'
import BookList from './pages/BookList'
import BookDetail from './pages/BookDetail'

export default function BooksModule() {
  return (
    <Routes>
      <Route index element={<BookList />} />
      <Route path=":id" element={<BookDetail />} />
    </Routes>
  )
}
