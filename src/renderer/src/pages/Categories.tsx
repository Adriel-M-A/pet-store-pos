import { useState } from 'react'
import { Plus, Search, Pencil, Trash2, Power, PawPrint, Tag } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

interface CategoryItem {
  id: string
  name: string
  active: boolean
  count: number // Cantidad de productos asociados (ejemplo)
}

const MOCK_SPECIES: CategoryItem[] = [
  { id: '1', name: 'Perro', active: true, count: 120 },
  { id: '2', name: 'Gato', active: true, count: 85 },
  { id: '3', name: 'Conejo', active: false, count: 5 },
  { id: '4', name: 'Aves', active: true, count: 12 }
]

const MOCK_TYPES: CategoryItem[] = [
  { id: '1', name: 'Alimento', active: true, count: 200 },
  { id: '2', name: 'Juguete', active: true, count: 50 },
  { id: '3', name: 'Farmacia', active: true, count: 45 },
  { id: '4', name: 'Accesorio', active: true, count: 30 }
]

export default function Categories() {
  const [activeTab, setActiveTab] = useState('species')
  const [species, setSpecies] = useState(MOCK_SPECIES)
  const [types, setTypes] = useState(MOCK_TYPES)
  const [searchTerm, setSearchTerm] = useState('')

  // Función genérica para alternar estado (Activar/Desactivar)
  const toggleStatus = (id: string, listType: 'species' | 'types') => {
    const setter = listType === 'species' ? setSpecies : setTypes
    setter((prev) =>
      prev.map((item) => (item.id === id ? { ...item, active: !item.active } : item))
    )
  }

  // Función genérica para eliminar
  const deleteItem = (id: string, listType: 'species' | 'types') => {
    const setter = listType === 'species' ? setSpecies : setTypes
    setter((prev) => prev.filter((item) => item.id !== id))
  }

  const renderTable = (data: CategoryItem[], type: 'species' | 'types') => {
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
      <div className="rounded-md border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="w-[300px]">Nombre</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Productos Asociados</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-slate-500">
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((item) => (
                <TableRow key={item.id} className={!item.active ? 'opacity-60 bg-slate-50/50' : ''}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {type === 'species' ? (
                        <PawPrint size={16} className="text-slate-400" />
                      ) : (
                        <Tag size={16} className="text-slate-400" />
                      )}
                      {item.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={item.active ? 'default' : 'secondary'}
                      className={
                        item.active
                          ? 'bg-green-100 text-green-700 hover:bg-green-200 border-0'
                          : 'bg-slate-200 text-slate-500'
                      }
                    >
                      {item.active ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-500">{item.count} productos</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {/* Editar */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-blue-600"
                      >
                        <Pencil size={16} />
                      </Button>

                      {/* Activar/Desactivar */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-8 w-8 ${item.active ? 'text-green-600 hover:text-green-700' : 'text-slate-400 hover:text-green-600'}`}
                        onClick={() => toggleStatus(item.id, type)}
                        title={item.active ? 'Desactivar' : 'Activar'}
                      >
                        <Power size={16} />
                      </Button>

                      {/* Eliminar */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-red-600"
                        onClick={() => deleteItem(item.id, type)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col space-y-6 max-w-5xl mx-auto p-6">
      {/* Header Página */}
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Gestión de Categorías</h2>
        <p className="text-muted-foreground">
          Configura las especies y tipos de productos disponibles en el sistema.
        </p>
      </div>

      <Tabs
        defaultValue="species"
        className="w-full flex-1 flex flex-col"
        onValueChange={setActiveTab}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          {/* Selector de Pestañas */}
          <TabsList className="bg-slate-100 p-1">
            <TabsTrigger
              value="species"
              className="gap-2 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <PawPrint size={16} />
              Especies
            </TabsTrigger>
            <TabsTrigger
              value="types"
              className="gap-2 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <Tag size={16} />
              Tipos de Producto
            </TabsTrigger>
          </TabsList>

          {/* Acciones Globales (Buscar + Crear) */}
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={activeTab === 'species' ? 'Buscar especie...' : 'Buscar tipo...'}
                className="pl-9 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700 shadow-sm">
              <Plus size={16} />
              {activeTab === 'species' ? 'Nueva Especie' : 'Nuevo Tipo'}
            </Button>
          </div>
        </div>

        {/* Contenido Pestaña Especies */}
        <TabsContent value="species" className="flex-1 mt-0">
          {renderTable(species, 'species')}
        </TabsContent>

        {/* Contenido Pestaña Tipos */}
        <TabsContent value="types" className="flex-1 mt-0">
          {renderTable(types, 'types')}
        </TabsContent>
      </Tabs>
    </div>
  )
}
