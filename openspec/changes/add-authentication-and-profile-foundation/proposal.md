# Proposta: add-authentication-and-profile-foundation

## Por quê
O marketplace precisa de autenticação e perfil como base para as demais features (listagem, compra, carteira).

## O que muda
- Login com e-mail/senha seguindo o fluxo: Form → Use Case `LoginUser` → Auth Service → REST Adapter → Axios → REST/MSW → Session → TanStack Query → UI.
- Página de perfil do usuário autenticado e logout.
- API simulada com MSW (`NEXT_PUBLIC_API_MOCKING=enabled`).

## Camadas
- `domain/`: entidades (`User`, `Session`) e portas (`AuthService`, `ProfileService`).
- `application/`: casos de uso (`LoginUser`, `LogoutUser`, `GetProfile`).
- `infrastructure/`: cliente Axios e adapters REST.
- `contracts/`: schemas Zod dos DTOs da API.
- `features/` e `app/`: UI, hooks do TanStack Query e rotas.

## Fora de escopo
Cadastro, recuperação de senha, OAuth, carteira cripto.

## Impacto
Projeto novo; sem breaking changes.
