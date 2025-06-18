export default function TestPage() {
  return (
    <div className="min-h-screen bg-blue-500 p-8">
      <h1 className="text-4xl font-bold text-white mb-4">Teste do Tailwind CSS</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Se você está vendo estilos, o CSS está funcionando!</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-red-500 h-20 rounded"></div>
          <div className="bg-green-500 h-20 rounded"></div>
          <div className="bg-purple-500 h-20 rounded"></div>
        </div>
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
          Botão de Teste
        </button>
      </div>
    </div>
  );
}
