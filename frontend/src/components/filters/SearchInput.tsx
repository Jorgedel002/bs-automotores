type Props = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

const SearchInput = ({ value, onChange, placeholder = 'Buscar...', className = '' }: Props) => (
  <label
    className={`flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 focus-within:border-brand-400/50 focus-within:bg-white/10 ${className}`}
  >
    <span className="text-xs uppercase tracking-[0.3em] text-slate-500">Buscar</span>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="flex-1 bg-transparent text-white placeholder:text-slate-500 focus:outline-none"
    />
  </label>
)

export default SearchInput
