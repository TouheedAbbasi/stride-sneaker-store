import express from 'express';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(compression({ level: 6 }));
app.use(express.json());

// Serve static assets from the dist directory with aggressive caching for hashed assets
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1y',
  immutable: true,
  setHeaders: (res, filePath) => {
    // Never cache index.html to ensure users always receive latest version
    if (filePath.endsWith('index.html')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    }
  }
}));

// API health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', brand: 'STRIDE', timestamp: new Date().toISOString() });
});

// Single Page Application (SPA) fallback: serve index.html for all non-file requests
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`STRIDE production server running on http://0.0.0.0:${PORT}`);
});
