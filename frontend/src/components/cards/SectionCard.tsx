import type { ReactNode } from 'react'
import { Plus, Search } from 'lucide-react'

type Props = {
  title: string
  description?: string
  onPrimaryAction?: () => void
  primaryActionLabel?: string
  children: ReactNode
  showSearchBadge?: boolean
}

const SectionCard = ({
  title,
  description,
  onPrimaryAction,
  primaryActionLabel,
  children,
  showSearchBadge,
}: Props) => (
  <article className="rounded-4xl border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_-45px_rgba(17,47,105,0.9)] backdrop-blur-xl">
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="font-display text-2xl text-white">{title}</h2>
        {description && <p className="text-sm text-slate-300">{description}</p>}
      </div>
      <div className="flex w-full items-center justify-end gap-2 md:w-auto">
        <div className="flex items-center gap-2">
          {showSearchBadge && (
            <div className="hidden rounded-full border border-white/10 bg-slate-900/30 px-3 py-2 text-sm text-slate-300 md:flex">
              <Search className="mr-2 h-4 w-4 opacity-70" />
              Buscar
            </div>
          )}
          {onPrimaryAction && primaryActionLabel && (
            <button
              onClick={onPrimaryAction}
              className="inline-flex items-center gap-2 rounded-full border border-brand-400/40 bg-brand-500/20 px-4 py-2 text-sm font-semibold text-brand-100 hover:bg-brand-500/30"
            >
              <Plus className="h-4 w-4" />
              {primaryActionLabel}
            </button>
          )}
        </div>
      </div>
    </div>
    {children}
  </article>
)

export default SectionCard
