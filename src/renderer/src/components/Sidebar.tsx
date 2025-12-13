import { ShoppingCart, Package, History, User } from 'lucide-react'

type View = 'pos' | 'inventory' | 'history'

interface SidebarProps {
  currentView: View
  onChangeView: (view: View) => void
}

export function Sidebar({ currentView, onChangeView }: SidebarProps): JSX.Element {
  const menuItems = [
    { id: 'pos', label: 'Punto de Venta', icon: ShoppingCart },
    { id: 'inventory', label: 'Inventario', icon: Package },
    { id: 'history', label: 'Historial / Caja', icon: History }
  ]

  return (
    <aside className="h-screen w-64 bg-slate-900 flex flex-col border-r border-slate-800 text-slate-300">
      {/* Header / Logo */}
      <div className="h-16 flex items-center justify-center border-b border-slate-800">
        <h1 className="text-xl font-bold text-white tracking-wider flex items-center gap-2">
          VET MANAGER
        </h1>
      </div>

      {/* Navegación */}
      <nav className="flex-1 py-6 px-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = currentView === item.id

          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id as View)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Perfil Usuario Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white">
            <User size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-white font-medium">Veterinario</span>
            <span className="text-xs text-slate-500">Administrador</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
