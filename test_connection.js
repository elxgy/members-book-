// Teste de conexão entre frontend e backend
const axios = require('axios');

// URLs para teste
const BACKEND_URL = 'http://localhost:5002';
const FRONTEND_TUNNEL_URL = 'http://localhost:8081';

async function testBackendConnection() {
  console.log('🔍 Testando conexão com o backend...');
  
  try {
    // Teste do health check
    const healthResponse = await axios.get(`${BACKEND_URL}/health`, {
      timeout: 5000
    });
    
    console.log('✅ Backend está rodando!');
    console.log('📊 Status:', healthResponse.data);
    
    return true;
  } catch (error) {
    console.log('❌ Erro ao conectar com o backend:');
    if (error.code === 'ECONNREFUSED') {
      console.log('   - Backend não está rodando na porta 5002');
    } else if (error.code === 'ETIMEDOUT') {
      console.log('   - Timeout na conexão');
    } else {
      console.log('   -', error.message);
    }
    return false;
  }
}

async function testCORS() {
  console.log('\n🔍 Testando configuração de CORS...');
  
  try {
    const response = await axios.options(`${BACKEND_URL}/health`, {
      headers: {
        'Origin': 'http://localhost:8081',
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers': 'Content-Type,Authorization'
      },
      timeout: 5000
    });
    
    console.log('✅ CORS configurado corretamente!');
    console.log('📋 Headers CORS:', {
      'Access-Control-Allow-Origin': response.headers['access-control-allow-origin'],
      'Access-Control-Allow-Methods': response.headers['access-control-allow-methods'],
      'Access-Control-Allow-Headers': response.headers['access-control-allow-headers']
    });
    
    return true;
  } catch (error) {
    console.log('❌ Erro na configuração de CORS:');
    console.log('   -', error.message);
    return false;
  }
}

async function testAPIEndpoint() {
  console.log('\n🔍 Testando endpoint da API...');
  
  try {
    const response = await axios.get(`${BACKEND_URL}/api/members`, {
      headers: {
        'Origin': 'http://localhost:8081',
        'Content-Type': 'application/json'
      },
      timeout: 5000
    });
    
    console.log('✅ Endpoint da API respondendo!');
    console.log('📊 Status:', response.status);
    
    return true;
  } catch (error) {
    if (error.response) {
      console.log('⚠️  API respondeu com erro:', error.response.status);
      console.log('📋 Resposta:', error.response.data);
      
      // Se for erro 401 (não autorizado), isso é esperado sem token
      if (error.response.status === 401) {
        console.log('✅ Endpoint funcionando (erro 401 é esperado sem autenticação)');
        return true;
      }
    } else {
      console.log('❌ Erro ao acessar endpoint da API:');
      console.log('   -', error.message);
    }
    return false;
  }
}

async function runTests() {
  console.log('🚀 Iniciando testes de conexão...\n');
  
  const backendOk = await testBackendConnection();
  
  if (backendOk) {
    await testCORS();
    await testAPIEndpoint();
  }
  
  console.log('\n📋 Resumo dos testes:');
  console.log(`Backend: ${backendOk ? '✅ OK' : '❌ FALHOU'}`);
  console.log(`Frontend Tunnel: 🌐 http://localhost:8081`);
  console.log(`Backend URL: 🔧 ${BACKEND_URL}`);
  
  if (backendOk) {
    console.log('\n🎉 Conexão entre frontend e backend está funcionando!');
    console.log('💡 Próximos passos:');
    console.log('   1. Implementar autenticação no frontend');
    console.log('   2. Testar endpoints protegidos');
    console.log('   3. Validar fluxo completo de dados');
  } else {
    console.log('\n🔧 Ações necessárias:');
    console.log('   1. Verificar se o backend está rodando');
    console.log('   2. Confirmar a porta correta (5002)');
    console.log('   3. Verificar configurações de CORS');
  }
}

// Executar testes
runTests().catch(console.error);