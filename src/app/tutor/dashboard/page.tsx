'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/application/stores/useAuthStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, Search, Star, MapPin, Phone, Filter } from 'lucide-react';
import { Produto } from '@/domain/entities/Produto';
import { Servico } from '@/domain/entities/Servico';
import { formatCurrency } from '@/shared/utils';

export default function TutorDashboard() {
  const { user } = useAuthStore();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'produtos' | 'servicos'>('produtos');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      // TODO: Implementar chamadas reais para API
      // const [produtosData, servicosData] = await Promise.all([
      //   apiService.get('/api/tutor/produtos'),
      //   apiService.get('/api/tutor/servicos')
      // ]);

      // Mock data para demonstração
      const mockProdutos: Produto[] = [
        {
          id: '1',
          lojistaId: '1',
          nome: 'Ração Premium para Cães Adultos',
          description: 'Ração super premium com ingredientes naturais para cães adultos de todas as raças.',
          price: 89.90,
          photoUrl: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400',
          unitOfMeasure: 'kg',
          createdAt: '2025-01-01T00:00:00Z',
          updatedAt: '2025-01-01T00:00:00Z',
        },
        {
          id: '2',
          lojistaId: '2',
          nome: 'Brinquedo Mordedor para Cães',
          description: 'Brinquedo resistente e seguro para entreter seu cão.',
          price: 24.99,
          photoUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400',
          unitOfMeasure: 'unidade',
          createdAt: '2025-01-01T00:00:00Z',
          updatedAt: '2025-01-01T00:00:00Z',
        },
        {
          id: '3',
          lojistaId: '1',
          nome: 'Coleira Antipulgas para Gatos',
          description: 'Proteção eficaz contra pulgas e carrapatos por até 8 meses.',
          price: 45.50,
          photoUrl: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=400',
          unitOfMeasure: 'unidade',
          createdAt: '2025-01-01T00:00:00Z',
          updatedAt: '2025-01-01T00:00:00Z',
        },
      ];

      const mockServicos: Servico[] = [
        {
          id: '1',
          veterinarioId: '1',
          nome: 'Consulta Veterinária',
          description: 'Consulta completa com exame clínico geral e orientações.',
          price: 120.00,
          createdAt: '2025-01-01T00:00:00Z',
          updatedAt: '2025-01-01T00:00:00Z',
        },
        {
          id: '2',
          veterinarioId: '2',
          nome: 'Vacinação Completa',
          description: 'Aplicação de vacinas múltiplas com cartão de vacinação.',
          price: 80.00,
          createdAt: '2025-01-01T00:00:00Z',
          updatedAt: '2025-01-01T00:00:00Z',
        },
        {
          id: '3',
          veterinarioId: '1',
          nome: 'Cirurgia de Castração',
          description: 'Procedimento cirúrgico completo com acompanhamento pós-operatório.',
          price: 350.00,
          createdAt: '2025-01-01T00:00:00Z',
          updatedAt: '2025-01-01T00:00:00Z',
        },
      ];

      setProdutos(mockProdutos);
      setServicos(mockServicos);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProdutos = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    produto.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredServicos = servicos.filter(servico =>
    servico.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    servico.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Carregando seu dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Heart className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Pet Connect</h1>
                <p className="text-sm text-gray-600">Dashboard do Tutor</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Olá, {user?.fullName}</span>
              <Button variant="outline" size="sm">
                Perfil
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo ao Pet Connect! 🐾
          </h2>
          <p className="text-gray-600">
            Encontre os melhores produtos e serviços para seu pet
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar produtos ou serviços..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={activeTab === 'produtos' ? 'default' : 'outline'}
                onClick={() => setActiveTab('produtos')}
              >
                Produtos ({produtos.length})
              </Button>
              <Button
                variant={activeTab === 'servicos' ? 'default' : 'outline'}
                onClick={() => setActiveTab('servicos')}
              >
                Serviços ({servicos.length})
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'produtos' ? (
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Produtos Disponíveis
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProdutos.map((produto) => (
                <Card key={produto.id} className="hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                    {produto.photoUrl ? (
                      <img
                        src={produto.photoUrl}
                        alt={produto.nome}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Heart className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{produto.nome}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {produto.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-green-600">
                        {formatCurrency(produto.price)}
                      </div>
                      <div className="text-sm text-gray-500">
                        por {produto.unitOfMeasure}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                      <MapPin className="h-4 w-4" />
                      <span>Loja {produto.lojistaId}</span>
                    </div>
                    <Button className="w-full">
                      Ver Detalhes
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Serviços Disponíveis
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServicos.map((servico) => (
                <Card key={servico.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Heart className="h-5 w-5 text-green-600" />
                      <span>{servico.nome}</span>
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {servico.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-green-600">
                        {formatCurrency(servico.price)}
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-500">4.8</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                      <Phone className="h-4 w-4" />
                      <span>Dr. Veterinário {servico.veterinarioId}</span>
                    </div>
                    <Button className="w-full">
                      Agendar Consulta
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {((activeTab === 'produtos' && filteredProdutos.length === 0) ||
          (activeTab === 'servicos' && filteredServicos.length === 0)) && (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhum {activeTab === 'produtos' ? 'produto' : 'serviço'} encontrado
            </h3>
            <p className="text-gray-600">
              Tente ajustar os filtros de busca ou explore outras categorias
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
