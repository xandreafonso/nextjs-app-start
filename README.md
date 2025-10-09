# PACKAGES

```shell
pnpm add next-themes bcryptjs @prisma/client zod react-hook-form @hookform/resolvers better-auth

pnpm add -D tsx prisma prisma-json-types-generator @better-auth/cli

pnpm prisma init --output ../generated/prisma 

pnpx @better-auth/cli generate --config src/libs/auth.ts

pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button
```