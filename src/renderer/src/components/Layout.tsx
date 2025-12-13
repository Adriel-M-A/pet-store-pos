import { useState } from 'react'
import { ShoppingCart, Package, Tags, BarChart3, Settings, Menu } from 'lucide-react'
import { cn } from '../lib/utils'

interface LayoutProps {
  children: React.ReactNode
  currentView: string
  onNavigate: (view: string) => void
}

export default function Layout({ children, currentView, onNavigate }: LayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const mainMenuItems = [
    { id: 'pos', label: 'Punto de Venta', icon: <ShoppingCart size={20} /> },
    { id: 'inventory', label: 'Inventario', icon: <Package size={20} /> },
    { id: 'categories', label: 'Categorías', icon: <Tags size={20} /> },
    { id: 'reports', label: 'Reportes', icon: <BarChart3 size={20} /> }
  ]

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <aside
        className={cn(
          'bg-slate-900 border-r border-slate-800 transition-all duration-300 flex flex-col',
          isCollapsed ? 'w-16' : 'w-64'
        )}
      >
        <div className="h-16 flex items-center justify-center border-b border-slate-800">
          <div
            className={cn(
              'flex items-center gap-2 transition-opacity',
              isCollapsed ? 'hidden' : 'flex'
            )}
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              V
            </div>
            <span className="font-bold text-lg text-white tracking-wide">VET MANAGER</span>
          </div>
          {isCollapsed && (
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
              VM
            </div>
          )}
        </div>

        <nav className="flex-1 py-6 px-2 space-y-1 overflow-y-auto">
          {mainMenuItems.map((item) => {
            const isActive = currentView === item.id
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-3 rounded-md transition-all duration-200 group relative',
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white',
                  isCollapsed && 'justify-center px-0'
                )}
                title={isCollapsed ? item.label : undefined}
              >
                {item.icon}
                {!isCollapsed && <span className="font-medium">{item.label}</span>}

                {isActive && isCollapsed && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-l-full" />
                )}
              </button>
            )
          })}
        </nav>

        <div className="px-2 pb-2">
          <button
            onClick={() => onNavigate('settings')}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-3 rounded-md transition-all duration-200 group relative',
              currentView === 'settings'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white',
              isCollapsed && 'justify-center px-0'
            )}
            title="Configuración"
          >
            <Settings size={20} />
            {!isCollapsed && <span className="font-medium">Configuración</span>}
          </button>
        </div>

        <div className="p-2 border-t border-slate-800">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center p-2 rounded-md hover:bg-slate-800 text-slate-400 transition-colors"
            title={isCollapsed ? 'Expandir' : 'Colapsar'}
          >
            <Menu size={20} />
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto relative flex flex-col bg-background">
        {/* Header eliminado */}
        <div className="p-6 flex-1">{children}</div>
      </main>
    </div>
  )
}
