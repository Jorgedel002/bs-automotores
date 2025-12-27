import { useMemo, useState } from 'react'
import SectionCard from '../components/cards/SectionCard'
import SearchInput from '../components/filters/SearchInput'
import SelectFilter from '../components/filters/SelectFilter'
import ClientsTable from '../components/tables/ClientsTable'
import { useData } from '../context/DataContext'
import ModalForm, {
  type ModalFormField,
  type ModalFormValues,
} from '../components/common/ModalForm'

const ClientsPage = () => {
  const { clients } = useData()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<string>('all')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredClients = useMemo(
    () =>
      clients.filter((client) => {
        const matchesSearch =
          client.name.toLowerCase().includes(search.toLowerCase()) ||
          client.email.toLowerCase().includes(search.toLowerCase())
        const matchesStatus = status === 'all' || client.status === status
        return matchesSearch && matchesStatus
      }),
    [clients, search, status],
  )

  const fields: ModalFormField[] = [
    { name: 'name', label: 'Nombre completo', placeholder: 'Ej: Laura Díaz', required: true },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'laura@empresa.com',
      required: true,
    },
    {
      name: 'phone',
      label: 'Teléfono',
      placeholder: '+54 9 351 555 9988',
    },
    {
      name: 'joinedAt',
      label: 'Fecha de alta',
      type: 'date',
    },
    {
      name: 'notes',
      label: 'Notas adicionales',
      type: 'textarea',
      placeholder: 'Información relevante del cliente...',
    },
  ]

  const handleSubmit = (values: ModalFormValues) => {
    console.table({ entity: 'cliente', values })
    setIsModalOpen(false)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-10">
      <header className="mb-8">
        <p className="font-display text-xs uppercase tracking-[0.4em] text-brand-300">Clientes</p>
        <h1 className="mt-3 font-display text-4xl text-white">Base de clientes</h1>
        <p className="mt-2 text-slate-400">
          Segmentá y encontrá clientes rápido con filtros inteligentes.
        </p>
      </header>

      <SectionCard
        title="Listado de clientes"
        description="Datos sincronizados con CRM central."
        primaryActionLabel="Nuevo cliente"
        onPrimaryAction={() => setIsModalOpen(true)}
      >
        <div className="mb-6 grid gap-4 md:grid-cols-[2fr_1fr]">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Buscar por nombre o email"
          />
          <SelectFilter
            label="Estado"
            value={status}
            onChange={setStatus}
            options={[
              { label: 'Todos', value: 'all' },
              { label: 'Activos', value: 'activo' },
              { label: 'Inactivos', value: 'inactivo' },
            ]}
          />
        </div>
        <ClientsTable data={filteredClients} onEdit={() => {}} onDelete={() => {}} maxHeight={520} />
      </SectionCard>

      <ModalForm
        isOpen={isModalOpen}
        title="Crear nuevo cliente"
        description="Cargá la información básica para sumar un cliente a la base."
        submitLabel="Guardar cliente"
        fields={fields}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default ClientsPage
