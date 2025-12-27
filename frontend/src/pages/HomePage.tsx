import { useMemo, useState } from 'react'
import { Car, PhoneCall, Plus, TrendingUp, Users } from 'lucide-react'
import SectionCard from '../components/cards/SectionCard'
import ClientsTable from '../components/tables/ClientsTable'
import ProspectsTable from '../components/tables/ProspectsTable'
import VehiclesGrid from '../components/vehicles/VehiclesGrid'
import { useData } from '../context/DataContext'
import ModalForm, {
  type ModalFormField,
  type ModalFormValues,
} from '../components/common/ModalForm'

type ModalEntity = 'cliente' | 'prospecto' | 'auto'
type Entity = ModalEntity | 'oportunidad'

const HomePage = () => {
  const { clients, prospects, vehicles } = useData()
  const [activeForm, setActiveForm] = useState<ModalEntity | null>(null)

  const stats = useMemo(
    () => [
      {
        title: 'Clientes activos',
        value: clients.filter((c) => c.status === 'activo').length,
        helper: '+12% vs mes anterior',
        icon: Users,
      },
      {
        title: 'Prospectos en seguimiento',
        value: prospects.filter((p) => p.stage === 'seguimiento').length,
        helper: '2 reuniones hoy',
        icon: PhoneCall,
      },
      {
        title: 'Stock disponible',
        value: vehicles.length,
        helper: '4 ingresos esta semana',
        icon: Car,
      },
      {
        title: 'Tasa de conversión',
        value: '28%',
        helper: 'Objetivo mensual 32%',
        icon: TrendingUp,
      },
    ],
    [clients, prospects, vehicles],
  )

  const formConfigs: Record<ModalEntity, { title: string; description: string; submitLabel: string }> =
    useMemo(
      () => ({
        cliente: {
          title: 'Registrar cliente',
          description:
            'Completa los datos clave para sumar un nuevo cliente al ecosistema de BS Automotores.',
          submitLabel: 'Guardar cliente',
        },
        prospecto: {
          title: 'Agregar prospecto',
          description:
            'Capturá información del prospecto para continuar el seguimiento dentro del funnel.',
          submitLabel: 'Guardar prospecto',
        },
        auto: {
          title: 'Nuevo auto en stock',
          description:
            'Publicá rápidamente un vehículo con los detalles necesarios para sumarlo al inventario.',
          submitLabel: 'Registrar auto',
        },
      }),
      [],
    )

  const formFields: Record<ModalEntity, ModalFormField[]> = useMemo(
    () => ({
      cliente: [
        { name: 'name', label: 'Nombre completo', placeholder: 'Ej: María González', required: true },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          placeholder: 'maria@empresa.com',
          required: true,
        },
        {
          name: 'phone',
          label: 'Teléfono',
          placeholder: '+54 9 11 1234 5678',
        },
        {
          name: 'joinedAt',
          label: 'Fecha de alta',
          type: 'date',
          helperText: 'Fecha en que se confirmó la relación comercial.',
        },
        {
          name: 'notes',
          label: 'Notas internas',
          type: 'textarea',
          placeholder: 'Contexto adicional, últimos contactos, etc.',
        },
      ],
      prospecto: [
        {
          name: 'name',
          label: 'Nombre del prospecto',
          placeholder: 'Ej: Juan Pérez',
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
          name: 'nextFollowUp',
          label: 'Próximo contacto',
          type: 'date',
          helperText: 'Fecha comprometida para seguimiento.',
        },
        {
          name: 'notes',
          label: 'Notas del asesor',
          type: 'textarea',
          placeholder: 'Necesidades, objeciones, referencias...',
        },
      ],
      auto: [
        { name: 'model', label: 'Modelo', placeholder: 'Toyota Corolla 2.0', required: true },
        {
          name: 'year',
          label: 'Año',
          type: 'number',
          placeholder: '2023',
          helperText: 'Ingresá sólo números.',
        },
        {
          name: 'price',
          label: 'Precio',
          type: 'number',
          placeholder: '30000000',
        },
        {
          name: 'arrivalDate',
          label: 'Fecha de ingreso',
          type: 'date',
        },
        {
          name: 'description',
          label: 'Descripción / equipamiento',
          type: 'textarea',
          placeholder: 'Paquete Safety Sense, 15.000 km, único dueño...',
        },
      ],
    }),
    [],
  )

  const isModalEntity = (entity: Entity): entity is ModalEntity =>
    entity === 'cliente' || entity === 'prospecto' || entity === 'auto'

  const handleAction = (entity: Entity, action: 'create' | 'edit' | 'delete', id?: string) => {
    console.log(`[MVP] ${action} ${entity}`, id)
    if (action === 'create' && isModalEntity(entity)) {
      setActiveForm(entity)
    }
  }

  const handleSubmitForm = (values: ModalFormValues) => {
    if (!activeForm) return
    console.table({ entity: activeForm, values })
    setActiveForm(null)
  }

  return (
    <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-10">
      <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-brand-500/30 to-transparent blur-3xl" />

      <header className="flex flex-col gap-6 border-b border-white/10 pb-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-sm uppercase tracking-[0.4em] text-brand-300">
            BS Automotores
          </p>
          <h1 className="mt-3 font-display text-4xl text-white md:text-5xl">Dashboard comercial</h1>
          <p className="mt-4 max-w-2xl text-base text-slate-300">
            Controlá clientes, prospectos y stock desde una sola vista diseñada para escalar.
          </p>
        </div>
        <button
          onClick={() => handleAction('oportunidad', 'create')}
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-card transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          <Plus className="h-4 w-4" />
          Nueva oportunidad
        </button>
      </header>

      <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ title, value, helper, icon: Icon }) => (
          <article
            key={title}
            className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-300">{title}</p>
              <span className="rounded-2xl bg-brand-500/10 p-2 text-brand-200">
                <Icon className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-4 font-display text-4xl text-white">{value}</p>
            <p className="mt-2 text-sm text-slate-400">{helper}</p>
          </article>
        ))}
      </section>

      <section className="mt-12 grid gap-10 lg:grid-cols-2">
        <SectionCard
          title="Clientes"
          description="Gestión completa de clientes registrados."
          primaryActionLabel="Añadir cliente"
          onPrimaryAction={() => handleAction('cliente', 'create')}
          showSearchBadge
        >
          <ClientsTable
            data={clients.slice(0, 5)}
            onEdit={(id) => handleAction('cliente', 'edit', id)}
            onDelete={(id) => handleAction('cliente', 'delete', id)}
            maxHeight={360}
          />
        </SectionCard>

        <SectionCard
          title="Prospectos"
          description="Seguimiento en tiempo real del funnel comercial."
          primaryActionLabel="Añadir prospecto"
          onPrimaryAction={() => handleAction('prospecto', 'create')}
          showSearchBadge
        >
          <ProspectsTable
            data={prospects.slice(0, 5)}
            onEdit={(id) => handleAction('prospecto', 'edit', id)}
            onDelete={(id) => handleAction('prospecto', 'delete', id)}
            maxHeight={360}
          />
        </SectionCard>
      </section>

      <section className="mt-12">
        <SectionCard
          title="Autos en stock"
          description="Inventario centralizado listo para publicar."
          primaryActionLabel="Añadir auto"
          onPrimaryAction={() => handleAction('auto', 'create')}
        >
          <VehiclesGrid
            data={vehicles.slice(0, 6)}
            onEdit={(id) => handleAction('auto', 'edit', id)}
            onDelete={(id) => handleAction('auto', 'delete', id)}
          />
        </SectionCard>
      </section>
      {activeForm && (
        <ModalForm
          isOpen
          title={formConfigs[activeForm].title}
          description={formConfigs[activeForm].description}
          submitLabel={formConfigs[activeForm].submitLabel}
          fields={formFields[activeForm]}
          onClose={() => setActiveForm(null)}
          onSubmit={handleSubmitForm}
        />
      )}
    </div>
  )
}

export default HomePage
