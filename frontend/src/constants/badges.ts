import type { Client, Prospect } from '../data/mockData'

export const stageBadgeStyles: Record<Prospect['stage'], string> = {
  nuevo: 'bg-brand-500/15 text-brand-200 border border-brand-400/30',
  seguimiento: 'bg-amber-500/15 text-amber-200 border border-amber-400/30',
  cierre: 'bg-emerald-500/15 text-emerald-200 border border-emerald-400/30',
}

export const statusBadgeStyles: Record<Client['status'], string> = {
  activo: 'bg-emerald-500/15 text-emerald-200 border border-emerald-500/20',
  inactivo: 'bg-slate-800 text-slate-200 border border-slate-700',
}
