import { ShoppingCart, Package, History, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

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
    // Fondo oscuro fijo (Slate 900)
    <aside className="h-screen w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800">
      <div className="h-16 flex items-center px-6">
        <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          VET MANAGER
        </h1>
      </div>

      {/* Separador personalizado para modo oscuro */}
      <Separator className="bg-slate-800" />

      <nav className="flex-1 py-6 px-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = currentView === item.id

          return (
            <Button
              key={item.id}
              // Si está activo, usamos variante 'default' (Azul). Si no, 'ghost' pero con hover oscuro manual.
              variant={isActive ? 'default' : 'ghost'}
              className={`w-full justify-start gap-3 text-base font-normal ${
                isActive
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
              onClick={() => onChangeView(item.id as View)}
            >
              <Icon size={20} />
              {item.label}
            </Button>
          )
        })}
      </nav>

      <Separator className="bg-slate-800" />

      <div className="p-4">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="h-9 w-9 rounded-full bg-slate-800 flex items-center justify-center text-blue-400 border border-slate-700">
            <User size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">Veterinario</span>
            <span className="text-xs text-slate-500">Administrador</span>
          </div>
        </div>

        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-slate-400 hover:bg-red-900/20 hover:text-red-400"
        >
          <LogOut size={18} />
          Cerrar Sesión
        </Button>
      </div>
    </aside>
  )
}
