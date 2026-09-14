import { services } from './services';
import { articles } from './articles';
import { productProfiles } from './product-profiles';

const pages: Record<string, [string, string]> = {
  '/': [
    'Enterprise software, AI & infrastructure',
    'Soft Task connects software engineering, AI, data, cloud and data centre infrastructure. Explore our capabilities, delivery approach and product portfolio.',
  ],
  '/services/': [
    'Enterprise technology services',
    'Explore six connected capabilities: software engineering, AI automation, data analytics, cloud infrastructure, data centre engineering and blockchain.',
  ],
  '/products/': [
    'Tubblor, Regulix One & Kytheos',
    'Meet the Soft Task product portfolio: Tubblor for marketing intelligence, Regulix One for AML and KYC workflows, and Kytheos for cybersecurity.',
  ],
  '/company/': [
    'About Soft Task',
    'Meet Soft Task: Singapore headquarters, clients in 33+ countries, and connected capabilities across software, AI, data, cloud infrastructure and Web3.',
  ],
  '/company/how-we-work/': [
    'How we work: discovery to handover',
    'Explore our approach to technology projects: discovery, scope, architecture, delivery checkpoints, acceptance, operational handover and agreed support.',
  ],
  '/company/locations/': [
    'Our presence: Singapore, India, UAE & USA',
    'Find Soft Task headquarters in Singapore, the Bengaluru address, UAE regional website and US contact address. Serving clients in 33+ countries.',
  ],
  '/insights/': [
    'Technology perspectives & practical guides',
    'Practical explainers on cloud migration, AI evaluation and data centre capacity. Explore the dependencies and questions behind enterprise technology decisions.',
  ],
  '/contact/': [
    'Discuss your technology project',
    'Start a conversation with Soft Task about your software, AI, data or infrastructure project. Share your business requirement, market and delivery constraints.',
  ],
  '/newsletter/': [
    'Subscribe to Soft Task perspectives',
    'Choose Soft Task updates on software engineering, AI, data and infrastructure. Confirm your subscription by email and manage your interest in future updates.',
  ],
  '/careers/': [
    'Careers at Soft Task',
    'Explore the disciplines and working approach at Soft Task. Find the current status of vacancies and what future role descriptions will include.',
  ],
  '/privacy/': [
    'Website privacy information',
    'Read the development website privacy information covering enquiry forms, newsletter confirmation, browser preferences and details required before launch.',
  ],
  '/terms/': [
    'Website terms',
    'Understand the scope of information on the Soft Task website, external product links and the distinction between website content and agreed engagement terms.',
  ],
  '/cookies/': [
    'Cookies & browser preferences',
    'Understand Soft Task cookie preferences, essential website functions and optional tracking choices. Revisit and change your preferences from the footer.',
  ],
  '/accessibility/': [
    'Website accessibility',
    'Read about accessibility features on the Soft Task website, including keyboard navigation, readable content, reduced motion and ways to report a barrier.',
  ],
};

export function pageSEO(path: string, fallbackTitle: string, fallbackDescription?: string) {
  const service = services.find((s) => path === `/services/${s.slug}/`);
  const article = articles.find((a) => path === `/insights/${a.slug}/`);
  const product = productProfiles.find((p) => path === `/products/${p.slug}/`);
  const [title, description] = pages[path] || [
    service?.name ||
      article?.title ||
      (product ? `${product.name} — ${product.category}` : fallbackTitle),
    service?.intro ||
      article?.summary ||
      product?.description ||
      fallbackDescription ||
      'Explore Soft Task.',
  ];
  const url = `https://softtask.co${path}`;
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': 'https://softtask.co/#organization',
      name: 'Soft Task',
      url: 'https://softtask.co/',
      logo: 'https://softtask.co/logo.png',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '20 Woodlands Link, #04-33',
        addressLocality: 'Singapore',
        postalCode: '738733',
        addressCountry: 'SG',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://softtask.co/#website',
      name: 'Soft Task',
      url: 'https://softtask.co/',
      publisher: { '@id': 'https://softtask.co/#organization' },
    },
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: title,
      description,
      inLanguage: 'en',
      isPartOf: { '@id': 'https://softtask.co/#website' },
    },
  ];
  if (path !== '/' && !path.includes('404')) {
    const parts = path.split('/').filter(Boolean);
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://softtask.co/' },
        ...parts.map((part, i) => {
          const prefix = '/' + parts.slice(0, i + 1).join('/') + '/';
          return {
            '@type': 'ListItem',
            position: i + 2,
            name: i === parts.length - 1 ? title : pages[prefix]?.[0] || part,
            item: `https://softtask.co${prefix}`,
          };
        }),
      ],
    });
  }
  if (service)
    graph.push({
      '@type': 'Service',
      name: service.name,
      description,
      url,
      serviceType: service.name,
      provider: { '@id': 'https://softtask.co/#organization' },
    });
  if (product)
    graph.push({
      '@type': 'SoftwareApplication',
      name: product.name,
      description: product.description,
      url: product.url,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      publisher: { '@id': 'https://softtask.co/#organization' },
      mainEntityOfPage: { '@id': `${url}#webpage` },
    });
  if (path === '/services/' || path === '/products/')
    graph.push({
      '@type': 'ItemList',
      name: title,
      itemListElement: (path === '/services/'
        ? services.map((s) => ({ name: s.name, url: `https://softtask.co/services/${s.slug}/` }))
        : productProfiles.map((p) => ({
            name: p.name,
            url: `https://softtask.co/products/${p.slug}/`,
          }))
      ).map((item, i) => ({ '@type': 'ListItem', position: i + 1, ...item })),
    });
  if (path.includes('/blockchain-engineering/') && !service)
    graph.push({
      '@type': 'Service',
      name: title,
      description,
      url,
      provider: { '@id': 'https://softtask.co/#organization' },
    });
  if (article)
    graph.push({
      '@type': 'Article',
      headline: article.title,
      description,
      mainEntityOfPage: { '@id': `${url}#webpage` },
      publisher: { '@id': 'https://softtask.co/#organization' },
      articleSection: article.category,
      inLanguage: 'en',
    });
  return {
    title,
    description,
    article: !!article,
    image: `https://softtask.co/images/social/${path === '/' ? 'home' : path.replace(/^\//, '').replace(/\/$/, '').replaceAll('/', '-')}.png`,
    json: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(
      /</g,
      '\\u003c',
    ),
  };
}
