import { useMemo, useState } from 'react'
import SectionCard from '../components/cards/SectionCard'
import SearchInput from '../components/filters/SearchInput'
import SelectFilter from '../components/filters/SelectFilter'
import ProspectsTable from '../components/tables/ProspectsTable'
import { useData } from '../context/DataContext'
import ModalForm, {
  type ModalFormField,
  type ModalFormValues,
} from '../components/common/ModalForm'

const ProspectsPage = () => {
  const { prospects } = useData()
  const [search, setSearch] = useState('')
  const [stage, setStage] = useState('all')
  const [owner, setOwner] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const owners = useMemo(
    () => Array.from(new Set(prospects.map((prospect) => prospect.assignedTo))),
    [prospects],
  )

  const filteredProspects = useMemo(
    () =>
      prospects.filter((prospect) => {
        const matchesSearch =
          prospect.name.toLowerCase().includes(search.toLowerCase()) ||
          prospect.interest.toLowerCase().includes(search.toLowerCase())
        const matchesStage = stage === 'all' || prospect.stage === stage
        const matchesOwner = owner === 'all' || prospect.assignedTo === owner
        return matchesSearch && matchesStage && matchesOwner
      }),
    [prospects, search, stage, owner],
  )

  const fields: ModalFormField[] = [
    {
      name: 'name',
      label: 'Nombre completo',
      placeholder: 'Juan Pérez',
      required: true,
    },
    {
      name: 'interest',
      label: 'Interés principal',
      placeholder: 'SUV familiar, pick-up, etc.',
    },
    {
      name: 'budget',
      label: 'Presupuesto estimado',
      type: 'number',
      placeholder: '35000',
    },
    {
      name: 'assignedTo',
      label: 'Asignado a',
      placeholder: 'Ej: Rocío Fernández',
    },
    {
      name: 'nextFollowUp',
      label: 'Próximo contacto',
      type: 'date',
    },
    {
      name: 'notes',
      label: 'Notas del asesor',
      type: 'textarea',
      placeholder: 'Objeciones, contexto, etc.',
    },
  ]

  const handleSubmit = (values: ModalFormValues) => {
    console.table({ entity: 'prospecto', values })
    setIsModalOpen(false)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-10">
      <header className="mb-8">
        <p className="font-display text-xs uppercase tracking-[0.4em] text-brand-300">Prospectos</p>
        <h1 className="mt-3 font-display text-4xl text-white">Embudo comercial</h1>
        <p className="mt-2 text-slate-400">
          Detectá oportunidades y priorizá seguimientos con filtros avanzados.
        </p>
      </header>

      <SectionCard
        title="Prospectos activos"
        description="Control total del funnel en tiempo real."
        primaryActionLabel="Nuevo prospecto"
        onPrimaryAction={() => setIsModalOpen(true)}
      >
        <div className="mb-6 grid gap-4 md:grid-cols-[2fr_1fr_1fr]">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Buscar por nombre o interés"
          />
          <SelectFilter
            label="Etapa"
            value={stage}
            onChange={setStage}
            options={[
              { label: 'Todas', value: 'all' },
              { label: 'Nuevo', value: 'nuevo' },
              { label: 'Seguimiento', value: 'seguimiento' },
              { label: 'Cierre', value: 'cierre' },
            ]}
          />
          <SelectFilter
            label="Asignado a"
            value={owner}
            onChange={setOwner}
            options={[
              { label: 'Todos', value: 'all' },
              ...owners.map((o) => ({ label: o, value: o })),
            ]}
          />
        </div>
        <ProspectsTable
          data={filteredProspects}
          onEdit={(id) => console.log('edit prospect', id)}
          onDelete={(id) => console.log('delete prospect', id)}
          maxHeight={520}
        />
      </SectionCard>

      <ModalForm
        isOpen={isModalOpen}
        title="Registrar prospecto"
        description="Capturá la información inicial para comenzar el seguimiento."
        submitLabel="Guardar prospecto"
        fields={fields}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default ProspectsPage
