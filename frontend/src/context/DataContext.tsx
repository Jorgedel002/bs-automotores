import { createContext, useContext, useMemo, useState } from 'react'
import type { Client, Prospect, Vehicle } from '../data/mockData'
import { clientsSeed, prospectsSeed, vehiclesSeed } from '../data/mockData'

type DataContextType = {
  clients: Client[]
  prospects: Prospect[]
  vehicles: Vehicle[]
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [clients] = useState<Client[]>(clientsSeed)
  const [prospects] = useState<Prospect[]>(prospectsSeed)
  const [vehicles] = useState<Vehicle[]>(vehiclesSeed)

  const value = useMemo(
    () => ({
      clients,
      prospects,
      vehicles,
    }),
    [clients, prospects, vehicles],
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}
