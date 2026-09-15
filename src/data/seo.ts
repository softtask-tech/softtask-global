import { services } from './services';
import { articles } from './articles';
import { productProfiles } from './product-profiles';
import { governance } from './governance';
import catalogue from './catalogue.json';
import { pillarSearch, industrySearch, solutions, answersForPath } from './discovery';

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

for (const policy of governance) pages[policy.path] = [policy.title, policy.description];
pages['/services/']=['What we do: 15 connected capability pillars',"Explore Soft Task's 15 capability pillars across software, AI, data, infrastructure, enterprise systems, payments and specialist products."];
for(const industry of catalogue.industries) pages[`/industries/${industry.id}/`]=[`${industry.title}: technology solutions`,industry.description];
for(const pillar of catalogue.pillars.filter(p=>p.scope.length)) pages[pillar.url]=[pillar.title,pillar.description];
for(const pillar of catalogue.pillars) if(pillarSearch[pillar.id]) pages[pillar.url]=pillarSearch[pillar.id];
for(const industry of catalogue.industries) pages[`/industries/${industry.id}/`]=[industrySearch[industry.id],`Explore ${industry.title.toLowerCase()} technology with Soft Task: practical software and AI workflows, integration requirements, human controls and pilot measures.`];
for(const solution of solutions) pages[solution.url]=[solution.searchTitle,`Explore ${solution.searchTitle.toLowerCase()} with Soft Task: the business problem, proposed system, AI role, human oversight and a measurable pilot.`];
pages['/company/global-delivery/']=['Global technology delivery from Singapore','Work with Soft Task across markets. Plan international software, AI and infrastructure projects around data location, local requirements and clear delivery ownership.'];
pages['/']=['Technology for innovators | Software, AI & infrastructure','Soft Task — technology for innovators. Singapore-headquartered software, AI, cloud and infrastructure services, serving clients in 33+ countries.'];

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
      slogan: 'Technology for innovators',
      email: 'contact@softtask.co',
      contactPoint: { '@type':'ContactPoint', contactType:'sales enquiries', email:'contact@softtask.co', availableLanguage:'English' },
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
  const pillar=catalogue.pillars.find(p=>p.url===path);
  if (service || (pillar && !product))
    graph.push({
      '@type': 'Service',
      name: service?.name || pillar?.title,
      description,
      url,
      serviceType: service?.name || pillar?.title,
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
        ? catalogue.pillars.map((p) => ({ name: p.title, url: `https://softtask.co${p.url}` }))
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
  const answers=answersForPath(path);
  if(answers.length)graph.push({'@type':'FAQPage','@id':`${url}#answers`,mainEntity:answers.map(a=>({'@type':'Question',name:a.question,acceptedAnswer:{'@type':'Answer',text:a.answer}}))});
  if(path==='/industries/'||path==='/solutions/')graph.push({'@type':'ItemList',name:title,itemListElement:(path==='/industries/'?catalogue.industries.map(i=>({name:i.title,url:`https://softtask.co/industries/${i.id}/` })):solutions.map(s=>({name:s.searchTitle,url:`https://softtask.co${s.url}`}))).map((item,index)=>({'@type':'ListItem',position:index+1,...item}))});
  const solution=solutions.find(s=>s.url===path);
  if(solution)graph.push({'@type':'TechArticle',headline:solution.searchTitle,description,about:solution.searchTitle,mainEntityOfPage:{'@id':`${url}#webpage`},author:{'@id':'https://softtask.co/#organization'},publisher:{'@id':'https://softtask.co/#organization'},inLanguage:'en'});
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
