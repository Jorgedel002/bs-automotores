import { Car, LayoutDashboard, LogOut, Users, UserPlus } from 'lucide-react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const navItems = [
  { to: '/', label: 'Home', icon: LayoutDashboard },
  { to: '/clientes', label: 'Clientes', icon: Users },
  { to: '/prospectos', label: 'Prospectos', icon: UserPlus },
  { to: '/autos', label: 'Autos', icon: Car },
]

const SidebarLayout = () => {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <aside className="relative hidden w-64 flex-col border-r border-white/5 bg-slate-950/80 p-6 lg:flex">
        <div className="mb-10">
          <p className="font-display text-xs uppercase tracking-[0.6em] text-brand-300">
            BS Automotores
          </p>
          <h2 className="mt-2 font-display text-2xl text-white">Panel</h2>
          {user && <p className="mt-1 text-sm text-slate-400">Hola, {user.username}</p>}
        </div>
        <nav className="space-y-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition',
                  isActive
                    ? 'bg-brand-500/20 text-white shadow-card'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white',
                ].join(' ')
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-slate-300">
          <p className="font-semibold text-white">Estado general</p>
          <p>CRM actualizado al día • Última sincronización hace 12 min.</p>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <div className="hidden items-center justify-end border-b border-white/5 bg-slate-950/80 px-6 py-4 text-sm text-slate-300 lg:flex">
          {user && <span className="mr-4 text-slate-400">Sesión: {user.username}</span>}
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
          >
            <LogOut className="h-3 w-3" />
            Cerrar sesión
          </button>
        </div>
        <nav className="flex items-center gap-4 border-b border-white/5 bg-slate-950/80 px-4 py-3 text-sm text-slate-300 lg:hidden">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `rounded-full px-3 py-1 ${isActive ? 'bg-brand-500/30 text-white' : 'text-slate-400'}`
              }
            >
              {label}
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="ml-auto inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
          >
            <LogOut className="h-3 w-3" />
            Salir
          </button>
        </nav>
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default SidebarLayout
