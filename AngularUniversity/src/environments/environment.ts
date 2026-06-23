// ATENÇÃO: a Universities API só está disponível via HTTP (sem TLS).
// Se este app for hospedado em um domínio HTTPS (GitHub Pages, Vercel, etc.),
// o navegador pode bloquear a requisição por "mixed content".
// Nesse caso, rode localmente com `ng serve` (http://localhost) ou veja
// a seção de Troubleshooting no README.
export const environment = {
  production: false,
  apiUrl: 'http://universities.hipolabs.com/search',
};
