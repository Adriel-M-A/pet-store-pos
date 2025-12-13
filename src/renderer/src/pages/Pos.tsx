import { useState } from 'react'
import {
  Search,
  Trash2,
  Minus,
  Plus,
  CreditCard,
  Banknote,
  ShoppingCart,
  PackageX
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

// Tipos de Datos
interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
}

interface CartItem extends Product {
  quantity: number
}

// Datos Mock
const PRODUCTS: Product[] = [
  { id: '1', name: 'Royal Canin Adulto 3kg', category: 'PERRO', price: 45000, stock: 12 },
  { id: '2', name: 'Pipeta Frontline Plus', category: 'FARMACIA', price: 8500, stock: 45 },
  { id: '3', name: 'Rascador Torre 3 Niveles Gigante', category: 'GATO', price: 120000, stock: 3 },
  { id: '4', name: 'Alimento Conejo Premium', category: 'CONEJO', price: 15000, stock: 0 },
  { id: '5', name: 'Hueso de Goma Indestructible', category: 'JUGUETE', price: 3500, stock: 20 },
  { id: '6', name: 'Collar Antipulgas', category: 'PERRO', price: 12000, stock: 15 },
  { id: '7', name: 'Arena Sanitaria 5kg', category: 'GATO', price: 8000, stock: 30 },
  { id: '8', name: 'Shampoo Neutro', category: 'FARMACIA', price: 4500, stock: 10 },
  { id: '9', name: 'Pelota Tenis', category: 'JUGUETE', price: 2000, stock: 50 },
  { id: '10', name: 'Whiskas Sobres', category: 'GATO', price: 1500, stock: 100 }
]

const CATEGORIES = ['TODOS', 'PERRO', 'GATO', 'CONEJO', 'AVES', 'FARMACIA', 'JUGUETE', 'ACCESORIOS']

