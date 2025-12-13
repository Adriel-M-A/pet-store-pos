import { useState } from 'react'
import { Plus, Search, Filter, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

// Definición de Tipos
interface Product {
  id: string
  name: string
  category: 'Perro' | 'Gato' | 'Conejo' | 'Aves' | 'General'
  type: 'Alimento' | 'Accesorio' | 'Farmacia' | 'Juguete'
  price: number
  stock: number
}

// Datos Mock
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Royal Canin Adulto 3kg',
    category: 'Perro',
    type: 'Alimento',
    price: 45000,
    stock: 12
  },
  {
    id: '2',
    name: 'Pipeta Frontline Plus',
    category: 'Perro',
    type: 'Farmacia',
    price: 8500,
    stock: 45
  },
  {
    id: '3',
    name: 'Rascador Torre 3 Niveles',
    category: 'Gato',
    type: 'Accesorio',
    price: 120000,
    stock: 3
  },
  {
    id: '4',
    name: 'Alimento Conejo Premium',
    category: 'Conejo',
    type: 'Alimento',
    price: 15000,
    stock: 0
  },
  {
    id: '5',
    name: 'Juguete Hueso Goma',
    category: 'Perro',
    type: 'Juguete',
    price: 3500,
    stock: 20
  }
]

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState('')
  const [products] = useState<Product[]>(MOCK_PRODUCTS)

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Inventario</h2>
          <p className="text-muted-foreground">Gestiona el catálogo completo de productos.</p>
        </div>
        <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
          <Plus size={16} />
          Nuevo Producto
        </Button>
      </div>

      <div className="flex gap-2 items-center bg-white p-2 rounded-lg border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar producto..."
            className="pl-9 bg-transparent border-none shadow-none focus-visible:ring-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm" className="gap-2 text-muted-foreground">
          <Filter size={16} />
          Filtros
        </Button>
      </div>

      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Nombre</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead className="text-right">Precio</TableHead>
              <TableHead className="text-center">Stock</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium text-slate-700">{product.name}</TableCell>

                {/* Categoría: Mayúsculas */}
                <TableCell>
                  <Badge className="font-semibold text-[10px] bg-slate-100 text-slate-600 hover:bg-slate-200 border-0 shadow-none">
                    {product.category.toUpperCase()}
                  </Badge>
                </TableCell>

                {/* Tipo: Mayúsculas */}
                <TableCell className="text-muted-foreground text-xs font-semibold">
                  {product.type.toUpperCase()}
                </TableCell>

                <TableCell className="text-right font-semibold">
                  ${product.price.toLocaleString('es-AR')}
                </TableCell>

                {/* Stock: Solo número, negrita y color */}
                <TableCell className="text-center">
                  <span
                    className={`font-bold ${
                      product.stock === 0
                        ? 'text-red-600'
                        : product.stock < 5
                          ? 'text-orange-500'
                          : 'text-green-600'
                    }`}
                  >
                    {product.stock}
                  </span>
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400 hover:text-blue-600"
                      title="Editar"
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400 hover:text-red-600"
                      title="Eliminar"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
