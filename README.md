# 🎮 Game Hub

> Plataforma de organização e descoberta de jogos — gerencie sua biblioteca pessoal, encontre novos títulos e acompanhe seu progresso.

**🚀 [Ver projeto ao vivo](https://gmeprojctfp.vercel.app)**

---

## 🎯 O Problema

Gamers com bibliotecas extensas (Steam, Epic, GOG, físicos) não têm uma ferramenta centralizada para:
- Organizar jogos já jogados vs. backlog
- Filtrar por gênero, plataforma, nota
- Descobrir novos jogos baseados em preferências

---

## 💡 A Solução

Sistema full-stack com:
- ✅ Autenticação segura (Supabase Auth)
- ✅ CRUD completo de biblioteca pessoal
- ✅ Integração com RAWG API (600k+ jogos)
- ✅ 4 modos de visualização (grid, lista, compacto, detalhado)
- ✅ Filtros multi-critério e ordenação dinâmica
- ✅ Sistema de descoberta com recomendações aleatórias

---

## 🛠️ Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Hook Form

**Backend & Database:**
- Supabase (PostgreSQL)
- RAWG API
- Server Actions

**Deploy & Tools:**
- Vercel
- Git/GitHub

---

## 🚀 Rodando Localmente

[instruções de instalação]

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta no [Supabase](https://supabase.com) (gratuito)
- API Key da [RAWG](https://rawg.io/apidocs) (gratuito)

### Instalação

1. Clone o repositório
```bash
git clone https://github.com/rafoccb/gamehub.git
cd gamehub
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_publica_do_supabase
NEXT_PUBLIC_RAWG_API_KEY=sua_chave_da_rawg
```

4. Execute o projeto
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Configuração do Supabase

1. Crie um projeto no [Supabase](https://supabase.com)
2. Copie as credenciais em `Project Settings > API`
3. Execute o schema SQL (disponível em `/supabase/schema.sql` — se você tiver)


---

## 🎓 Aprendizados

- Otimização de chamadas de API com debounce e cache
- Implementação de autenticação stateful com Supabase
- Design system escalável com Tailwind
- Server-side rendering e ISR no Next.js 14
