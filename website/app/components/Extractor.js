'use client';

import { useState } from 'react';

export default function Extractor() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const steps = [
    { icon: '🌐', text: 'Launching headless browser...' },
    { icon: '🔍', text: 'Crawling DOM, extracting styles...' },
    { icon: '⚙️', text: 'Processing design tokens...' },
    { icon: '📦', text: 'Generating output files...' }
  ];

  const handleExtract = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setCurrentStep(0);

    // Animate through steps
    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, 800));
      setCurrentStep(i + 1);
    }

    try {
      const res = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Extraction failed');
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!result) return;

    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();

    for (const [filename, content] of Object.entries(result.files)) {
      zip.file(filename, content);
    }

    const blob = await zip.generateAsync({ type: 'blob' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `chhapify-${new Date().toISOString().slice(0, 10)}.zip`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const getScoreGrade = (score) => {
    if (score >= 90) return { grade: 'A', class: 'good' };
    if (score >= 80) return { grade: 'B', class: 'good' };
    if (score >= 70) return { grade: 'C', class: 'ok' };
    if (score >= 60) return { grade: 'D', class: 'ok' };
    return { grade: 'F', class: 'bad' };
  };

  return (
    <div className="extractor">
      <form onSubmit={handleExtract} className="extractor-form">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://stripe.com"
          className="extractor-input"
          disabled={loading}
        />
        <button type="submit" className="extractor-btn" disabled={loading || !url.trim()}>
          <span>{loading ? 'Extracting...' : 'Extract Design →'}</span>
        </button>
      </form>

      {loading && (
        <div className="extractor-loading">
          <div className="extractor-spinner" />
          <p className="extractor-loading-text">Analyzing website design...</p>
          <p className="extractor-loading-sub">This typically takes 15-30 seconds</p>
          <div className="extractor-steps">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`extractor-step extractor-step-${
                  index < currentStep ? 'complete' : index === currentStep ? 'active' : 'pending'
                }`}
              >
                <div className="extractor-step-icon">
                  {index < currentStep ? '✓' : step.icon}
                </div>
                <span>{step.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="extractor-error">
          <div className="extractor-error-title">Extraction Failed</div>
          <p className="extractor-error-msg">{error}</p>
        </div>
      )}

      {result && (
        <div className="extractor-results">
          <div className="extractor-results-header">
            <div className="extractor-results-title">
              {result.summary.title || result.summary.url}
            </div>
            <button onClick={handleDownload} className="extractor-download">
              <span><span className="extractor-download-icon">↓</span> Download ZIP ({Object.keys(result.files).length} files)</span>
            </button>
          </div>

          <div className="extractor-stats">
            <div className="extractor-stat">
              <div className="extractor-stat-value">{result.summary.colors}</div>
              <div className="extractor-stat-label">Colors</div>
            </div>
            <div className="extractor-stat">
              <div className="extractor-stat-value">{result.summary.spacingCount}</div>
              <div className="extractor-stat-label">Spacing</div>
            </div>
            <div className="extractor-stat">
              <div className="extractor-stat-value">{result.summary.shadowCount}</div>
              <div className="extractor-stat-label">Shadows</div>
            </div>
            <div className="extractor-stat">
              <div className="extractor-stat-value">{result.summary.componentCount}</div>
              <div className="extractor-stat-label">Components</div>
            </div>
            <div className="extractor-stat">
              <div className="extractor-stat-value">{result.summary.cssVarCount}</div>
              <div className="extractor-stat-label">CSS Vars</div>
            </div>
            <div className="extractor-stat">
              <div className="extractor-stat-value">
                {result.summary.score ? getScoreGrade(result.summary.score.overall).grade : '—'}
              </div>
              <div className="extractor-stat-label">Grade</div>
            </div>
          </div>

          <div className="extractor-sections">
            {result.summary.colorList && result.summary.colorList.length > 0 && (
              <div className="extractor-section">
                <div className="extractor-section-title">Color Palette</div>
                <div className="extractor-colors">
                  {result.summary.colorList.map((hex, i) => (
                    <div key={i} className="extractor-swatch" title={hex}>
                      <div className="extractor-swatch-color" style={{ backgroundColor: hex }} />
                      <div className="extractor-swatch-hex">{hex}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.summary.fonts && result.summary.fonts !== 'none detected' && (
              <div className="extractor-section">
                <div className="extractor-section-title">Typography</div>
                <div className="extractor-a11y">
                  <span>{result.summary.fonts}</span>
                </div>
              </div>
            )}

            {result.summary.a11yScore !== null && (
              <div className="extractor-section">
                <div className="extractor-section-title">Accessibility Score</div>
                <div className="extractor-a11y">
                  <span className={`extractor-a11y-score ${
                    result.summary.a11yScore >= 80 ? 'good' : result.summary.a11yScore >= 50 ? 'ok' : 'bad'
                  }`}>
                    {result.summary.a11yScore}%
                  </span>
                  {result.summary.a11yFailCount > 0 && (
                    <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
                      {result.summary.a11yFailCount} contrast issue{result.summary.a11yFailCount > 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="extractor-section">
              <div className="extractor-section-title">Generated Files</div>
              <div className="extractor-files">
                {Object.entries(result.files).map(([name, content]) => (
                  <div key={name} className="extractor-file">
                    <span className="extractor-file-name">{name}</span>
                    <span className="extractor-file-size">
                      {content.length > 1024 ? `${(content.length / 1024).toFixed(1)} KB` : `${content.length} B`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
