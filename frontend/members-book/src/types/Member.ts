export interface Member {
  id: string;
  name: string;
  company: string;
  segment: string;
  imageUrl: string;
  hierarchy: 'SOCIOS' | 'INFINITY' | 'DISRUPTION';
  bio: string;
  socialMedia?: {
    instagram?: string;
    linkedin?: string;
    email?: string;
  };
}

export interface MembersBySegment {
  [segment: string]: Member[];
}

// Dados de exemplo baseados na imagem fornecida
export const membersBySegment: MembersBySegment = {
  'TECNOLOGIA': [
    {
      id: '1',
      name: 'Pablo Veggeti da Silva',
      company: 'Veggeti Inovação',
      segment: 'TECNOLOGIA',
      imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
      hierarchy: 'SOCIOS',
      bio: 'Pablo Veggeti da Silva é fundador e CEO da Veggeti Inovação, empresa de tecnologia que está transformando o cenário empresarial capixaba com soluções inovadoras. É autor do livro Inovação Empresarial e idealizador de eventos de tecnologia e inovação no ES.',
      socialMedia: {
        instagram: 'pabloveggeti',
        linkedin: 'pabloveggeti',
        email: 'pablo@veggetiinovacao.com.br'
      }
    },
    {
      id: '2',
      name: 'Dalto Bozzetti',
      company: 'PenedoTurismo | Águia Assistência Automotiva',
      segment: 'COMÉRCIO',
      imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
      hierarchy: 'INFINITY',
      bio: 'Dalto Bozzetti Júnior é empresário com mais de 25 anos de experiência em transporte e assistência automotiva. Lidera a Águia Assistência Automotiva e Penedo Turismo, referência no Espírito Santo. Sua trajetória é marcada pela inovação, qualidade e excelência no atendimento.',
      socialMedia: {
        instagram: 'daltobozzetti',
        email: 'dalto@aguiaassistencia.com.br'
      }
    },
    {
      id: '3',
      name: 'Rafael Rodrigues',
      company: 'GrupoFioForte | Sierralog',
      segment: 'COMÉRCIO',
      imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
      hierarchy: 'DISRUPTION',
      bio: 'Sócio e CEO do Grupo Fio Forte, que inclui a Distribuidora Fio Forte e a i9 Engenharia, Rafael atua na distribuição de materiais elétricos e soluções em automação. Também é sócio da SIERRA LOG, empresa de armazéns logísticos, e de uma holding de empreendimentos imobiliários que construiu um shopping na Serra.',
      socialMedia: {
        instagram: 'rafaelrodrigues',
        linkedin: 'rafaelrodrigues',
        email: 'rafael@fioforte.com.br'
      }
    },
    {
      id: '4',
      name: 'José Roberto Favato',
      company: 'Silvato Indústria',
      segment: 'COMÉRCIO',
      imageUrl: 'https://randomuser.me/api/portraits/men/4.jpg',
      hierarchy: 'SOCIOS',
      bio: 'Empresário com mais de 30 anos de experiência no setor industrial. Fundador da Silvato Indústria, referência em inovação e qualidade.',
      socialMedia: {
        instagram: 'josefavato',
        email: 'jose@silvato.com.br'
      }
    },
    {
      id: '5',
      name: 'Vinicius Avancini',
      company: 'MariTerra',
      segment: 'COMÉRCIO',
      imageUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
      hierarchy: 'INFINITY',
      bio: 'Empreendedor no setor de alimentos e produtos naturais. A MariTerra se destaca pela qualidade e compromisso com a sustentabilidade.',
      socialMedia: {
        instagram: 'viniciusavancini',
        linkedin: 'viniciusavancini',
        email: 'vinicius@mariterra.com.br'
      }
    },
    {
      id: '6',
      name: 'Fabio Lombardi',
      company: 'NovaLeds | Loja Elétrica',
      segment: 'COMÉRCIO',
      imageUrl: 'https://randomuser.me/api/portraits/men/6.jpg',
      hierarchy: 'DISRUPTION',
      bio: 'Especialista em iluminação e soluções elétricas. A NovaLeds é reconhecida por projetos inovadores e atendimento personalizado.',
      socialMedia: {
        instagram: 'fabiolombardi',
        email: 'fabio@novaleds.com.br'
      }
    },
    {
      id: '7',
      name: 'Renato Aguiar de Oliveira',
      company: 'Flexxix FlexForm',
      segment: 'COMÉRCIO',
      imageUrl: 'https://randomuser.me/api/portraits/men/7.jpg',
      hierarchy: 'SOCIOS',
      bio: 'Pioneiro no setor de móveis e design. A Flexxix FlexForm é referência em mobiliário corporativo e residencial de alto padrão.',
      socialMedia: {
        instagram: 'renatoaguiar',
        linkedin: 'renatoaguiar',
        email: 'renato@flexxix.com.br'
      }
    },
    {
      id: '8',
      name: 'Hyann Assef',
      company: 'Assef Material de Construção',
      segment: 'COMÉRCIO',
      imageUrl: 'https://randomuser.me/api/portraits/men/8.jpg',
      hierarchy: 'INFINITY',
      bio: 'Tradição e qualidade no setor de materiais de construção. A Assef é reconhecida pelo atendimento diferenciado e variedade de produtos.',
      socialMedia: {
        instagram: 'hyannassef',
        email: 'hyann@assef.com.br'
      }
    }
  ],
  // Adicione outros segmentos conforme necessário
  'ADVOCACI': [],
  'FOOD': [],
  'ARQUITETUR': [],
  'FRANQUIAS': [],
  'IMOBILIÁRIO': [],
  'COMEX': [],
  'LICITAÇÃO': [],
  'CONSTRUTORA & INCORPORADORA': [],
  'LOGÍSTICA & TRANSPORTE': [],
  'CONSULTORIA': [],
  'MARKETING': [],
  'CONTÁBIL': [],
  'RECURSOS HUMANOS': [],
  'EDUCAÇÃO': [],
  'SAÚDE': [],
  'ENGENHARIA': [],
  'SEGUROS': []
};