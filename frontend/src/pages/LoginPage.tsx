import { useState } from 'react'
import type { FormEvent } from 'react'
import { Eye, EyeOff, LogIn, UserRound } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.tsx'

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000'

const LoginPage = () => {
  const [values, setValues] = useState({
    username: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const isFormValid = values.username.trim().length > 0 && values.password.trim().length > 0

  const handleChange =
    (field: keyof typeof values) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }))
      setError(null)
      setSuccessMessage(null)
    }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isFormValid) {
      setError('Completá usuario y contraseña.')
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)
      setSuccessMessage(null)

      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(
          typeof data?.message === 'string' && data.message.length > 0
            ? data.message
            : 'No se pudo iniciar sesión. Intenta nuevamente.',
        )
      }

      const authenticatedUser = {
        id: data?.id ?? 0,
        username: data?.username ?? values.username,
      }
      login(authenticatedUser)
      setSuccessMessage(`Bienvenido ${authenticatedUser.username}`)
      navigate('/', { replace: true })
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Ocurrió un error inesperado.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-12 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(28,109,255,0.25),_transparent_55%)]" />
      <div className="pointer-events-none absolute left-10 top-10 h-72 w-72 rounded-full bg-brand-500/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-brand-400/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-3xl gap-10 rounded-4xl border border-white/10 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-950/90 p-8 shadow-[0_40px_120px_-60px_rgba(28,109,255,0.9)] backdrop-blur lg:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <header className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.4em] text-brand-200">
              <LogIn className="h-4 w-4" />
              Login
            </span>
            <div>
              <h1 className="font-display text-4xl text-white">Ingresá al panel</h1>
              <p className="mt-3 text-sm text-slate-300">
                Gestioná clientes, prospectos y stock desde tu cuenta BS Automotores.
              </p>
            </div>
          </header>

          <label className="block space-y-3">
            <span className="text-[0.55rem] font-semibold uppercase tracking-[0.4em] text-slate-500">
              Nombre de usuario
            </span>
            <div className="relative">
              <input
                name="username"
                type="text"
                value={values.username}
                onChange={handleChange('username')}
                placeholder="Ej: asesor.comercial"
                className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 pl-12 text-sm text-white placeholder:text-slate-500 focus:border-brand-400/60 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
              />
              <UserRound className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            </div>
          </label>

          <label className="block space-y-3">
            <span className="text-[0.55rem] font-semibold uppercase tracking-[0.4em] text-slate-500">
              Contraseña
            </span>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                placeholder="********"
                className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-sm text-white placeholder:text-slate-500 focus:border-brand-400/60 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                className="absolute inset-y-0 right-4 flex items-center text-slate-400 transition hover:text-white"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </label>

          <div className="space-y-2 text-sm">
            {error && <p className="text-red-300">{error}</p>}
            {successMessage && <p className="text-emerald-300">{successMessage}</p>}
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="w-full rounded-3xl bg-gradient-to-r from-brand-500 to-brand-400 px-6 py-3 text-sm font-semibold text-white shadow-card transition hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSubmitting ? 'Ingresando...' : 'Ingresar'}
          </button>

          <p className="text-sm text-slate-400">
            ¿No tenés cuenta?{' '}
            <Link to="/registro" className="text-brand-200 underline-offset-4 hover:underline">
              Creá tu usuario
            </Link>
          </p>
        </form>

        <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-brand-300">BS Automotores</p>
            <h2 className="mt-3 font-display text-2xl text-white">CRM inteligente</h2>
            <p className="mt-2 text-slate-400">
              Revisa tus oportunidades activas, pipeline y stock actualizado apenas ingreses.
            </p>
          </div>
          <ul className="mt-6 space-y-4 text-sm text-slate-300">
            <li>• Seguimiento de clientes en tiempo real</li>
            <li>• Inventario unificado con fichas técnicas</li>
            <li>• Reportes comerciales instantáneos</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
