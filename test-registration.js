// Script para testar o cadastro no navegador
console.log('Iniciando teste de cadastro...');

// Simula o preenchimento do formulário
const testRegistration = async () => {
  // Dados de teste
  const testData = {
    username: 'testeabcde',
    email: 'testeabcde@example.com',
    password: 'MyStr0ngP@ssw0rd',
    fullName: 'Teste ABC DE',
    userType: 'TUTOR',
    securityQuestion1: 'Qual o nome do seu primeiro animal de estimação?',
    securityAnswer1: 'Rex',
    securityQuestion2: 'Qual o nome da cidade onde você nasceu?',
    securityAnswer2: 'São Paulo',
    securityQuestion3: 'Qual o nome da sua mãe?',
    securityAnswer3: 'Maria'
  };

  try {
    // Fazer requisição direta para o backend
    const response = await fetch('http://localhost:8080/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    console.log('Resposta do servidor:', result);

    if (result.success) {
      console.log('✅ Cadastro realizado com sucesso!');
      console.log('Token recebido:', result.data.accessToken);
      console.log('Usuário:', result.data.user);
    } else {
      console.log('❌ Erro no cadastro:', result.error);
    }
  } catch (error) {
    console.error('❌ Erro na requisição:', error);
  }
};

// Executar o teste
testRegistration();
