import { useState } from 'react'
import { Sidebar } from './components/Sidebar'

type View = 'pos' | 'inventory' | 'history'

function App(): JSX.Element {
  const [currentView, setCurrentView] = useState<View>('pos')

  return (
    <div className="flex h-screen w-full bg-slate-50 font-sans text-slate-900">
      {/* Sidebar Lateral */}
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />

      {/* Área de Contenido Principal */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Header Superior */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm z-10 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {currentView === 'pos' && 'Nueva Venta'}
              {currentView === 'inventory' && 'Gestión de Inventario'}
              {currentView === 'history' && 'Historial de Transacciones'}
            </h2>
            <p className="text-sm text-slate-500">Sistema de Control Veterinario</p>
          </div>
          <div className="text-sm font-medium text-slate-600 bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
            {new Date().toLocaleDateString('es-AR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long'
            })}
          </div>
        </header>

        {/* Contenedor de Vistas */}
        <div className="flex-1 overflow-auto p-6 bg-slate-50">
          {currentView === 'pos' && (
            <div className="flex items-center justify-center h-full border-2 border-dashed border-slate-300 rounded-xl bg-slate-100/50">
              <div className="text-center">
                <p className="text-lg font-medium text-slate-600">Módulo de Punto de Venta (POS)</p>
                <p className="text-sm text-slate-400">
                  Listo para implementar el carrito de compras
                </p>
              </div>
            </div>
          )}

          {currentView === 'inventory' && (
            <div className="flex items-center justify-center h-full border-2 border-dashed border-slate-300 rounded-xl bg-slate-100/50">
              <p className="text-slate-400">Aquí irá la tabla de productos (CRUD)</p>
            </div>
          )}

          {currentView === 'history' && (
            <div className="flex items-center justify-center h-full border-2 border-dashed border-slate-300 rounded-xl bg-slate-100/50">
              <p className="text-slate-400">Aquí irá el historial de ventas</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
