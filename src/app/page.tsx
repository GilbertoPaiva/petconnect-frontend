import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Shield, Users, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Pet Connect</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#sobre" className="text-gray-600 hover:text-blue-600 transition">
              Sobre
            </Link>
            <Link href="#funcionalidades" className="text-gray-600 hover:text-blue-600 transition">
              Funcionalidades
            </Link>
            <Link href="#contato" className="text-gray-600 hover:text-blue-600 transition">
              Contato
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="outline">Entrar</Button>
            </Link>
            <Link href="/register">
              <Button>Cadastrar</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Conectando o mundo
            <span className="text-blue-600"> Pet</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A plataforma completa que conecta tutores, veterinários, lojistas e administradores 
            no universo pet. Encontre produtos, serviços e cuidados para seu melhor amigo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Começar Agora
              </Button>
            </Link>
            <Link href="#sobre">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Saiba Mais
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="funcionalidades" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Para cada tipo de usuário
            </h2>
            <p className="text-xl text-gray-600">
              Soluções personalizadas para atender todas as necessidades do mundo pet
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-xl">Tutores</CardTitle>
                <CardDescription>
                  Encontre os melhores produtos e serviços para seu pet
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Busca por produtos e serviços</li>
                  <li>• Avaliações e comentários</li>
                  <li>• Dashboard personalizado</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-xl">Veterinários</CardTitle>
                <CardDescription>
                  Gerencie seus serviços e atenda mais pacientes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Cadastro de serviços</li>
                  <li>• Gestão de consultas</li>
                  <li>• Relatórios detalhados</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Star className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-xl">Lojistas</CardTitle>
                <CardDescription>
                  Venda seus produtos para milhares de tutores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Catálogo de produtos</li>
                  <li>• Gestão de estoque</li>
                  <li>• Analytics de vendas</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <CardTitle className="text-xl">Administradores</CardTitle>
                <CardDescription>
                  Supervisione toda a plataforma com eficiência
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Gestão de usuários</li>
                  <li>• Métricas da plataforma</li>
                  <li>• Controle de qualidade</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Tecnologia de ponta para o cuidado pet
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Desenvolvido com as melhores práticas de arquitetura de software, 
                seguindo os princípios SOLID e Clean Architecture para garantir 
                qualidade, segurança e escalabilidade.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Interface responsiva e intuitiva</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Segurança de dados garantida</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Suporte técnico especializado</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600">1000+</div>
                  <div className="text-gray-600">Pets Felizes</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">500+</div>
                  <div className="text-gray-600">Veterinários</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600">200+</div>
                  <div className="text-gray-600">Lojistas</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-600">5000+</div>
                  <div className="text-gray-600">Produtos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6" />
                <span className="text-xl font-bold">Pet Connect</span>
              </div>
              <p className="text-gray-400">
                Conectando o mundo pet com tecnologia e carinho.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition">Funcionalidades</Link></li>
                <li><Link href="#" className="hover:text-white transition">Preços</Link></li>
                <li><Link href="#" className="hover:text-white transition">API</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition">Documentação</Link></li>
                <li><Link href="#" className="hover:text-white transition">Contato</Link></li>
                <li><Link href="#" className="hover:text-white transition">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition">Sobre</Link></li>
                <li><Link href="#" className="hover:text-white transition">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition">Carreiras</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Pet Connect. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
