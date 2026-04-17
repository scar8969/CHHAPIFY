'use client';

import { useState, useEffect, useRef } from 'react';
import Extractor from './components/Extractor';

// Mobile Menu Component
function MobileMenu({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <div className={`mobile-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <span className="mobile-menu-title">Navigation</span>
          <button className="mobile-menu-close" onClick={onClose}>✕</button>
        </div>
        <nav className="mobile-menu-links">
          <a href="#how" onClick={onClose}>How It Works</a>
          <a href="#features" onClick={onClose}>Features</a>
          <a href="#output" onClick={onClose}>Output</a>
          <a href="#try" onClick={onClose}>Try It</a>
          <a href="https://github.com/krs-jetson/design-chhapify" className="mobile-menu-cta">Get Started</a>
        </nav>
      </div>
    </>
  );
}

// Terminal Component
function Terminal() {
  const [lines, setLines] = useState(0);
  const [copied, setCopied] = useState(false);

  const terminalLines = [
    { prompt: '$', cmd: 'npx chhapify https://stripe.com' },
    { output: '→ Launching headless browser...' },
    { output: '→ Crawling DOM, extracting styles...' },
    { output: '→ Generating 8 output files...' },
    { success: '✓ Complete! 27 colors • 3 fonts • 18 spacing values' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLines(prev => {
        if (prev >= terminalLines.length) {
          setTimeout(() => setLines(0), 4000);
          return terminalLines.length;
        }
        return prev + 1;
      });
    }, 600);

    return () => clearInterval(interval);
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText('npx chhapify https://stripe.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="terminal">
      <div className="terminal-header">
        <div className="terminal-dots">
          <div className="terminal-dot terminal-dot-red" />
          <div className="terminal-dot terminal-dot-yellow" />
          <div className="terminal-dot terminal-dot-green" />
        </div>
        <div className="terminal-title">user@chhapify:~</div>
        <button className="terminal-copy" onClick={handleCopy}>
          {copied ? '✓ copied' : 'Copy'}
        </button>
      </div>
      <div className="terminal-body">
        {terminalLines.slice(0, lines).map((line, i) => (
          <div key={i} className="terminal-line" style={{ animationDelay: `${i * 100}ms` }}>
            {line.prompt && <span className="terminal-prompt">{line.prompt}</span>}
            {line.cmd && <span className="terminal-cmd">{line.cmd}</span>}
            {line.output && <span className="terminal-output">{line.output}</span>}
            {line.success && <span className="terminal-success">{line.success}</span>}
            {i === lines - 1 && <span className="cursor-blink" />}
          </div>
        ))}
      </div>
    </div>
  );
}

// Scroll Animation Component
function ScrollAnimate({ children, className = '', delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`scroll-animate ${isVisible ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const processSteps = [
    { number: '01', cmd: 'crawl', title: 'Crawl', desc: 'Headless browser loads full page with fonts & dynamic content' },
    { number: '02', cmd: 'extract', title: 'Extract', desc: '5,000+ DOM elements analyzed, 25+ style properties collected' },
    { number: '03', cmd: 'parse', title: 'Parse', desc: '17 modules parse, deduplicate, cluster, and classify data' },
    { number: '04', cmd: 'output', title: 'Output', desc: '8 formatter modules generate production-ready files' }
  ];

  const features = [
    { title: 'Colors', desc: 'Full palette extraction with semantic classification (primary/secondary/accent), gradient detection, and usage context' },
    { title: 'Typography', desc: 'Font families, type scales, weights, line heights, tracking patterns' },
    { title: 'Spacing', desc: 'Detects all spacing values, identifies base units (4px/8px), builds spacing scale' },
    { title: 'Layout', desc: 'Grid columns, flex patterns, container widths, gaps, alignment rules' },
    { title: 'Shadows', desc: 'All box-shadows classified by visual weight, layered shadow detection' },
    { title: 'Components', desc: 'Identifies 11 component types: buttons, cards, inputs, nav, modals, alerts' }
  ];

  const outputs = [
    { name: 'design-language.md', desc: 'AI-optimized markdown for LLM recreation' },
    { name: 'preview.html', desc: 'Visual report with swatches and samples' },
    { name: 'tailwind.config.js', desc: 'Drop-in Tailwind theme extension' },
    { name: 'variables.css', desc: 'CSS custom properties by category' },
    { name: 'tokens.json', desc: 'Design tokens JSON (Style Dictionary compatible)' },
    { name: 'theme.js', desc: 'React/CSS-in-JS theme object' }
  ];

  return (
    <>
      <div className="bg-grid" />
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-logo">
          <img src="/logo.svg" alt="Chhapify Logo" className="navbar-logo-icon" />
          <span>CHHAPIFY</span>
        </div>
        <div className="navbar-links">
          <a href="#how">How It Works</a>
          <a href="#features">Features</a>
          <a href="#output">Output</a>
          <a href="#try">Try It</a>
        </div>
        <div className="navbar-right">
          <a href="https://github.com/krs-jetson/design-chhapify" className="navbar-cta desktop-only"><span>Get Started</span></a>
          <button className="navbar-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            <span className={`navbar-toggle-line ${mobileMenuOpen ? 'open' : ''}`} />
            <span className={`navbar-toggle-line ${mobileMenuOpen ? 'open' : ''}`} />
            <span className={`navbar-toggle-line ${mobileMenuOpen ? 'open' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="bg-hero-glow" />
        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Open Source · MIT Licensed
            </div>
            <h1 className="hero-title">
              Extract Any
              <br />
              <span className="hero-title-gradient">Design System</span>
            </h1>
            <p className="hero-sub">
              Transform any website into a complete design system. Colors, typography, spacing,
              components — all from a single command.
            </p>
            <div className="hero-actions">
              <a href="#try" className="btn-primary"><span>Try It Live →</span></a>
              <a href="https://github.com/krs-jetson/design-chhapify" className="btn-secondary"><span>View on GitHub</span></a>
            </div>
          </div>
          <div className="hero-right">
            <Terminal />
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <div style={{ padding: '0 32px', position: 'relative', zIndex: 1 }}>
        <div className="stats-strip">
          <div className="stat-item">
            <div className="stat-value">8</div>
            <div className="stat-label">Output Formats</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">15+</div>
            <div className="stat-label">Design Elements</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">11</div>
            <div className="stat-label">Component Types</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">7</div>
            <div className="stat-label">Quality Metrics</div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <section className="section" id="how">
        <div className="section-header">
          <ScrollAnimate><span className="section-kicker">How It Works</span></ScrollAnimate>
          <ScrollAnimate delay={50}><h2 className="section-title">From URL to Design System</h2></ScrollAnimate>
        </div>

        <div className="process-steps">
          {processSteps.map((step, i) => (
            <ScrollAnimate key={i} delay={i * 80}>
              <div className="process-step">
                <span className="process-number">{step.number}</span>
                <code className="process-cmd">$ {step.cmd}</code>
                <h3 className="process-title">{step.title}</h3>
                <p className="process-desc">{step.desc}</p>
              </div>
            </ScrollAnimate>
          ))}
        </div>

        <ScrollAnimate delay={350}>
          <div className="pipeline">
            <div className="pipeline-container">
              <div className="pipeline-data-flow">
                <div className="pipeline-flow-particle" />
                <div className="pipeline-flow-particle" />
                <div className="pipeline-flow-particle" />
                <div className="pipeline-flow-particle" />
                <div className="pipeline-flow-particle" />
              </div>

              <div className="pipeline-header">
                <div className="pipeline-title-group">
                  <div className="pipeline-icon-wrapper">⚡</div>
                  <span className="pipeline-title">Pipeline Flow</span>
                </div>
                <div className="pipeline-status">
                  <div className="pipeline-status-dot" />
                  <span>Active</span>
                </div>
              </div>

              <div className="pipeline-flow">
                <div className="pipeline-node">
                  <div className="pipeline-node-icon">🌐</div>
                  <div className="pipeline-node-content">
                    <div className="pipeline-node-label">Input</div>
                    <div className="pipeline-node-sub">Any Website</div>
                  </div>
                </div>

                <div className="pipeline-node">
                  <div className="pipeline-node-icon">⚙️</div>
                  <div className="pipeline-node-content">
                    <div className="pipeline-node-label">Extract</div>
                    <div className="pipeline-node-sub">17 Modules</div>
                  </div>
                </div>

                <div className="pipeline-node">
                  <div className="pipeline-node-icon">🧬</div>
                  <div className="pipeline-node-content">
                    <div className="pipeline-node-label">Parse</div>
                    <div className="pipeline-node-sub">Analyze</div>
                  </div>
                </div>

                <div className="pipeline-node">
                  <div className="pipeline-node-icon">📦</div>
                  <div className="pipeline-node-content">
                    <div className="pipeline-node-label">Output</div>
                    <div className="pipeline-node-sub">8 Files</div>
                  </div>
                </div>
              </div>

              <div className="pipeline-extractors">
                {[
                  { name: 'Colors', icon: '🎨' },
                  { name: 'Type', icon: '🔤' },
                  { name: 'Space', icon: '📏' },
                  { name: 'Layout', icon: '📐' },
                  { name: 'Shadows', icon: '🌑' },
                  { name: 'Components', icon: '🧩' }
                ].map((ext, i) => (
                  <div key={i} className="pipeline-extractor">
                    <div className="pipeline-extractor-icon">{ext.icon}</div>
                    <div className="pipeline-extractor-name">{ext.name}</div>
                  </div>
                ))}
              </div>

              <div className="pipeline-output">
                <div className="pipeline-output-icon">✨</div>
                <div className="pipeline-output-info">
                  <div className="pipeline-output-count">8</div>
                  <div className="pipeline-output-label">Ready Files</div>
                </div>
                <div className="pipeline-output-files">
                  <span className="pipeline-output-file">.css</span>
                  <span className="pipeline-output-file">.json</span>
                  <span className="pipeline-output-file">.js</span>
                  <span className="pipeline-output-file">.md</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimate>
      </section>

      {/* Features */}
      <section className="section section-bg" id="features">
        <div className="section-header">
          <ScrollAnimate><span className="section-kicker">Features</span></ScrollAnimate>
          <ScrollAnimate delay={50}><h2 className="section-title">Complete Extraction</h2></ScrollAnimate>
        </div>

        <div className="features-grid">
          {features.map((feature, i) => (
            <ScrollAnimate key={i} delay={i * 60}>
              <div className="feature-card">
                <span className="feature-number">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            </ScrollAnimate>
          ))}
        </div>
      </section>

      {/* Output */}
      <section className="section" id="output">
        <div className="section-header">
          <ScrollAnimate><span className="section-kicker">Output</span></ScrollAnimate>
          <ScrollAnimate delay={50}><h2 className="section-title">8 File Formats</h2></ScrollAnimate>
        </div>

        <div className="output-grid">
          {outputs.map((file, i) => (
            <ScrollAnimate key={i} delay={i * 50}>
              <div className="output-file">
                <div className="output-name">{file.name}</div>
                <p className="output-desc">{file.desc}</p>
              </div>
            </ScrollAnimate>
          ))}
        </div>
      </section>

      {/* Try It */}
      <section className="section section-try" id="try">
        <div className="try-header">
          <ScrollAnimate><span className="try-kicker">LIVE DEMO</span></ScrollAnimate>
          <ScrollAnimate delay={30}><h2 className="try-title">Try It Now</h2></ScrollAnimate>
          <ScrollAnimate delay={60}>
            <p className="try-desc">Paste any URL and watch the magic happen. No signup required.</p>
          </ScrollAnimate>
        </div>

        <ScrollAnimate delay={100}>
          <div className="try-form">
            <div className="form-wrapper">
              <div className="form-inner">
                <Extractor />
              </div>
            </div>
            <p className="form-helper">
              Or run locally: <code>npx chhapify &lt;url&gt;</code>
            </p>
          </div>
        </ScrollAnimate>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/logo.svg" alt="Chhapify" className="footer-logo-icon" />
              <span>CHHAPIFY</span>
            </div>
            <p className="footer-tagline">Extract. Analyze. Recreate.</p>
          </div>
          <div className="footer-links">
            <a href="https://github.com/krs-jetson/design-chhapify">GitHub</a>
            <a href="https://www.npmjs.com/package/chhapify">npm</a>
            <a href="https://github.com/krs-jetson/design-chhapify/issues">Issues</a>
          </div>
        </div>
        <div className="footer-bottom">
          MIT License · Open Source · Built for the design community
        </div>
      </footer>
    </>
  );
}
