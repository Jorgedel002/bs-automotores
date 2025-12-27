import type { Client } from '../../data/mockData'
import { statusBadgeStyles } from '../../constants/badges'
import ActionMenu from '../common/ActionMenu'

type Props = {
  data: Client[]
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  maxHeight?: number
}

const ClientsTable = ({ data, onEdit, onDelete, maxHeight = 440 }: Props) => (
  <div className="w-full rounded-3xl border border-white/10 bg-slate-900/40 shadow-[0_30px_80px_-45px_rgba(17,47,105,0.9)]">
    <div className="custom-scrollbar w-full overflow-auto" style={{ maxHeight }}>
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="bg-white/3 text-left text-[0.65rem] uppercase tracking-[0.4em] text-slate-400">
            <th className="px-6 py-5 font-semibold">Cliente</th>
            <th className="px-6 py-5 font-semibold">DNI</th>
            <th className="px-6 py-5 font-semibold">Contacto</th>
            <th className="px-6 py-5 font-semibold">Estado</th>
            <th className="px-6 py-5"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((client, index) => (
            <tr
              key={client.id}
              className={`border-t border-white/3 bg-gradient-to-r from-white/[0.03] via-transparent to-transparent text-slate-100 transition hover:bg-white/5 ${index === 0 ? 'border-t-white/0' : ''}`}
            >
              <td className="px-6 py-4">
                <div className="font-semibold text-white">{client.name}</div>
                <p className="text-xs text-slate-500">{client.email}</p>
              </td>
              <td className="px-6 py-4 font-medium text-slate-200">{client.dni}</td>
              <td className="px-6 py-4 text-slate-200">{client.phone}</td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold shadow-inner shadow-black/40 ${statusBadgeStyles[client.status]}`}
                >
                  {client.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <ActionMenu
                  onEdit={onEdit ? () => onEdit(client.id) : undefined}
                  onDelete={onDelete ? () => onDelete(client.id) : undefined}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

export default ClientsTable
