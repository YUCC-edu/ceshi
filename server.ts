import express from 'express';
import { createServer as createViteServer } from 'vite';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import util from 'util';

const execPromise = util.promisify(exec);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API Route to call Python scripts
  app.get('/api/times', async (req, res) => {
    const timesDir = path.join(process.cwd(), 'src', 'skills', 'times');
    
    try {
      if (!fs.existsSync(timesDir)) {
        return res.json([]);
      }
      
      const files = fs.readdirSync(timesDir).filter(f => f.endsWith('.py'));
      const promises = files.map(async (file) => {
        const scriptPath = path.join(timesDir, file);
        try {
          const { stdout } = await execPromise(`python3 ${scriptPath}`);
          return JSON.parse(stdout);
        } catch (e) {
          try {
            const { stdout } = await execPromise(`python ${scriptPath}`);
            return JSON.parse(stdout);
          } catch (e2) {
            console.error(`Error executing ${file}:`, e2);
            return { error: `Failed to execute ${file}` };
          }
        }
      });

      const results = await Promise.all(promises);
      res.json(results.filter(r => !r.error));
    } catch (error) {
      console.error('Failed to read directory or execute scripts', error);
      res.status(500).json({ error: 'Failed to execute Python scripts' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
