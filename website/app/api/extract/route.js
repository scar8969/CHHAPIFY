import { extractDesignLanguage } from '../../../../src/index.js';
import { formatMarkdown } from '../../../../src/formatters/markdown.js';
import { formatTokens } from '../../../../src/formatters/tokens.js';
import { formatTailwind } from '../../../../src/formatters/tailwind.js';
import { formatCssVars } from '../../../../src/formatters/css-vars.js';
import { formatPreview } from '../../../../src/formatters/preview.js';
import { formatFigma } from '../../../../src/formatters/figma.js';
import { formatReactTheme, formatShadcnTheme } from '../../../../src/formatters/theme.js';
import { nameFromUrl } from '../../../../src/utils.js';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

async function getBrowserOptions() {
  // On Vercel/Lambda, use @sparticuz/chromium; locally, use playwright's bundled browser
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    const chromium = (await import('@sparticuz/chromium')).default;
    return {
      executablePath: await chromium.executablePath(),
      browserArgs: chromium.args,
    };
  }
  return {};
}

export async function POST(request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return Response.json({ error: 'URL is required' }, { status: 400 });
    }

    let targetUrl = url;
    if (!targetUrl.startsWith('http')) targetUrl = `https://${targetUrl}`;

    // Validate URL
    try {
      new URL(targetUrl);
    } catch {
      return Response.json({ error: 'Invalid URL' }, { status: 400 });
    }

    const browserOpts = await getBrowserOptions();
    const design = await extractDesignLanguage(targetUrl, browserOpts);

    const prefix = nameFromUrl(targetUrl);

    const files = {
      [`${prefix}-design-language.md`]: formatMarkdown(design),
      [`${prefix}-design-tokens.json`]: formatTokens(design),
      [`${prefix}-tailwind.config.js`]: formatTailwind(design),
      [`${prefix}-variables.css`]: formatCssVars(design),
      [`${prefix}-preview.html`]: formatPreview(design),
      [`${prefix}-figma-variables.json`]: formatFigma(design),
      [`${prefix}-theme.js`]: formatReactTheme(design),
      [`${prefix}-shadcn-theme.css`]: formatShadcnTheme(design),
    };

    const summary = {
      url: design.meta.url,
      title: design.meta.title,
      colors: design.colors.all.length,
      colorList: design.colors.all.slice(0, 20).map(c => c.hex),
      fonts: design.typography.families.map(f => f.name).join(', ') || 'none detected',
      spacingCount: design.spacing.scale.length,
      spacingBase: design.spacing.base,
      shadowCount: design.shadows.values.length,
      radiiCount: design.borders.radii.length,
      componentCount: Object.keys(design.components).length,
      cssVarCount: Object.values(design.variables).reduce((s, v) => s + Object.keys(v).length, 0),
      a11yScore: design.accessibility?.score ?? null,
      a11yFailCount: design.accessibility?.failCount ?? 0,
      score: design.score,
    };

    return Response.json({ summary, files });
  } catch (err) {
    console.error('Extraction failed:', err);
    return Response.json(
      { error: err.message || 'Extraction failed' },
      { status: 500 }
    );
  }
}