export default function Pos() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('TODOS')
  const [paymentMethod, setPaymentMethod] = useState('efectivo')

  // Filtros
  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'TODOS' || p.category === selectedCategory
    const hasStock = p.stock > 0
    return matchesSearch && matchesCategory && hasStock
  })

  // Lógica del Carrito
  const addToCart = (product: Product) => {
    if (product.stock <= 0) return
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id)
      if (existing) {
        if (existing.quantity >= product.stock) return current
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...current, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (id: string, delta: number) => {
    setCart((current) =>
      current.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta)
          if (delta > 0 && newQty > item.stock) return item
          return { ...item, quantity: newQty }
        }
        return item
      })
    )
  }

  const removeFromCart = (id: string) => {
    setCart((current) => current.filter((item) => item.id !== id))
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="flex h-full w-full">
      {/* PANEL IZQUIERDO: Catálogo */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        {/* HEADER (Buscador + Filtros) - Franja superior limpia */}
        <div className="px-6 py-4 flex flex-col gap-4 border-b border-slate-200 bg-white z-10">
          {/* Buscador */}
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              placeholder="Buscar producto..."
              className="pl-10 h-11 text-lg bg-slate-50 border-slate-200 focus-visible:bg-white focus-visible:ring-blue-500/20 transition-all rounded-lg"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Categorías (Carrusel) */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`
                    px-5 py-1.5 rounded-full text-xs font-bold tracking-wide whitespace-nowrap transition-all border
                    ${
                      selectedCategory === cat
                        ? 'bg-slate-800 text-white border-slate-800 shadow-md'
                        : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENIDO (Grilla) - Fondo Gris para contraste */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-200">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-300 gap-2">
              <PackageX size={64} strokeWidth={1} />
              <p className="font-medium">No hay productos disponibles</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="cursor-pointer transition-all duration-200 hover:border-purple-400 hover:shadow-lg group relative overflow-hidden flex flex-col bg-white border-slate-200 shadow-sm rounded-lg"
                  onClick={() => addToCart(product)}
                >
                  <CardContent className="p-3 flex flex-col h-full gap-2">
                    {/* Header Card: Cat + Stock */}
                    <div className="flex justify-between items-start">
                      <Badge className="text-[9px] px-1.5 h-5 bg-slate-100 text-slate-500 hover:bg-slate-200 shadow-none border border-slate-200">
                        {product.category}
                      </Badge>
                      <span
                        className={`text-[10px] font-bold ${product.stock < 5 ? 'text-orange-600' : 'text-slate-400'}`}
                      >
                        {product.stock} un.
                      </span>
                    </div>

                    {/* Nombre truncado */}
                    <h3
                      className="font-semibold text-sm leading-tight text-slate-700 truncate mb-1"
                      title={product.name}
                    >
                      {product.name}
                    </h3>

                    {/* Footer Card: Precio */}
                    <div className="mt-auto pt-2 border-t border-slate-50 text-right">
                      <span className="text-lg font-bold text-purple-600">
                        ${product.price.toLocaleString('es-AR')}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* PANEL DERECHO: TICKET - Separado por borde izquierdo */}
      <div className="w-[400px] flex flex-col bg-white border-l border-slate-200 h-full">
        {/* Header Ticket */}
        <div className="px-5 py-4 border-b border-slate-200 flex justify-between items-center bg-white h-[88px]">
          {' '}
          {/* Altura ajustada para alinear con header izquierdo */}
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            <ShoppingCart size={20} className="text-blue-600" />
            Ticket Actual
          </h2>
          <Badge variant="outline" className="bg-slate-50 border-slate-200 text-slate-600">
            {cart.length} items
          </Badge>
        </div>

        {/* Lista de Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-white">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-300 gap-3">
              <ShoppingCart size={48} strokeWidth={1} />
              <p className="text-sm">El carrito está vacío</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[1fr_auto_auto] gap-3 items-center p-3 rounded-lg bg-slate-50 border border-slate-100 transition-colors"
              >
                {/* Info (Nombre + Precios) */}
                <div className="min-w-0 flex flex-col">
                  <span className="font-semibold text-sm text-slate-700 truncate" title={item.name}>
                    {item.name}
                  </span>
                  <div className="text-xs text-slate-500 flex gap-2 mt-0.5">
                    <span>${item.price.toLocaleString()}</span>
                    <span className="font-bold text-purple-600">
                      Total: ${(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Contador (- 1 +) */}
                <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-md shadow-sm h-8 px-1">
                  <button
                    className="w-6 h-full flex items-center justify-center text-slate-400 hover:text-purple-600 hover:bg-slate-50 rounded-sm transition-colors"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-6 text-center text-sm font-bold text-slate-700 select-none">
                    {item.quantity}
                  </span>
                  <button
                    className="w-6 h-full flex items-center justify-center text-slate-400 hover:text-purple-600 hover:bg-slate-50 rounded-sm transition-colors"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    <Plus size={12} />
                  </button>
                </div>

                {/* Eliminar */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="h-8 w-8 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-white rounded-md transition-all"
                  title="Quitar"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        <Separator />

        {/* Zona de Cobro */}
        <div className="p-6 bg-slate-50 space-y-4 border-t border-slate-200">
          <div className="flex justify-between items-end">
            <span className="text-slate-500 font-medium">Total a Pagar</span>
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              ${total.toLocaleString('es-AR')}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <div className="relative">
                <select
                  className="w-full h-12 pl-3 pr-10 rounded-lg border border-slate-200 bg-white text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer shadow-sm"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="efectivo">Efectivo</option>
                  <option value="tarjeta">Tarjeta de Crédito/Débito</option>
                  <option value="transferencia">Transferencia</option>
                </select>
                <div className="absolute right-3 top-3.5 pointer-events-none text-slate-500">
                  <Banknote size={18} />
                </div>
              </div>
            </div>

            <Button
              className="col-span-2 h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 active:scale-[0.98] transition-all"
              disabled={cart.length === 0}
            >
              COBRAR
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
