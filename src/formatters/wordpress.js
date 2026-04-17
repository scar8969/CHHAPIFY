export function formatWordPress(design) {
  const { colors, typography, spacing } = design;

  const theme = {
    $schema: "https://schemas.wp.org/trunk/theme.json",
    version: 3,
    settings: {
      color: {
        palette: [],
        gradients: [],
      },
      typography: {
        fontFamilies: [],
        fontSizes: [],
      },
      spacing: {
        spacingSizes: [],
      },
      layout: {
        contentSize: "1200px",
        wideSize: "1400px",
      },
    },
    styles: {
      color: {},
      typography: {},
      spacing: {},
    },
  };

  // Colors
  if (colors.primary) theme.settings.color.palette.push({ slug: 'primary', color: colors.primary.hex, name: 'Primary' });
  if (colors.secondary) theme.settings.color.palette.push({ slug: 'secondary', color: colors.secondary.hex, name: 'Secondary' });
  if (colors.accent) theme.settings.color.palette.push({ slug: 'accent', color: colors.accent.hex, name: 'Accent' });
  for (let i = 0; i < Math.min(colors.neutrals.length, 5); i++) {
    theme.settings.color.palette.push({ slug: `neutral-${i + 1}`, color: colors.neutrals[i].hex, name: `Neutral ${i + 1}` });
  }
  for (const bg of colors.backgrounds.slice(0, 3)) {
    theme.settings.color.palette.push({ slug: `bg-${bg.replace('#', '')}`, color: bg, name: `Background ${bg}` });
  }

  // Typography
  for (const fam of typography.families) {
    theme.settings.typography.fontFamilies.push({ fontFamily: fam.name, slug: fam.name.toLowerCase().replace(/\s+/g, '-'), name: fam.name });
  }
  for (const s of typography.scale.slice(0, 8)) {
    theme.settings.typography.fontSizes.push({ size: `${s.size}px`, slug: `size-${s.size}`, name: `${s.size}px` });
  }

  // Spacing
  for (let i = 0; i < Math.min(spacing.scale.length, 8); i++) {
    const val = spacing.scale[i];
    theme.settings.spacing.spacingSizes.push({ size: `${val}px`, slug: `spacing-${val}`, name: `${val}px` });
  }

  // Layout from extracted containers
  if (design.layout && design.layout.containerWidths.length > 0) {
    theme.settings.layout.contentSize = design.layout.containerWidths[0].maxWidth;
  }

  // Body styles
  if (typography.body) {
    theme.styles.typography.fontSize = `${typography.body.size}px`;
    theme.styles.typography.lineHeight = typography.body.lineHeight;
  }
  if (typography.families.length > 0) {
    theme.styles.typography.fontFamily = typography.families[0].name;
  }
  if (colors.backgrounds.length > 0) {
    theme.styles.color.background = colors.backgrounds[0];
  }
  if (colors.text.length > 0) {
    theme.styles.color.text = colors.text[0];
  }

  // Gradients from design
  if (design.gradients && design.gradients.gradients) {
    for (const g of design.gradients.gradients.slice(0, 5)) {
      theme.settings.color.gradients.push({ slug: `gradient-${theme.settings.color.gradients.length + 1}`, gradient: g.raw, name: `Gradient ${theme.settings.color.gradients.length + 1}` });
    }
  }

  return JSON.stringify(theme, null, 2);
}
