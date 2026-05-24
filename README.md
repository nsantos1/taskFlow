# TaskFlow — Mini SaaS de Produtividade

> Documento de MVP — versão 1.0
> Autor: devnsantos · Domínio do portfólio: devnsantos.com.br

---

## 1. Visão geral

TaskFlow é um mini SaaS de produtividade para gerenciamento de tarefas, com
dashboard de acompanhamento. O objetivo é oferecer uma ferramenta simples e
direta para organizar demandas pessoais e, futuramente, permitir a colaboração
entre usuários em projetos compartilhados.

## 2. Problema

À medida que surgem mais demandas — trabalhos de faculdade e projetos como
freelancer —, fica difícil acompanhar tudo de cabeça ou em anotações soltas.
Falta um lugar único para registrar tarefas, ver o que está pendente, o que está
em andamento e o que já foi concluído, com prazos e prioridades visíveis.

## 3. Público-alvo

- **Inicialmente:** uso pessoal do autor, para organizar tarefas de faculdade e
  freelancer.
- **Em seguida (Fase 2):** colegas de faculdade convidados para projetos
  compartilhados, gerenciando tarefas em grupo.

## 4. Objetivos do projeto

1. Ter uma ferramenta própria e funcional para uso real no dia a dia.
2. Servir como projeto de portfólio, demonstrando capacidade técnica fullstack.
3. Aprender, na prática, o desenvolvimento de um SaaS do início ao deploy.

---

## 5. Escopo por fases

O projeto é dividido em três fases. Cada fase só começa após a conclusão da
anterior. A **Fase 1 é o MVP propriamente dito** — o corte mínimo de um produto
utilizável de verdade.

### Fase 1 — MVP

**Usuário**
- Cadastro / login
- Perfil simples

**Tarefas**
- Criar tarefa
- Editar tarefa
- Excluir tarefa

**Status da tarefa**
- A fazer
- Em andamento
- Concluído

**Dashboard**
- Quantidade total de tarefas
- Quantas concluídas
- Quantas pendentes
- Gráfico simples

**Organização**
- Prioridade
- Prazo
- Categoria / projeto

### Fase 2 — Após a conclusão da Fase 1

**Colaboração**
- Convidar usuários
- Projeto compartilhado
- Comentários
- Responsáveis por tarefa

**Experiência moderna**
- Visualizações: alternar entre Lista e Quadro (kanban com drag and drop)
- Notificações
- Tema dark / light
- Layout responsivo

### Fase 3 — Sugestões de melhorias (após a conclusão da Fase 2)

Lista de desejos. Não compromete o escopo; serve de direção futura. Priorizar
por impacto no portfólio e por interesse pessoal.

- IA para sugerir prioridades
- Relatório semanal automático
- Integração com Google Calendar
- Upload de arquivos (para organização de trabalhos feitos em grupo)
- Sistema de produtividade — métricas de desempenho do usuário, como:
  "horários mais produtivos", "período em que o usuário conclui mais tarefas",
  "sequência de produtividade" e "tempo médio"
- Timer Pomodoro (para auxiliar o foco do usuário)
- Histórico de atividades (voltado a atividades em equipe)

---

## 6. Stack técnica

**Fullstack (frontend + lógica de servidor no mesmo projeto)**
- Next.js
- TypeScript
- TailwindCSS

**Back-end dedicado**
- Python — usado **somente na Fase 3**, e exclusivamente como serviço separado
  para a parte de IA (LLM). Nas Fases 1 e 2, a lógica de servidor fica no
  próprio Next.js (Server Actions / API Routes); não há backend separado.

**Banco / Autenticação / Storage**
- Supabase, fornecendo:
  - Banco de dados (PostgreSQL)
  - Autenticação
  - Storage de arquivos

**Deploy**
- Vercel.
- Subdomínio configurado no domínio próprio (Hostinger), apontando para a
  Vercel via DNS — assim o app fica sob a marca devnsantos.com.br sem precisar
  hospedar na Hostinger.

---

## 7. Ordem de desenvolvimento

A construção segue o modelo de **fatias verticais**: cada funcionalidade é
levada do banco de dados até a tela de forma completa, uma de cada vez, em vez
de construir todas as camadas isoladamente.

### Passo 0 — Fundação (uma única vez)

Criar o projeto Next.js + Tailwind, criar o projeto no Supabase, conectar os
dois (variáveis de ambiente) e subir um esqueleto vazio na Vercel já
funcionando. Subir algo vazio parece desnecessário, mas garante que o deploy
funciona desde o dia 1 — evita descobrir problemas de deploy na véspera de
apresentar o projeto.

### Passo 1 — Autenticação

Cadastro e login. O Supabase Auth faz o trabalho pesado. É a primeira fatia
vertical porque tudo depois depende de existir um usuário logado.

### Passo 2 — Modelagem mínima das tabelas

Criar as tabelas `projects` e `tasks` no Supabase — apenas o essencial. A tabela
`projects` deve ser criada já agora (mesmo que cada usuário tenha só um projeto
"pessoal" padrão no início), para evitar uma migração dolorosa na Fase 2.
Configurar o Row Level Security (RLS) para que cada usuário acesse somente os
seus próprios dados.

### Passo 3 em diante — Fatias verticais (uma funcionalidade por vez)

Criar tarefa → listar tarefas → editar tarefa → excluir tarefa → mudar status →
prioridade / prazo / categoria → dashboard com os números → gráfico.

Cada uma dessas etapas é banco + tela na mesma tacada.

---

## 8. Critérios de "pronto" do MVP (Fase 1)

O MVP estará concluído quando o autor conseguir, na aplicação publicada:

1. Criar uma conta e fazer login.
2. Criar, editar e excluir tarefas.
3. Atribuir status, prioridade, prazo e categoria a cada tarefa.
4. Visualizar o dashboard com total de tarefas, concluídas, pendentes e o
   gráfico simples.
5. Usar a ferramenta de verdade para organizar as próprias tarefas de
   faculdade e freelancer.

---

## 9. Princípio orientador

O maior risco do projeto não é técnico — é o escopo. Diante de demandas reais
concorrentes, a regra é: **lançar a Fase 1 para uso próprio o quanto antes**,
mesmo que simples. Um TaskFlow funcionando e em uso vale mais que um projeto
bonito pela metade.