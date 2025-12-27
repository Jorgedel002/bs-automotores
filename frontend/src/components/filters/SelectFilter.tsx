type Option = {
  label: string
  value: string
}

type Props = {
  label: string
  value: string
  options: Option[]
  onChange: (value: string) => void
  className?: string
}

const SelectFilter = ({ label, value, options, onChange, className = '' }: Props) => (
  <label
    className={`rounded-3xl border border-white/10 bg-gradient-to-r from-white/5 via-white/5 to-white/0 px-5 py-3 text-sm text-slate-200 shadow-[0_20px_50px_-30px_rgba(15,59,136,0.8)] backdrop-blur ${className}`}
  >
    <span className="text-[0.55rem] uppercase tracking-[0.5em] text-slate-500">{label}</span>
    <div className="mt-2 flex items-center gap-3">
      <div className="flex-1">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-2xl bg-slate-900/40 px-4 py-2 text-white outline-none ring-[1.5px] ring-white/10 focus:ring-brand-400/60"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-slate-900 text-white">
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  </label>
)

export default SelectFilter
