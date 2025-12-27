import { Fragment, type ReactNode, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

export type ModalFormField = {
  name: string
  label: string
  type?: 'text' | 'email' | 'number' | 'date' | 'textarea' | 'file' | 'files'
  placeholder?: string
  required?: boolean
  helperText?: string
  defaultValue?: string
  accept?: string
}

export type ModalFormValue = string | File | File[] | null
export type ModalFormValues = Record<string, ModalFormValue>

type Props = {
  isOpen: boolean
  title: string
  description?: string
  fields: ModalFormField[]
  submitLabel?: string
  onClose: () => void
  onSubmit: (values: ModalFormValues) => void
  footerSlot?: ReactNode
}

const ModalForm = ({
  isOpen,
  title,
  description,
  fields,
  submitLabel = 'Guardar',
  onClose,
  onSubmit,
  footerSlot,
}: Props) => {
  const initialValues = useMemo(
    () =>
      fields.reduce<ModalFormValues>((acc, field) => {
        acc[field.name] = field.defaultValue ?? ''
        if (field.type === 'file' || field.type === 'files') {
          acc[field.name] = null
        }
        return acc
      }, {}),
    [fields],
  )

  const [values, setValues] = useState<ModalFormValues>(initialValues)

  useEffect(() => {
    if (isOpen) {
      setValues(initialValues)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [initialValues, isOpen])

  if (!isOpen) return null

  const handleTextChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (name: string, files: FileList | null, multiple: boolean) => {
    if (!files || files.length === 0) {
      setValues((prev) => ({ ...prev, [name]: multiple ? [] : null }))
      return
    }

    const normalized = multiple ? Array.from(files) : files[0]
    setValues((prev) => ({ ...prev, [name]: normalized }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit(values)
  }

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/80 px-4 py-10 backdrop-blur-sm sm:py-16">
      <div className="relative w-full max-w-2xl rounded-4xl border border-white/10 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-950/95 p-8 shadow-[0_40px_120px_-70px_rgba(28,109,255,0.8)]">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:bg-white/10"
          aria-label="Cerrar formulario"
        >
          <X className="h-4 w-4" />
        </button>

        <header className="mb-8 space-y-3 pr-12">
          <span className="font-display text-xs uppercase tracking-[0.4em] text-brand-300">
            Formulario
          </span>
          <h2 className="font-display text-3xl text-white">{title}</h2>
          {description && <p className="text-sm leading-relaxed text-slate-300">{description}</p>}
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-5 md:grid-cols-2">
            {fields.map((field) => {
              const inputClass =
                'mt-3 w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-400/60 focus:outline-none focus:ring-2 focus:ring-brand-500/30'
              const spanFull =
                field.type === 'textarea' || field.type === 'file' || field.type === 'files'
              const currentValue = values[field.name]
              const inputValue = typeof currentValue === 'string' ? currentValue : ''

              return (
                <label key={field.name} className={`block ${spanFull ? 'md:col-span-2' : ''}`}>
                  <span className="text-[0.55rem] font-semibold uppercase tracking-[0.4em] text-slate-500">
                    {field.label}
                  </span>
                  {field.type === 'textarea' ? (
                    <textarea
                      name={field.name}
                      rows={4}
                      required={field.required}
                      placeholder={field.placeholder}
                      className={`${inputClass} resize-none`}
                      value={inputValue}
                      onChange={(event) => handleTextChange(field.name, event.target.value)}
                    />
                  ) : field.type === 'file' || field.type === 'files' ? (
                    <div className="mt-3 rounded-3xl border border-dashed border-white/15 bg-white/5 px-4 py-5 text-sm text-slate-200">
                      <input
                        name={field.name}
                        type="file"
                        accept={field.accept}
                        multiple={field.type === 'files'}
                        className="w-full cursor-pointer text-xs text-slate-400 file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-brand-500/20 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand-100 hover:file:bg-brand-500/30"
                        onChange={(event) =>
                          handleFileChange(field.name, event.target.files, field.type === 'files')
                        }
                      />
                      {currentValue && (
                        <div className="mt-3 text-xs text-slate-400">
                          {Array.isArray(currentValue)
                            ? `${currentValue.length} archivo(s) seleccionados`
                            : currentValue instanceof File
                              ? currentValue.name
                              : currentValue}
                        </div>
                      )}
                    </div>
                  ) : (
                    <input
                      name={field.name}
                      type={field.type ?? 'text'}
                      required={field.required}
                      placeholder={field.placeholder}
                      className={inputClass}
                      value={inputValue}
                      onChange={(event) => handleTextChange(field.name, event.target.value)}
                    />
                  )}
                  {field.helperText && (
                    <p className="mt-2 text-xs text-slate-400">{field.helperText}</p>
                  )}
                </label>
              )
            })}
          </div>

          <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            {footerSlot ? (
              footerSlot
            ) : (
              <p className="text-xs text-slate-400">
                Los datos se sincronizarán con el CRM principal de BS Automotores.
              </p>
            )}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-3xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-white/30 hover:bg-white/5"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-3xl bg-gradient-to-r from-brand-500 to-brand-400 px-6 py-3 text-sm font-semibold text-white shadow-card transition hover:shadow-lg"
              >
                {submitLabel}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )

  return createPortal(<Fragment>{modalContent}</Fragment>, document.body)
}

export default ModalForm
