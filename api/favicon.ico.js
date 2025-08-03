import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    const iconPath = path.join(process.cwd(), 'api', 'icons', 'icon.png');
    const iconBuffer = fs.readFileSync(iconPath);
    
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.status(200).send(iconBuffer);
  } catch (error) {
    res.status(404).send('Favicon not found');
  }
} 