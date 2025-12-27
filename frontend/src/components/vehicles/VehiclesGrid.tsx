import { Download } from 'lucide-react'
import type { Vehicle } from '../../data/mockData'
import ActionMenu from '../common/ActionMenu'

type Props = {
  data: Vehicle[]
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onDownload?: (vehicle: Vehicle) => void
}

const VehiclesGrid = ({ data, onEdit, onDelete, onDownload }: Props) => (
  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
    {data.map((vehicle) => (
      <article
        key={vehicle.id}
        className="flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 shadow-card"
      >
        <div className="relative">
          <img
            src={vehicle.image}
            alt={`${vehicle.brand} ${vehicle.model}`}
            className="h-48 w-full object-cover"
            loading="lazy"
          />
          <div className="absolute right-4 top-4 flex items-center gap-2">
            {onDownload && (
              <button
                onClick={() => onDownload(vehicle)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-slate-900/70 text-white transition hover:bg-brand-500/30"
                aria-label="Descargar ficha técnica"
              >
                <Download className="h-4 w-4" />
              </button>
            )}
            <ActionMenu
              onEdit={onEdit ? () => onEdit(vehicle.id) : undefined}
              onDelete={onDelete ? () => onDelete(vehicle.id) : undefined}
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-5">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400">{vehicle.brand}</p>
            <h3 className="font-display text-2xl text-white">{vehicle.model}</h3>
            <p className="text-sm text-slate-400">{vehicle.plate}</p>
          </div>
          <dl className="grid grid-cols-2 gap-3 text-xs text-slate-300">
            <InfoRow label="Año" value={vehicle.year} />
            <InfoRow label="Kilometraje" value={vehicle.mileage} />
            <InfoRow label="Motor" value={vehicle.engine} />
            <InfoRow label="Transmisión" value={vehicle.transmission} />
            <InfoRow label="Color" value={vehicle.color} />
            <InfoRow label="ID" value={vehicle.id} />
          </dl>
          <div className="mt-auto">
            <p className="text-sm text-slate-400">Precio sugerido</p>
            <p className="font-display text-2xl text-brand-200">{vehicle.price}</p>
          </div>
        </div>
      </article>
    ))}
  </div>
)

const InfoRow = ({ label, value }: { label: string; value: string | number }) => (
  <div>
    <dt className="text-[0.7rem] uppercase tracking-wide text-slate-500">{label}</dt>
    <dd className="text-sm text-white">{value}</dd>
  </div>
)

export default VehiclesGrid
