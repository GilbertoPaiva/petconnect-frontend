'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { veterinarioService } from '@/infrastructure/api/services';
import { useAuthStore } from '@/application/stores/useAuthStore';
import { Servico, CreateServicoRequest } from '@/domain/types';
import { 
  Plus, 
  Search, 
  Stethoscope, 
  Calendar, 
  DollarSign,
  Edit2,
  Trash2,
  TrendingUp
} from 'lucide-react';

export default function VeterinarioDashboard() {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingServico, setEditingServico] = useState<Servico | null>(null);
  const [stats, setStats] = useState({
    totalServicos: 0,
    servicosHoje: 0,
    receitaMensal: 0
  });

  const { user } = useAuthStore();

  const [formData, setFormData] = useState<CreateServicoRequest>({
    veterinarioId: user?.id || '',
    nome: '',
    description: '',
    price: 0
  });

  useEffect(() => {
    if (user?.id) {
      loadDashboard();
    }
  }, [user?.id]);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const [dashboardData, servicosData] = await Promise.all([
        veterinarioService.getDashboard(user!.id),
        veterinarioService.getServicos(user!.id)
      ]);

      setServicos(servicosData);
      setStats({
        totalServicos: servicosData.length,
        servicosHoje: servicosData.filter(s => 
          new Date(s.createdAt).toDateString() === new Date().toDateString()
        ).length,
        receitaMensal: servicosData.reduce((total, s) => total + s.price, 0)
      });
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateServico = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingServico) {
        await veterinarioService.updateServico(user!.id, editingServico.id, formData);
      } else {
        await veterinarioService.createServico(user!.id, formData);
      }
      
      setShowCreateForm(false);
      setEditingServico(null);
      setFormData({
        veterinarioId: user?.id || '',
        nome: '',
        description: '',
        price: 0
      });
      loadDashboard();
    } catch (error) {
      console.error('Erro ao salvar serviço:', error);
    }
  };

  const handleEditServico = (servico: Servico) => {
    setEditingServico(servico);
    setFormData({
      veterinarioId: servico.veterinarioId,
      nome: servico.nome,
      description: servico.description,
      price: servico.price
    });
    setShowCreateForm(true);
  };

  const handleDeleteServico = async (servicoId: string) => {
    if (confirm('Tem certeza que deseja excluir este serviço?')) {
      try {
        await veterinarioService.deleteServico(user!.id, servicoId);
        loadDashboard();
      } catch (error) {
        console.error('Erro ao excluir serviço:', error);
      }
    }
  };

  const filteredServicos = servicos.filter(servico =>
    servico.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    servico.description.toLowerCase().includes(searchTerm.toLowerCase())
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
                Dashboard Veterinário
              </h1>
              <p className="text-gray-600">Bem-vindo de volta, Dr. {user?.fullName}</p>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <Button 
                onClick={() => setShowCreateForm(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Novo Serviço
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
                <Stethoscope className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Total de Serviços</h3>
                <p className="text-3xl font-bold text-blue-600">{stats.totalServicos}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Serviços Hoje</h3>
                <p className="text-3xl font-bold text-green-600">{stats.servicosHoje}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Receita Potencial</h3>
                <p className="text-3xl font-bold text-purple-600">
                  R$ {stats.receitaMensal.toFixed(2)}
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
                  placeholder="Buscar serviços..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Services List */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Meus Serviços</h2>
          
          {filteredServicos.length === 0 ? (
            <div className="text-center py-12">
              <Stethoscope className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum serviço encontrado</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm ? 'Tente buscar com outros termos.' : 'Comece criando seu primeiro serviço.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServicos.map((servico) => (
                <Card key={servico.id} className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-900">{servico.nome}</h3>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditServico(servico)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteServico(servico.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {servico.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-green-600">
                      R$ {servico.price.toFixed(2)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(servico.createdAt).toLocaleDateString()}
                    </span>
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
          <Card className="w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">
              {editingServico ? 'Editar Serviço' : 'Novo Serviço'}
            </h3>
            
            <form onSubmit={handleCreateServico} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Serviço
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

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowCreateForm(false);
                    setEditingServico(null);
                    setFormData({
                      veterinarioId: user?.id || '',
                      nome: '',
                      description: '',
                      price: 0
                    });
                  }}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1">
                  {editingServico ? 'Atualizar' : 'Criar'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
