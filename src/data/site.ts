export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export const siteConfig = {
  name: 'phd for life',
  domain: 'phd4life.com',
  blogDomain: 'blog.phd4life.com',
  url: 'https://phd4life.com',
  blogUrl: 'https://blog.phd4life.com',
  author: 'Baice',
  email: 'flashover@foxmail.com',
  github: 'https://github.com/SmartisanNaive',
  title: 'phd for life — Baice | Autonomous Systems for Science & Code',
  description:
    'Digital garden for AI4Science projects, autonomous agentic workflows, NLP & deep learning experiments, and synthetic biology notes.',
  nav: [
    { label: 'Projects', href: '/#projects' },
    { label: 'Workflows', href: '/#workflows' },
    { label: 'Blog', href: '/blog' },
    { label: 'GitHub ↗', href: 'https://github.com/SmartisanNaive', external: true },
  ] as NavItem[],
  socials: [
    {
      num: '01',
      name: 'GitHub',
      handle: 'github.com/SmartisanNaive',
      note: 'Open-source projects & experiments',
      url: 'https://github.com/SmartisanNaive',
      external: true,
    },
    {
      num: '02',
      name: 'Blog',
      handle: 'blog.phd4life.com',
      note: 'Field notes, workflows & engineering logs',
      url: '/blog',
      external: false,
    },
    {
      num: '03',
      name: 'RSS',
      handle: 'phd4life.com/rss.xml',
      note: 'Subscribe to new posts',
      url: '/rss.xml',
      external: false,
    },
    {
      num: '04',
      name: 'Email',
      handle: 'flashover@foxmail.com',
      note: 'Get in touch directly',
      url: 'mailto:flashover@foxmail.com',
      external: true,
    },
  ],
};
