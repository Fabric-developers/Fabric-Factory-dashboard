"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Search, Package } from "lucide-react"

interface Fabric {
  id: string
  name: string
  code: string
  category: string
  color: string
  width: number
  weight: number
  price: number
  stock: number
  description: string
  status: "in-stock" | "low-stock" | "out-of-stock"
  createdAt: string
}

export default function FabricsPage() {
  const [fabrics, setFabrics] = useState<Fabric[]>([
    {
      id: "1",
      name: "Premium Cotton",
      code: "PC001",
      category: "Cotton Fabrics",
      color: "White",
      width: 150,
      weight: 200,
      price: 25.5,
      stock: 120,
      description: "High-quality premium cotton fabric",
      status: "in-stock",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Silk Blend",
      code: "SB002",
      category: "Silk Collection",
      color: "Cream",
      width: 140,
      weight: 180,
      price: 45.0,
      stock: 15,
      description: "Luxurious silk blend material",
      status: "low-stock",
      createdAt: "2024-01-12",
    },
    {
      id: "3",
      name: "Wool Mix",
      code: "WM003",
      category: "Wool Blends",
      color: "Gray",
      width: 160,
      weight: 300,
      price: 35.75,
      stock: 0,
      description: "Warm wool blend for winter garments",
      status: "out-of-stock",
      createdAt: "2024-01-10",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingFabric, setEditingFabric] = useState<Fabric | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    category: "",
    color: "",
    width: "",
    weight: "",
    price: "",
    stock: "",
    description: "",
  })

  const categories = ["Cotton Fabrics", "Silk Collection", "Wool Blends", "Synthetic Fabrics"]

  const filteredFabrics = fabrics.filter(
    (fabric) =>
      fabric.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fabric.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fabric.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStockStatus = (stock: number): "in-stock" | "low-stock" | "out-of-stock" => {
    if (stock === 0) return "out-of-stock"
    if (stock < 20) return "low-stock"
    return "in-stock"
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const stock = Number.parseInt(formData.stock)
    const fabricData = {
      name: formData.name,
      code: formData.code,
      category: formData.category,
      color: formData.color,
      width: Number.parseInt(formData.width),
      weight: Number.parseInt(formData.weight),
      price: Number.parseFloat(formData.price),
      stock,
      description: formData.description,
      status: getStockStatus(stock),
    }

    if (editingFabric) {
      setFabrics((prev) =>
        prev.map((fabric) => (fabric.id === editingFabric.id ? { ...fabric, ...fabricData } : fabric)),
      )
    } else {
      const newFabric: Fabric = {
        id: Date.now().toString(),
        ...fabricData,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setFabrics((prev) => [...prev, newFabric])
    }

    setIsDialogOpen(false)
    setEditingFabric(null)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      category: "",
      color: "",
      width: "",
      weight: "",
      price: "",
      stock: "",
      description: "",
    })
  }

  const handleEdit = (fabric: Fabric) => {
    setEditingFabric(fabric)
    setFormData({
      name: fabric.name,
      code: fabric.code,
      category: fabric.category,
      color: fabric.color,
      width: fabric.width.toString(),
      weight: fabric.weight.toString(),
      price: fabric.price.toString(),
      stock: fabric.stock.toString(),
      description: fabric.description,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setFabrics((prev) => prev.filter((fabric) => fabric.id !== id))
  }

  const openCreateDialog = () => {
    setEditingFabric(null)
    resetForm()
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fabric Management</h1>
          <p className="text-muted-foreground">Manage your fabric inventory and track stock levels</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Add Fabric
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>{editingFabric ? "Edit Fabric" : "Add New Fabric"}</DialogTitle>
                <DialogDescription>
                  {editingFabric ? "Update the fabric information below." : "Add a new fabric to your inventory."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Fabric Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Premium Cotton"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="code">Fabric Code</Label>
                    <Input
                      id="code"
                      value={formData.code}
                      onChange={(e) => setFormData((prev) => ({ ...prev, code: e.target.value }))}
                      placeholder="e.g., PC001"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="color">Color</Label>
                    <Input
                      id="color"
                      value={formData.color}
                      onChange={(e) => setFormData((prev) => ({ ...prev, color: e.target.value }))}
                      placeholder="e.g., White"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="width">Width (cm)</Label>
                    <Input
                      id="width"
                      type="number"
                      value={formData.width}
                      onChange={(e) => setFormData((prev) => ({ ...prev, width: e.target.value }))}
                      placeholder="150"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (gsm)</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={formData.weight}
                      onChange={(e) => setFormData((prev) => ({ ...prev, weight: e.target.value }))}
                      placeholder="200"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price per meter ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                      placeholder="25.50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock Quantity</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData((prev) => ({ ...prev, stock: e.target.value }))}
                      placeholder="120"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe this fabric..."
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">{editingFabric ? "Update Fabric" : "Add Fabric"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fabrics</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fabrics.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Stock</CardTitle>
            <Package className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fabrics.filter((f) => f.status === "in-stock").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <Package className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fabrics.filter((f) => f.status === "low-stock").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <Package className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fabrics.filter((f) => f.status === "out-of-stock").length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fabric Inventory</CardTitle>
          <CardDescription>Manage your fabric stock and pricing</CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search fabrics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead className="hidden sm:table-cell">Color</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFabrics.map((fabric) => (
                <TableRow key={fabric.id}>
                  <TableCell className="font-medium">{fabric.name}</TableCell>
                  <TableCell>{fabric.code}</TableCell>
                  <TableCell className="hidden md:table-cell">{fabric.category}</TableCell>
                  <TableCell className="hidden sm:table-cell">{fabric.color}</TableCell>
                  <TableCell>${fabric.price.toFixed(2)}</TableCell>
                  <TableCell>{fabric.stock}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        fabric.status === "in-stock"
                          ? "default"
                          : fabric.status === "low-stock"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {fabric.status.replace("-", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(fabric)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(fabric.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
