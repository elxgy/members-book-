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
  'ADVOCACIA': [
    {
      id: '9',
      name: 'Mariana Alves',
      company: 'Alves & Associados',
      segment: 'ADVOCACIA',
      imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
      hierarchy: 'SOCIOS',
      bio: 'Especialista em direito empresarial e tributário com mais de 15 anos de experiência. Fundadora do escritório Alves & Associados, referência em consultoria jurídica para empresas de médio e grande porte.',
      socialMedia: {
        instagram: 'marianaalves.adv',
        linkedin: 'marianaalvesadv',
        email: 'mariana@alvesadvocacia.com.br'
      }
    }
  ],
  'FOOD': [
    {
      id: '10',
      name: 'Ricardo Mendes',
      company: 'Sabor Gourmet',
      segment: 'FOOD',
      imageUrl: 'https://randomuser.me/api/portraits/men/10.jpg',
      hierarchy: 'DISRUPTION',
      bio: 'Chef e empreendedor com formação internacional. Fundador da rede Sabor Gourmet, que revolucionou o conceito de fast-food saudável no Brasil. Suas operações já contam com 12 unidades em 3 estados.',
      socialMedia: {
        instagram: 'ricardomendes.chef',
        email: 'ricardo@saborgourmet.com.br'
      }
    }
  ],
  'ARQUITETURA': [
    {
      id: '11',
      name: 'Fernanda Costa',
      company: 'FC Arquitetura Sustentável',
      segment: 'ARQUITETURA',
      imageUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
      hierarchy: 'INFINITY',
      bio: 'Arquiteta especializada em projetos sustentáveis e bioconstrução. Sua empresa FC Arquitetura Sustentável é pioneira em soluções ecológicas para residências e espaços comerciais, com projetos premiados internacionalmente.',
      socialMedia: {
        instagram: 'fernandacosta.arq',
        linkedin: 'fernandacostaarq',
        email: 'fernanda@fcarquitetura.com.br'
      }
    }
  ],
  'FRANQUIAS': [
    {
      id: '12',
      name: 'Eduardo Santos',
      company: 'Grupo ESF',
      segment: 'FRANQUIAS',
      imageUrl: 'https://randomuser.me/api/portraits/men/12.jpg',
      hierarchy: 'SOCIOS',
      bio: 'Especialista em expansão de negócios através de franquias. O Grupo ESF já desenvolveu mais de 30 redes de franquias de sucesso em diversos segmentos, desde alimentação até serviços especializados.',
      socialMedia: {
        instagram: 'eduardosantos.franquias',
        linkedin: 'eduardosantosesf',
        email: 'eduardo@grupoesf.com.br'
      }
    }
  ],
  'IMOBILIÁRIO': [
    {
      id: '13',
      name: 'Camila Rodrigues',
      company: 'CR Empreendimentos',
      segment: 'IMOBILIÁRIO',
      imageUrl: 'https://randomuser.me/api/portraits/women/13.jpg',
      hierarchy: 'DISRUPTION',
      bio: 'Empreendedora do setor imobiliário com foco em inovação. A CR Empreendimentos se destaca por projetos que integram tecnologia, sustentabilidade e bem-estar, redefinindo o conceito de moradia urbana.',
      socialMedia: {
        instagram: 'camilarodrigues.imoveis',
        email: 'camila@crempreendimentos.com.br'
      }
    }
  ],
  'COMEX': [
    {
      id: '14',
      name: 'Roberto Oliveira',
      company: 'Oliveira Trading',
      segment: 'COMEX',
      imageUrl: 'https://randomuser.me/api/portraits/men/14.jpg',
      hierarchy: 'INFINITY',
      bio: 'Especialista em comércio exterior com mais de 20 anos de experiência. A Oliveira Trading facilita operações de importação e exportação para empresas de todos os portes, com foco em mercados emergentes.',
      socialMedia: {
        linkedin: 'robertooliveira',
        email: 'roberto@oliveiratrading.com.br'
      }
    }
  ],
  'LICITAÇÃO': [
    {
      id: '15',
      name: 'Patrícia Lima',
      company: 'Lima Consultoria em Licitações',
      segment: 'LICITAÇÃO',
      imageUrl: 'https://randomuser.me/api/portraits/women/15.jpg',
      hierarchy: 'SOCIOS',
      bio: 'Consultora especializada em processos licitatórios governamentais. Sua empresa já auxiliou centenas de organizações a participarem com sucesso de licitações públicas em todo o Brasil.',
      socialMedia: {
        instagram: 'patricialima.licitacoes',
        linkedin: 'patricialimalicitacoes',
        email: 'patricia@limaconsultoria.com.br'
      }
    }
  ],
  'CONSTRUTORA & INCORPORADORA': [
    {
      id: '16',
      name: 'Marcelo Vieira',
      company: 'MV Construções',
      segment: 'CONSTRUTORA & INCORPORADORA',
      imageUrl: 'https://randomuser.me/api/portraits/men/16.jpg',
      hierarchy: 'DISRUPTION',
      bio: 'Engenheiro civil e empreendedor com mais de 25 anos no setor de construção. A MV Construções é reconhecida pela qualidade e inovação em seus empreendimentos residenciais e comerciais.',
      socialMedia: {
        instagram: 'marcelovieira.construcoes',
        email: 'marcelo@mvconstrucoes.com.br'
      }
    }
  ],
  'LOGÍSTICA & TRANSPORTE': [
    {
      id: '17',
      name: 'Juliana Martins',
      company: 'JM Logística Integrada',
      segment: 'LOGÍSTICA & TRANSPORTE',
      imageUrl: 'https://randomuser.me/api/portraits/women/17.jpg',
      hierarchy: 'INFINITY',
      bio: 'Especialista em soluções logísticas para e-commerce e varejo. A JM Logística Integrada utiliza tecnologia de ponta para otimizar operações de armazenagem e distribuição em todo o território nacional.',
      socialMedia: {
        linkedin: 'julianamartinslogistica',
        email: 'juliana@jmlogistica.com.br'
      }
    }
  ],
  'CONSULTORIA': [
    {
      id: '18',
      name: 'André Ferreira',
      company: 'AF Consultoria Estratégica',
      segment: 'CONSULTORIA',
      imageUrl: 'https://randomuser.me/api/portraits/men/18.jpg',
      hierarchy: 'SOCIOS',
      bio: 'Consultor com experiência internacional em gestão estratégica. A AF Consultoria atende empresas de médio e grande porte em processos de transformação organizacional e expansão de mercado.',
      socialMedia: {
        instagram: 'andreferreira.consultoria',
        linkedin: 'andreferreiraconsultoria',
        email: 'andre@afconsultoria.com.br'
      }
    }
  ],
  'MARKETING': [
    {
      id: '19',
      name: 'Luciana Soares',
      company: 'LS Marketing Digital',
      segment: 'MARKETING',
      imageUrl: 'https://randomuser.me/api/portraits/women/19.jpg',
      hierarchy: 'DISRUPTION',
      bio: 'Especialista em marketing digital e branding. A LS Marketing Digital desenvolve estratégias inovadoras de posicionamento e crescimento para marcas em ambientes digitais.',
      socialMedia: {
        instagram: 'lucianasoares.mkt',
        linkedin: 'lucianasoaresmkt',
        email: 'luciana@lsmarketing.com.br'
      }
    }
  ],
  'CONTÁBIL': [
    {
      id: '20',
      name: 'Rodrigo Almeida',
      company: 'Almeida Contabilidade Empresarial',
      segment: 'CONTÁBIL',
      imageUrl: 'https://randomuser.me/api/portraits/men/20.jpg',
      hierarchy: 'INFINITY',
      bio: 'Contador especializado em gestão tributária para empresas de tecnologia e startups. Sua empresa oferece soluções contábeis inovadoras com foco em otimização fiscal e compliance.',
      socialMedia: {
        linkedin: 'rodrigoalmeidacontabil',
        email: 'rodrigo@almeidacontabil.com.br'
      }
    }
  ],
  'RECURSOS HUMANOS': [
    {
      id: '21',
      name: 'Carla Moreira',
      company: 'CM Talentos',
      segment: 'RECURSOS HUMANOS',
      imageUrl: 'https://randomuser.me/api/portraits/women/21.jpg',
      hierarchy: 'SOCIOS',
      bio: 'Especialista em recrutamento e desenvolvimento de talentos. A CM Talentos é referência em processos seletivos para posições estratégicas e programas de desenvolvimento de lideranças.',
      socialMedia: {
        instagram: 'carlamoreira.rh',
        linkedin: 'carlamoreirarh',
        email: 'carla@cmtalentos.com.br'
      }
    }
  ],
  'EDUCAÇÃO': [
    {
      id: '22',
      name: 'Felipe Nunes',
      company: 'Instituto Futuro',
      segment: 'EDUCAÇÃO',
      imageUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
      hierarchy: 'DISRUPTION',
      bio: 'Educador e empreendedor social. O Instituto Futuro desenvolve metodologias inovadoras de ensino e programas de capacitação profissional para jovens de comunidades vulneráveis.',
      socialMedia: {
        instagram: 'felipenunes.educacao',
        linkedin: 'felipenunesesucacao',
        email: 'felipe@institutofuturo.org.br'
      }
    }
  ],
  'SAÚDE': [
    {
      id: '23',
      name: 'Beatriz Campos',
      company: 'Clínica Integrar',
      segment: 'SAÚDE',
      imageUrl: 'https://randomuser.me/api/portraits/women/23.jpg',
      hierarchy: 'INFINITY',
      bio: 'Médica e empreendedora na área da saúde. A Clínica Integrar oferece atendimento multidisciplinar com foco em medicina preventiva e qualidade de vida.',
      socialMedia: {
        instagram: 'beatrizcampos.med',
        email: 'beatriz@clinicaintegrar.com.br'
      }
    }
  ],
  'ENGENHARIA': [
    {
      id: '24',
      name: 'Gustavo Mendonça',
      company: 'GM Engenharia Sustentável',
      segment: 'ENGENHARIA',
      imageUrl: 'https://randomuser.me/api/portraits/men/24.jpg',
      hierarchy: 'SOCIOS',
      bio: 'Engenheiro especializado em projetos de eficiência energética e sustentabilidade. A GM Engenharia desenvolve soluções inovadoras para redução de impacto ambiental em edificações e processos industriais.',
      socialMedia: {
        linkedin: 'gustavomendonca',
        email: 'gustavo@gmengenharia.com.br'
      }
    }
  ],
  'SEGUROS': [
    {
      id: '25',
      name: 'Amanda Ribeiro',
      company: 'Ribeiro Seguros & Benefícios',
      segment: 'SEGUROS',
      imageUrl: 'https://randomuser.me/api/portraits/women/25.jpg',
      hierarchy: 'DISRUPTION',
      bio: 'Corretora de seguros com foco em soluções personalizadas para empresas. A Ribeiro Seguros & Benefícios é especializada em seguros empresariais, planos de saúde corporativos e benefícios para colaboradores.',
      socialMedia: {
        instagram: 'amandariberio.seguros',
        linkedin: 'amandaribeiroseguros',
        email: 'amanda@ribeiroseguros.com.br'
      }
    }
  ],
  'MODA & DESIGN': [
    {
      id: '26',
      name: 'Isabela Monteiro',
      company: 'IM Fashion Studio',
      segment: 'MODA & DESIGN',
      imageUrl: 'https://randomuser.me/api/portraits/women/26.jpg',
      hierarchy: 'INFINITY',
      bio: 'Estilista e empreendedora com formação internacional. O IM Fashion Studio é reconhecido por suas coleções sustentáveis e inovadoras, combinando tecnologia têxtil com design contemporâneo. Seus trabalhos já foram apresentados em semanas de moda nacionais e internacionais.',
      socialMedia: {
        instagram: 'isabelamonteiro.fashion',
        linkedin: 'isabelamonteirofashion',
        email: 'isabela@imfashion.com.br'
      }
    }
  ]
};