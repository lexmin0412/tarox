module.exports = {
  title: 'TaroX',
  tagline: 'Taro 生态系统',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/tarox/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'lexmin0412', // Usually your GitHub org/user name.
  projectName: 'tarox', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'TaroX',
      logo: {
        alt: 'TaroX Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        // {to: 'blog', label: 'Blog', position: 'left'},
				{
					href: 'https://github.com/lexmin0412/tarox-ui',
					label: 'TaroX UI',
					position: 'right'
				},
        {
          href: 'https://github.com/lexmin0412/tarox',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Taro官方站点',
          items: [
            {
              label: 'Taro',
              to: 'https://taro-docs.jd.com/taro/docs/README/index.html',
            },
            {
              label: 'Taro - Github',
              to: 'https://github.com/NervJS/taro',
            },
          ],
        },
        {
          title: '更多项目',
          items: [
            {
              label: 'youtils',
              href: 'https://github.com/lexmin0412/youtils-cli',
            },
            {
              label: 'taro-template',
              href: 'https://github.com/lexmin0412/taro-template',
            },
            {
              label: 'taro-xui',
              href: 'https://github.com/lexmin0412/taro-xui',
            },
          ],
        },
        {
          title: '关于我',
          items: [
            {
              label: '掘金',
              to: 'https://juejin.cn/user/3984285871645630',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/lexmin0412',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Lexmin's Project, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
