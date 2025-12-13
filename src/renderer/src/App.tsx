import { useState } from 'react'
import Layout from './components/Layout'
import Inventory from './pages/Inventory'
import Pos from './pages/Pos'
import Categories from './pages/Categories'

// Placeholder components
const Reports = () => <div className="text-slate-500 p-6">Reportes y Estadísticas</div>
const Settings = () => <div className="text-slate-500 p-6">Configuración del Sistema</div>

function App(): JSX.Element {
  const [navState, setNavState] = useState<{ view: string; data?: any }>({
    view: 'categories' // Cambiado temporalmente para visualizar lo nuevo
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
