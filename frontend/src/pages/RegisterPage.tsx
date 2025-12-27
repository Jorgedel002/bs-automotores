import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Eye, EyeOff, ShieldCheck } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.tsx'

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000'

const RegisterPage = () => {
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()
  const { login } = useAuth()

  const passwordsMatch = useMemo(
    () =>
      formValues.password.length > 0 &&
      formValues.confirmPassword.length > 0 &&
      formValues.password === formValues.confirmPassword,
    [formValues.confirmPassword, formValues.password],
  )

  const isFormValid =
    formValues.username.trim().length > 0 &&
    formValues.password.trim().length > 0 &&
    formValues.confirmPassword.trim().length > 0

  const handleChange = (field: keyof typeof formValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({ ...prev, [field]: event.target.value }))
    setError(null)
    setSuccessMessage(null)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!passwordsMatch) {
      setError('Las contraseñas no coinciden. Revisá los campos.')
      setSuccessMessage(null)
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)
      setSuccessMessage(null)

      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formValues.username,
          password: formValues.password,
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(
          typeof data?.message === 'string' && data.message.length > 0
            ? data.message
            : 'No se pudo registrar el usuario. Intenta nuevamente.',
        )
      }

      setSuccessMessage('¡Cuenta creada correctamente!')
      const newUser = {
        id: data?.id ?? 0,
        username: data?.username ?? formValues.username,
      }
      login(newUser)
      setFormValues({ username: formValues.username, password: '', confirmPassword: '' })
      navigate('/', { replace: true })
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Ocurrió un error inesperado.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderPasswordInput = (
    label: string,
    name: 'password' | 'confirmPassword',
    showValue: boolean,
    toggle: () => void,
  ) => (
    <label className="block space-y-3">
      <span className="text-[0.55rem] font-semibold uppercase tracking-[0.4em] text-slate-500">
        {label}
      </span>
      <div className="relative">
        <input
          name={name}
          type={showValue ? 'text' : 'password'}
          value={formValues[name]}
          onChange={handleChange(name)}
          required
          placeholder={name === 'password' ? '********' : 'Repetí tu contraseña'}
          className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-sm text-white placeholder:text-slate-500 focus:border-brand-400/60 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
        />
        <button
          type="button"
          onClick={toggle}
          aria-label={showValue ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          className="absolute inset-y-0 right-4 flex items-center text-slate-400 transition hover:text-white"
        >
          {showValue ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </label>
  )

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-12 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(28,109,255,0.25),_transparent_55%)]" />
      <div className="pointer-events-none absolute -left-16 top-20 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-brand-400/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-3xl flex-col gap-10 rounded-4xl border border-white/10 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-950/90 p-8 shadow-[0_40px_120px_-60px_rgba(28,109,255,0.9)] backdrop-blur">
        <header className="space-y-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.4em] text-brand-200">
            <ShieldCheck className="h-4 w-4" />
            Registro
          </span>
          <div>
            <h1 className="font-display text-4xl text-white">Creá tu cuenta BS Automotores</h1>
            <p className="mt-3 text-sm text-slate-300">
              Accedé al panel para gestionar clientes, prospectos y vehículos en un solo lugar.
            </p>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block space-y-3">
            <span className="text-[0.55rem] font-semibold uppercase tracking-[0.4em] text-slate-500">
              Nombre de usuario
            </span>
            <input
              name="username"
              type="text"
              value={formValues.username}
              onChange={handleChange('username')}
              required
              placeholder="Ej: maria.gonzalez"
              className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-400/60 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
            />
          </label>

          {renderPasswordInput('Contraseña', 'password', showPassword, () => setShowPassword((prev) => !prev))}
          {renderPasswordInput(
            'Repetir contraseña',
            'confirmPassword',
            showConfirmPassword,
            () => setShowConfirmPassword((prev) => !prev),
          )}

          <div className="space-y-2 text-sm">
            {!passwordsMatch && formValues.confirmPassword.length > 0 && (
              <p className="text-brand-200">Las contraseñas deben coincidir.</p>
            )}
            {error && <p className="text-red-300">{error}</p>}
            {successMessage && <p className="text-emerald-300">{successMessage}</p>}
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="w-full rounded-3xl bg-gradient-to-r from-brand-500 to-brand-400 px-6 py-3 text-sm font-semibold text-white shadow-card transition hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-400">
          ¿Ya tenés cuenta?{' '}
          <Link to="/login" className="text-brand-200 underline-offset-4 hover:underline">
            Iniciá sesión
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
