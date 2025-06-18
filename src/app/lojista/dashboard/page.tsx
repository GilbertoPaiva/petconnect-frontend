'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { produtoService } from '@/infrastructure/api/services';
import { useAuthStore } from '@/application/stores/useAuthStore';
import { Produto, CreateProdutoRequest } from '@/domain/types';
import { 
  Plus, 
  Search, 
  Package, 
  DollarSign, 
  TrendingUp,
  Edit2,
  Trash2,
  ShoppingBag,
  FileImage
} from 'lucide-react';

export default function LojistaDashboard() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingProduto, setEditingProduto] = useState<Produto | null>(null);
  const [stats, setStats] = useState({
    totalProdutos: 0,
    produtosAdicionadosHoje: 0,
    valorTotalEstoque: 0
  });

  const { user } = useAuthStore();

  const [formData, setFormData] = useState<CreateProdutoRequest>({
    lojistaId: user?.id || '',
    nome: '',
    description: '',
    price: 0,
    photoUrl: '',
    unitOfMeasure: 'unidade'
  });

  useEffect(() => {
    if (user?.id) {
      loadDashboard();
    }
  }, [user?.id]);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const produtosData = await produtoService.getByLojista(user!.id);

      setProdutos(produtosData);
      setStats({
        totalProdutos: produtosData.length,
        produtosAdicionadosHoje: produtosData.filter(p => 
          new Date(p.createdAt).toDateString() === new Date().toDateString()
        ).length,
        valorTotalEstoque: produtosData.reduce((total, p) => total + p.price, 0)
      });
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduto = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduto) {
        await produtoService.update(editingProduto.id, formData);
      } else {
        await produtoService.create(formData);
      }
      
      setShowCreateForm(false);
      setEditingProduto(null);
      setFormData({
        lojistaId: user?.id || '',
        nome: '',
        description: '',
        price: 0,
        photoUrl: '',
        unitOfMeasure: 'unidade'
      });
      loadDashboard();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    }
  };

  const handleEditProduto = (produto: Produto) => {
    setEditingProduto(produto);
    setFormData({
      lojistaId: produto.lojistaId,
      nome: produto.nome,
      description: produto.description,
      price: produto.price,
      photoUrl: produto.photoUrl || '',
      unitOfMeasure: produto.unitOfMeasure
    });
    setShowCreateForm(true);
  };

  const handleDeleteProduto = async (produtoId: string) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await produtoService.delete(produtoId);
        loadDashboard();
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
      }
    }
  };

  const filteredProdutos = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    produto.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-gray-900">
                Dashboard Lojista
              </h1>
              <p className="text-gray-600">Bem-vindo de volta, {user?.fullName}</p>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <Button 
                onClick={() => setShowCreateForm(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Novo Produto
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Package className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Total de Produtos</h3>
                <p className="text-3xl font-bold text-blue-600">{stats.totalProdutos}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Adicionados Hoje</h3>
                <p className="text-3xl font-bold text-green-600">{stats.produtosAdicionadosHoje}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Valor Total</h3>
                <p className="text-3xl font-bold text-purple-600">
                  R$ {stats.valorTotalEstoque.toFixed(2)}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Products List */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Meus Produtos</h2>
          
          {filteredProdutos.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum produto encontrado</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm ? 'Tente buscar com outros termos.' : 'Comece adicionando seu primeiro produto.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProdutos.map((produto) => (
                <Card key={produto.id} className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-900">{produto.nome}</h3>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditProduto(produto)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteProduto(produto.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {produto.photoUrl ? (
                    <img 
                      src={produto.photoUrl} 
                      alt={produto.nome}
                      className="w-full h-32 object-cover rounded-md mb-3"
                    />
                  ) : (
                    <div className="w-full h-32 bg-gray-200 rounded-md mb-3 flex items-center justify-center">
                      <FileImage className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {produto.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-green-600">
                      R$ {produto.price.toFixed(2)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {produto.unitOfMeasure}
                    </span>
                  </div>
                  
                  <div className="text-xs text-gray-500 mt-2">
                    Adicionado em {new Date(produto.createdAt).toLocaleDateString()}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Create/Edit Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {editingProduto ? 'Editar Produto' : 'Novo Produto'}
            </h3>
            
            <form onSubmit={handleCreateProduto} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Produto
                </label>
                <Input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preço (R$)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unidade de Medida
                </label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  value={formData.unitOfMeasure}
                  onChange={(e) => setFormData({ ...formData, unitOfMeasure: e.target.value })}
                >
                  <option value="unidade">Unidade</option>
                  <option value="kg">Quilograma</option>
                  <option value="g">Grama</option>
                  <option value="litro">Litro</option>
                  <option value="ml">Mililitro</option>
                  <option value="pacote">Pacote</option>
                  <option value="caixa">Caixa</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL da Foto (opcional)
                </label>
                <Input
                  type="url"
                  value={formData.photoUrl}
                  onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                  placeholder="https://exemplo.com/foto.jpg"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowCreateForm(false);
                    setEditingProduto(null);
                    setFormData({
                      lojistaId: user?.id || '',
                      nome: '',
                      description: '',
                      price: 0,
                      photoUrl: '',
                      unitOfMeasure: 'unidade'
                    });
                  }}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1">
                  {editingProduto ? 'Atualizar' : 'Criar'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
