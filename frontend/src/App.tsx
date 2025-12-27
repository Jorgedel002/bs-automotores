import { Navigate, Route, Routes } from 'react-router-dom'
import SidebarLayout from './components/layout/SidebarLayout.tsx'
import HomePage from './pages/HomePage.tsx'
import ClientsPage from './pages/ClientsPage.tsx'
import ProspectsPage from './pages/ProspectsPage.tsx'
import VehiclesPage from './pages/VehiclesPage.tsx'
import RegisterPage from './pages/RegisterPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import ProtectedRoute from './components/auth/ProtectedRoute.tsx'

const App = () => (
  <Routes>
    <Route
      element={
        <ProtectedRoute>
          <SidebarLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<HomePage />} />
      <Route path="clientes" element={<ClientsPage />} />
      <Route path="prospectos" element={<ProspectsPage />} />
      <Route path="autos" element={<VehiclesPage />} />
    </Route>
    <Route path="login" element={<LoginPage />} />
    <Route path="registro" element={<RegisterPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
)

export default App
