# 🐛 Bug Report: Correção de Problemas com Valores e Datas

## 📋 Resumo Executivo

Durante o desenvolvimento do sistema de transações financeiras, foram identificados dois bugs críticos que afetavam a integridade dos dados salvos:

1. **Bug do Valor**: Valores como R$ 2.000,00 eram salvos como 2.00 no banco de dados
2. **Bug da Data**: Datas selecionadas apareciam como dia anterior na interface

Este documento detalha a análise, diagnóstico e correção de ambos os problemas.

---

## 🔢 Bug #1: Valor Incorreto (R$ 2.000,00 → 2.00)

### 🔍 **Análise do Problema**

**Fluxo Original Problemático:**
```
Usuario digita: "2000"
↓ (formatCurrency no frontend)
Formatado: "R$ 2.000,00"
↓ (FormData)
Enviado: "R$ 2.000,00"
↓ (transactionSchema no backend)
Limpeza: "2.000,00" → "2.000.00"
↓ (parseFloat)
Parseado: 2.000 (ERRO!)
↓ (Supabase)
Salvo: 2.00
```

### 🚨 **Root Cause**

O problema estava na função de parsing do schema Zod no servidor:

```typescript
// CÓDIGO PROBLEMÁTICO (ANTES):
const normalized = cleaned.replace(",", ".");
// "2.000,00" → "2.000.00" 
// parseFloat("2.000.00") = 2 (JavaScript ignora após o segundo ponto!)
```

**Por que isso acontecia?**
- JavaScript `parseFloat("2.000.00")` retorna `2` (para no segundo ponto)
- Não diferenciava separador de milhares vs decimal
- Não considerava formato brasileiro (ponto = milhares, vírgula = decimal)

### ✅ **Solução Implementada**

Criamos uma lógica inteligente de parsing que considera o formato brasileiro:

```typescript
// CÓDIGO CORRIGIDO (DEPOIS):
let normalized: string;

// Se tem ponto E vírgula (ex: "2.000,00"), é formato brasileiro
if (cleaned.includes('.') && cleaned.includes(',')) {
  // Remove pontos (separadores de milhares) e troca vírgula por ponto
  normalized = cleaned.replace(/\./g, '').replace(',', '.');
}
// Se só tem vírgula (ex: "2000,00"), substitui por ponto
else if (cleaned.includes(',') && !cleaned.includes('.')) {
  normalized = cleaned.replace(',', '.');
}
// Se só tem ponto, verifica se é separador decimal ou de milhares
else if (cleaned.includes('.')) {
  const parts = cleaned.split('.');
  // Se tem mais de 2 dígitos após o último ponto, é separador de milhares
  if (parts.length > 1 && parts[parts.length - 1].length > 2) {
    normalized = cleaned.replace(/\./g, '');
  } else {
    normalized = cleaned; // Já está correto
  }
}
```

### 🧪 **Casos de Teste**

| Input Original | Após Limpeza | Normalizado | parseFloat | Resultado |
|---------------|--------------|-------------|------------|-----------|
| `"R$ 2.000,00"` | `"2.000,00"` | `"2000.00"` | `2000` | ✅ Correto |
| `"R$ 50,75"` | `"50,75"` | `"50.75"` | `50.75` | ✅ Correto |
| `"1000.50"` | `"1000.50"` | `"1000.50"` | `1000.5` | ✅ Correto |
| `"R$ 1.234.567,89"` | `"1.234.567,89"` | `"1234567.89"` | `1234567.89` | ✅ Correto |

---

## 📅 Bug #2: Data Aparece Como Dia Anterior

### 🔍 **Análise do Problema**

**Fluxo Original Problemático:**
```
Usuario seleciona: 08/09/2025
↓ (input type="date")
Valor no form: "2025-09-08"
↓ (Banco de dados)
Salvo corretamente: "2025-09-08"
↓ (new Date("2025-09-08") na exibição)
Interpretado como UTC: 2025-09-08T00:00:00.000Z
↓ (Conversão para timezone local BR = UTC-3)
Exibido: 07/09/2025 21:00:00 → "7 de set. de 2025"
```

### 🚨 **Root Cause**

O problema estava na interpretação de strings de data pelo JavaScript:

```javascript
// CÓDIGO PROBLEMÁTICO (ANTES):
const formatDate = (dateString: string) => {
  const date = new Date(dateString); // ← PROBLEMA AQUI!
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(date);
};

// Exemplo:
new Date("2025-09-08") 
// JavaScript interpreta como UTC: 2025-09-08T00:00:00.000Z
// No timezone BR (UTC-3): 2025-09-07T21:00:00.000-03:00
// Resultado: 7 de setembro ❌
```

**Por que isso acontecia?**
- `new Date("YYYY-MM-DD")` é interpretado como UTC por padrão
- Timezone brasileiro (UTC-3) subtrai 3 horas
- Se a data UTC é meia-noite, vira 21h do dia anterior no BR
- Resultado: data aparece como dia anterior

### ✅ **Solução Implementada**

Criamos funções utilitárias que trabalham no timezone local:

#### **1. Arquivo de Utilitários (`/src/lib/formatters.ts`)**

