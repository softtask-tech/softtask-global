# Development toolkit — 14 September 2026

All 18 resources in the requested list are available as installed packages, installed skills or downloaded source references. They are not all loaded into the website. No external repository was copied as a site template.

| Repository | Installed or downloaded form | Actual role |
|---|---|---|
| pbakaus/impeccable | Codex skill + engine 0.1.5 + source checkout | Primary design/craft guidance; engine installed, initial context loader was unavailable and direct context was used |
| anthropics/skills (frontend-design) | Codex skill + source checkout | Secondary design reference; not layered as a competing design authority |
| nextlevelbuilder/ui-ux-pro-max-skill | Codex ui-ux-pro-max skill + source checkout | Available design pattern/reference toolkit |
| Leonxlnx/taste-skill | Codex taste-skill + source checkout | Available alternative critique guidance |
| vercel-labs/agent-skills | web-design-guidelines and react-best-practices installed, source checkout | Available UI and React review guidance; does not change Cloudflare hosting |
| upstash/context7 | @upstash/context7-mcp in optional toolkit + source checkout | Installed documentation tool; not connected as an active MCP service |
| withastro/astro | astro in website package.json | Static HTML pages and routing |
| cloudflare/workers-sdk | wrangler development dependency | Worker configuration, local runtime and deployment preparation |
| motiondivision/motion | motion dependency | One restrained, reduced-motion-aware hero image reveal |
| radix-ui/primitives | Dialog and navigation-menu packages in optional toolkit | Available for future complex React controls; current site uses native dialog and navigation |
| storybookjs/storybook | Storybook and HTML/Vite integration in optional toolkit | Available component workshop; not configured because no separate shared component library exists yet |
| fontsource/fontsource | Manrope and Newsreader font packages | Self-hosted typography with OFL licences |
| lucide-icons/lucide | lucide dependency | Available icon resource; current small stroke set is authored SVG |
| lovell/sharp | sharp dependency | AVIF/WebP responsive image generation |
| microsoft/playwright | @playwright/test | Browser interaction, layout, link and screenshot checks |
| dequelabs/axe-core | @axe-core/playwright | Automated accessibility checks alongside keyboard tests |
| GoogleChrome/lighthouse | lighthouse development dependency | Production-build lab audit |
| DavidHDev/react-bits | Source checkout | Available interaction reference; no decorative React effects added to the site |

Website versions are recorded in package-lock.json. The optional toolkit is outside the site repository in the workspace's toolkit/optional-packages folder. Source references are in toolkit/owner--repository folders. Installed Codex skills are in the user's skills folder and become available in subsequent turns.

The optional toolkit can be recreated with `npm install storybook @storybook/html-vite @radix-ui/react-dialog @radix-ui/react-navigation-menu react react-dom @upstash/context7-mcp` in a separate directory. Download the linked source repositories from the original research brief as needed. Do not add the toolkit source checkouts or private research pack to this public repository.

No claim is made that installing a resource guarantees better design or that every available resource was executed. The selected design and company facts govern the implementation.
