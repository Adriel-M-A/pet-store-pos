import { useState } from 'react'
import Layout from './components/Layout'

// Placeholder components (Los desarrollaremos uno a uno)
const Pos = () => <div className="text-slate-500">Módulo de Ventas (Carrito)</div>
const Inventory = () => <div className="text-slate-500">Gestión de Inventario</div>
const Categories = () => <div className="text-slate-500">Gestión de Categorías</div>
const Reports = () => <div className="text-slate-500">Reportes y Estadísticas</div>
const Settings = () => <div className="text-slate-500">Configuración del Sistema</div>

function App(): JSX.Element {
  const [navState, setNavState] = useState<{ view: string; data?: any }>({
    view: 'pos' // Iniciamos directo en el punto de venta
  })

  const handleNavigate = (view: string, data?: any) => {
    setNavState({ view, data })
  }

  const renderView = () => {
    switch (navState.view) {
      case 'pos':
        return <Pos />
      case 'inventory':
        return <Inventory />
      case 'categories':
        return <Categories />
      case 'reports':
        return <Reports />
      case 'settings':
        return <Settings />
      default:
        return <Pos />
    }
  }

  return (
    <Layout currentView={navState.view} onNavigate={(v) => handleNavigate(v)}>
      {renderView()}
    </Layout>
  )
}

export default App