```typescript
/**
 * Formata data para exibição no formato brasileiro
 * Evita problemas de timezone ao interpretar datas no formato YYYY-MM-DD
 */
export const formatDate = (dateString: string): string => {
  // Para evitar problemas de timezone, criamos a data manualmente
  // assumindo que a data já está no timezone local
  const [year, month, day] = dateString.split('T')[0].split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(date);
};

/**
 * Formata data para input de data (yyyy-mm-dd) no timezone local
 */
export const formatDateForInput = (date: Date = new Date()): string => {
  return date.toLocaleDateString("en-CA");
};

/**
 * Converte data do banco (que pode ter timezone) para formato local
 */
export const parseTransactionDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split('T')[0].split('-');
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
};
```

#### **2. Componentes Atualizados**

```typescript
// ANTES (problemático):
const date = new Date(dateString);

// DEPOIS (correto):
const [year, month, day] = dateString.split('T')[0].split('-');
const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
```

### 🧪 **Casos de Teste**

| Data no Banco | Método Antigo | Método Novo | Resultado |
|---------------|---------------|-------------|-----------|
| `"2025-09-08"` | `new Date("2025-09-08")` | `new Date(2025, 8, 8)` | ✅ 8 de set. |
| `"2025-12-25"` | `new Date("2025-12-25")` | `new Date(2025, 11, 25)` | ✅ 25 de dez. |
| `"2025-01-01"` | `new Date("2025-01-01")` | `new Date(2025, 0, 1)` | ✅ 1 de jan. |

---

## 🛠️ **Implementação das Correções**

### **Arquivos Modificados:**

1. **`/src/app/(app)/dashboard/_actions/transactions.ts`**
   - ✅ Corrigido parsing de valores no `transactionSchema`

2. **`/src/lib/formatters.ts`** (novo)
   - ✅ Criadas funções utilitárias para data e moeda

3. **`/src/components/Columns.tsx`**
   - ✅ Atualizado para usar `formatDate()` e `formatCurrency()`

4. **`/src/components/ModalDeleteTransaction.tsx`**
   - ✅ Atualizado para usar funções utilitárias

5. **`/src/components/ModalEditTransaction.tsx`**
   - ✅ Corrigido parse de data para edição

6. **`/src/app/(app)/dashboard/_components/ModalAdd*Transaction.tsx`**
   - ✅ Atualizado para usar `formatDateForInput()`

### **Sistema de Debug Implementado:**

Adicionamos logs estratégicos para facilitar debugging futuro:

```typescript
// Logs no frontend (modais):
console.log("🔢 [Modal] Input original:", valor);
console.log("🔢 [Modal] Valor formatado:", valorFormatado);

// Logs no backend (server action):
console.log("🚀 [ServerAction] Dados recebidos:", dados);
console.log("🔄 [Schema] Valor parseado:", valorParseado);

// Logs no banco (Supabase):
console.log("🏦 [DB] Dados inseridos:", transacao);
```

---

## 📊 **Resultados e Validação**

### **Antes das Correções:**
- ❌ R$ 2.000,00 → salvo como 2.00
- ❌ Data 08/09/2025 → exibida como 07/09/2025

### **Depois das Correções:**
- ✅ R$ 2.000,00 → salvo como 2000.00
- ✅ Data 08/09/2025 → exibida como 08/09/2025

### **Benefícios Adicionais:**
1. **Código Centralizado**: Funções utilitárias reutilizáveis
2. **Melhor Manutenibilidade**: Lógica de formatação em um local
3. **Debug Facilitado**: Logs detalhados em todo o fluxo
4. **Robustez**: Tratamento de edge cases e formatos diversos

---

## 🎯 **Lições Aprendidas**

### **1. Parsing de Valores Monetários**
- Sempre considerar formato local (BR: ponto = milhares, vírgula = decimal)
- Testar com valores grandes (milhares/milhões)
- Validar comportamento do `parseFloat()` com múltiplos pontos

### **2. Manipulação de Datas**
- `new Date("YYYY-MM-DD")` é interpretado como UTC
- Sempre usar timezone local para datas "puras" (sem hora)
- Construtor `new Date(year, month-1, day)` evita problemas de timezone

### **3. Debugging**
- Logs estratégicos em cada etapa do fluxo
- Emojis para facilitar identificação visual
- Validação de dados em múltiplos pontos

---

## 🔮 **Prevenção de Bugs Futuros**

### **1. Testes Automatizados Recomendados**
```javascript
// Testes de valor
test('deve parsear valores brasileiros corretamente', () => {
  expect(parseAmount('R$ 2.000,00')).toBe(2000);
  expect(parseAmount('R$ 50,75')).toBe(50.75);
});

// Testes de data
test('deve formatar datas sem problemas de timezone', () => {
  expect(formatDate('2025-09-08')).toBe('8 de set. de 2025');
});
```

### **2. Validações Adicionais**
- Limits de valores (min/max)
- Validação de datas futuras/passadas
- Sanitização de inputs maliciosos

### **3. Monitoramento**
- Logs de produção para detectar anomalias
- Alertas para valores/datas suspeitos
- Analytics de uso dos modais

---

## ✅ **Conclusão**

Ambos os bugs foram resolvidos com sucesso através de:

1. **Análise profunda** do fluxo de dados
2. **Identificação precisa** das causas raízes
3. **Implementação robusta** de correções
4. **Criação de utilitários** reutilizáveis
5. **Sistema de debug** para manutenção futura

O sistema agora processa valores e datas corretamente, mantendo a integridade dos dados e proporcionando uma experiência de usuário consistente.

---

*Documento gerado em: 8 de setembro de 2025*  
*Versão: 1.0*
