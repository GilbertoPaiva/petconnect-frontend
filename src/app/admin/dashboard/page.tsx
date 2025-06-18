'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { adminService, securityService } from '@/infrastructure/api/services';
import { useAuthStore } from '@/application/stores/useAuthStore';
import { 
  UserResponse, 
  AdminDashboardData, 
  SecurityStats, 
  SecurityAuditLog,
  UserType 
} from '@/domain/types';
import { 
  Users, 
  Shield, 
  AlertTriangle, 
  Search, 
  Eye,
  Ban,
  CheckCircle,
  Activity,
  TrendingUp,
  UserCheck,
  UserX
} from 'lucide-react';

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<AdminDashboardData | null>(null);
  const [securityStats, setSecurityStats] = useState<SecurityStats | null>(null);
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [recentLogs, setRecentLogs] = useState<SecurityAuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserType, setSelectedUserType] = useState<string>('');
  const [showUserDetails, setShowUserDetails] = useState<UserResponse | null>(null);

  const { user } = useAuthStore();

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const [dashboard, security, usersData, auditLogs] = await Promise.all([
        adminService.getDashboard(),
        securityService.getSecurityStats(),
        adminService.getUsers(),
        securityService.getAuditLogs(0, 10)
      ]);

      setDashboardData(dashboard);
      setSecurityStats(security);
      setUsers(usersData.content);
      setRecentLogs(auditLogs.content);
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleUserStatus = async (userId: string) => {
    try {
      const updatedUser = await adminService.toggleUserStatus(userId);
      setUsers(users.map(u => u.id === userId ? updatedUser : u));
    } catch (error) {
      console.error('Erro ao alterar status do usuário:', error);
    }
  };

  const handleViewUserDetails = async (userId: string) => {
    try {
      const userDetails = await adminService.getUserDetails(userId);
      setShowUserDetails(userDetails);
    } catch (error) {
      console.error('Erro ao carregar detalhes do usuário:', error);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedUserType === '' || user.userType === selectedUserType;
    return matchesSearch && matchesType;
  });

  const getEventTypeColor = (eventType: string) => {
    switch (eventType) {
      case 'LOGIN_SUCCESS': return 'text-green-600 bg-green-100';
      case 'LOGIN_FAILURE': return 'text-red-600 bg-red-100';
      case 'SECURITY_VIOLATION': return 'text-red-600 bg-red-100';
      case 'UNAUTHORIZED_ACCESS': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

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
                Dashboard Administrativo
              </h1>
              <p className="text-gray-600">Painel de controle do sistema Pet Connect</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Total de Usuários</h3>
                <p className="text-3xl font-bold text-blue-600">{dashboardData?.totalUsers || 0}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Activity className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Eventos (24h)</h3>
                <p className="text-3xl font-bold text-green-600">{securityStats?.totalEvents24h || 0}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Falhas Login</h3>
                <p className="text-3xl font-bold text-red-600">{securityStats?.failedLogins24h || 0}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Violações</h3>
                <p className="text-3xl font-bold text-purple-600">{securityStats?.securityViolations24h || 0}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* User Type Distribution */}
        {dashboardData && (
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Distribuição de Usuários</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(dashboardData.userCounts).map(([type, count]) => (
                <div key={type} className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                  <p className="text-sm text-gray-600">{type}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Users Management */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Gerenciamento de Usuários</h2>
            
            <div className="space-y-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Buscar usuários..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                value={selectedUserType}
                onChange={(e) => setSelectedUserType(e.target.value)}
              >
                <option value="">Todos os tipos</option>
                <option value="ADMIN">Administrador</option>
                <option value="LOJISTA">Lojista</option>
                <option value="TUTOR">Tutor</option>
                <option value="VETERINARIO">Veterinário</option>
              </select>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{user.fullName}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {user.userType}
                      </span>
                      {user.active ? (
                        <UserCheck className="h-4 w-4 text-green-600" />
                      ) : (
                        <UserX className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewUserDetails(user.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleUserStatus(user.id)}
                    >
                      {user.active ? (
                        <Ban className="h-4 w-4 text-red-600" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Security Events */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Eventos de Segurança Recentes</h2>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {recentLogs.map((log) => (
                <div key={log.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs px-2 py-1 rounded ${getEventTypeColor(log.eventType)}`}>
                      {log.eventType}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(log.eventTimestamp).toLocaleString()}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-900 mb-1">{log.eventDescription}</p>
                  
                  <div className="text-xs text-gray-500 space-y-1">
                    {log.userIdentifier && (
                      <p>Usuário: {log.userIdentifier}</p>
                    )}
                    {log.ipAddress && (
                      <p>IP: {log.ipAddress}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* User Details Modal */}
      {showUserDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Detalhes do Usuário</h3>
              <Button
                variant="ghost"
                onClick={() => setShowUserDetails(null)}
              >
                ✕
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
                  <p className="mt-1 text-sm text-gray-900">{showUserDetails.fullName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-sm text-gray-900">{showUserDetails.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tipo de Usuário</label>
                  <p className="mt-1 text-sm text-gray-900">{showUserDetails.userType}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <p className={`mt-1 text-sm ${showUserDetails.active ? 'text-green-600' : 'text-red-600'}`}>
                    {showUserDetails.active ? 'Ativo' : 'Inativo'}
                  </p>
                </div>
                {showUserDetails.nome && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nome</label>
                    <p className="mt-1 text-sm text-gray-900">{showUserDetails.nome}</p>
                  </div>
                )}
                {showUserDetails.location && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Localização</label>
                    <p className="mt-1 text-sm text-gray-900">{showUserDetails.location}</p>
                  </div>
                )}
                {showUserDetails.contactNumber && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Telefone</label>
                    <p className="mt-1 text-sm text-gray-900">{showUserDetails.contactNumber}</p>
                  </div>
                )}
                {showUserDetails.cnpj && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">CNPJ</label>
                    <p className="mt-1 text-sm text-gray-900">{showUserDetails.cnpj}</p>
                  </div>
                )}
                {showUserDetails.crmv && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">CRMV</label>
                    <p className="mt-1 text-sm text-gray-900">{showUserDetails.crmv}</p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Criado em</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(showUserDetails.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Atualizado em</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(showUserDetails.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
