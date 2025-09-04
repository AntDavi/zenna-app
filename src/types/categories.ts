export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface CategoriesByType {
  income: Category[];
  expense: Category[];
}

export const mockCategories: CategoriesByType = {
  income: [
    {
      id: "1",
      name: "Salário",
      description: "Salário mensal ou quinzenal",
    },
    {
      id: "2",
      name: "Freelance",
      description: "Trabalhos freelancer e projetos extras",
    },
    {
      id: "3",
      name: "Investimentos",
      description: "Rendimentos de investimentos e dividendos",
    },
    {
      id: "4",
      name: "Vendas",
      description: "Vendas de produtos ou serviços",
    },
    {
      id: "5",
      name: "Aluguel",
      description: "Renda de aluguel de imóveis",
    },
    {
      id: "6",
      name: "Bonificação",
      description: "Bônus, 13º salário e premiações",
    },
    {
      id: "7",
      name: "Consultoria",
      description: "Serviços de consultoria e mentoria",
    },
    {
      id: "8",
      name: "Royalties",
      description: "Direitos autorais e royalties",
    },
    {
      id: "9",
      name: "Pensão",
      description: "Pensão alimentícia ou aposentadoria",
    },
    {
      id: "10",
      name: "Outros",
      description: "Outras fontes de renda",
    },
  ],
  expense: [
    {
      id: "1",
      name: "Alimentação",
      description: "Supermercado, restaurantes e delivery",
    },
    {
      id: "2",
      name: "Transporte",
      description: "Combustível, transporte público e manutenção",
    },
    {
      id: "3",
      name: "Moradia",
      description: "Aluguel, financiamento e condomínio",
    },
    {
      id: "4",
      name: "Saúde",
      description: "Plano de saúde, medicamentos e consultas",
    },
    {
      id: "5",
      name: "Entretenimento",
      description: "Cinema, streaming, jogos e lazer",
    },
    {
      id: "6",
      name: "Educação",
      description: "Cursos, livros e material educacional",
    },
    {
      id: "7",
      name: "Vestuário",
      description: "Roupas, calçados e acessórios",
    },
    {
      id: "8",
      name: "Utilidades",
      description: "Luz, água, gás, internet e telefone",
    },
    {
      id: "9",
      name: "Beleza",
      description: "Salão, cosméticos e produtos de beleza",
    },
    {
      id: "10",
      name: "Pet",
      description: "Ração, veterinário e produtos para pets",
    },
    {
      id: "11",
      name: "Impostos",
      description: "IPTU, IPVA e outros impostos",
    },
    {
      id: "12",
      name: "Seguros",
      description: "Seguro auto, residencial e de vida",
    },
    {
      id: "13",
      name: "Tecnologia",
      description: "Eletrônicos, software e assinaturas",
    },
    {
      id: "14",
      name: "Presentes",
      description: "Presentes para família e amigos",
    },
    {
      id: "15",
      name: "Viagem",
      description: "Passagens, hospedagem e turismo",
    },
    {
      id: "16",
      name: "Outros",
      description: "Outras despesas não categorizadas",
    },
  ],
};

// Função para buscar categorias por tipo
export const getCategoriesByType = (type: "income" | "expense"): Category[] => {
  return mockCategories[type];
};

// Função para buscar uma categoria específica por ID
export const getCategoryById = (id: string): Category | undefined => {
  const allCategories = [...mockCategories.income, ...mockCategories.expense];
  return allCategories.find((category) => category.id === id);
};

// Função para buscar todas as categorias
export const getAllCategories = (): Category[] => {
  return [...mockCategories.income, ...mockCategories.expense];
};
