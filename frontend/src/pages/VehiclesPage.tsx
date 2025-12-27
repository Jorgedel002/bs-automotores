import { useMemo, useState } from 'react'
import SectionCard from '../components/cards/SectionCard'
import SearchInput from '../components/filters/SearchInput'
import SelectFilter from '../components/filters/SelectFilter'
import VehiclesGrid from '../components/vehicles/VehiclesGrid'
import { useData } from '../context/DataContext'
import { downloadVehiclePdf } from '../utils/downloadVehiclePdf'
import ModalForm, {
  type ModalFormField,
  type ModalFormValues,
} from '../components/common/ModalForm'

const VehiclesPage = () => {
  const { vehicles } = useData()
  const [search, setSearch] = useState('')
  const [brand, setBrand] = useState('all')
  const [year, setYear] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const brands = useMemo(
    () => Array.from(new Set(vehicles.map((vehicle) => vehicle.brand))),
    [vehicles],
  )
  const years = useMemo(
    () =>
      Array.from(new Set(vehicles.map((vehicle) => vehicle.year.toString()))).sort(
        (a, b) => parseInt(b) - parseInt(a),
      ),
    [vehicles],
  )

  const filteredVehicles = useMemo(
    () =>
      vehicles.filter((vehicle) => {
        const matchesSearch =
          vehicle.model.toLowerCase().includes(search.toLowerCase()) ||
          vehicle.brand.toLowerCase().includes(search.toLowerCase()) ||
          vehicle.plate.toLowerCase().includes(search.toLowerCase())
        const matchesBrand = brand === 'all' || vehicle.brand === brand
        const matchesYear = year === 'all' || vehicle.year.toString() === year
        return matchesSearch && matchesBrand && matchesYear
      }),
    [vehicles, search, brand, year],
  )

  const fields: ModalFormField[] = [
    {
      name: 'model',
      label: 'Modelo',
      placeholder: 'Toyota Corolla SEG CVT',
      required: true,
    },
    { name: 'brand', label: 'Marca', placeholder: 'Toyota' },
    {
      name: 'year',
      label: 'Año',
      type: 'number',
      placeholder: '2023',
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
      label: 'Descripción y equipamiento',
      type: 'textarea',
      placeholder: 'Paquete safety sense, 12.000 km, historial en concesionario...',
    },
    {
      name: 'coverImage',
      label: 'Imagen principal',
      type: 'file',
      accept: 'image/*',
      helperText: 'Subí una portada atractiva para destacar el vehículo.',
    },
    {
      name: 'gallery',
      label: 'Galería de imágenes',
      type: 'files',
      accept: 'image/*',
      helperText: 'Podés seleccionar varias imágenes para mostrar más detalles.',
    },
  ]

  const handleSubmit = (values: ModalFormValues) => {
    console.table({ entity: 'auto', values })
    setIsModalOpen(false)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-10">
      <header className="mb-8">
        <p className="font-display text-xs uppercase tracking-[0.4em] text-brand-300">Autos</p>
        <h1 className="mt-3 font-display text-4xl text-white">Inventario completo</h1>
        <p className="mt-2 text-slate-400">
          Filtra por marca, modelo o año para encontrar el vehículo ideal.
        </p>
      </header>

      <SectionCard
        title="Autos en stock"
        description="Información preparada para publicar en portales."
        primaryActionLabel="Nuevo auto"
        onPrimaryAction={() => setIsModalOpen(true)}
      >
        <div className="mb-6 grid gap-4 md:grid-cols-[2fr_1fr_1fr]">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Buscar por modelo, marca o dominio"
          />
          <SelectFilter
            label="Marca"
            value={brand}
            onChange={setBrand}
            options={[
              { label: 'Todas', value: 'all' },
              ...brands.map((b) => ({ label: b, value: b })),
            ]}
          />
          <SelectFilter
            label="Año"
            value={year}
            onChange={setYear}
            options={[
              { label: 'Todos', value: 'all' },
              ...years.map((y) => ({ label: y, value: y })),
            ]}
          />
        </div>
        <VehiclesGrid
          data={filteredVehicles}
          onEdit={(id) => console.log('edit vehicle', id)}
          onDelete={(id) => console.log('delete vehicle', id)}
          onDownload={(vehicle) => downloadVehiclePdf(vehicle)}
        />
      </SectionCard>

      <ModalForm
        isOpen={isModalOpen}
        title="Dar de alta un auto"
        description="Cargá los datos esenciales para sumar el vehículo al inventario."
        submitLabel="Guardar auto"
        fields={fields}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default VehiclesPage
