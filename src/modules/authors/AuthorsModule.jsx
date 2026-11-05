import { Route, Routes } from 'react-router-dom'
import AuthorList from './pages/AuthorList'

export default function AuthorsModule() {
  return (
    <Routes>
      <Route index element={<AuthorList />} />
    </Routes>
  )
}
