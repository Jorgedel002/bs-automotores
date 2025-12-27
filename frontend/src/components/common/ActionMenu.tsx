import { MoreVertical } from 'lucide-react'

type Props = {
  onEdit?: () => void
  onDelete?: () => void
}

const ActionMenu = ({ onEdit, onDelete }: Props) => (
  <details className="group relative">
    <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10">
      <MoreVertical className="h-4 w-4" />
    </summary>
    <div className="absolute right-0 z-20 mt-2 w-36 rounded-xl border border-white/10 bg-slate-900/95 p-1 text-sm text-slate-200 shadow-xl">
      {onEdit && (
        <button
          onClick={onEdit}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left hover:bg-white/10"
        >
          Editar
        </button>
      )}
      {onDelete && (
        <button
          onClick={onDelete}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-rose-300 hover:bg-rose-500/10"
        >
          Eliminar
        </button>
      )}
    </div>
  </details>
)

export default ActionMenu
