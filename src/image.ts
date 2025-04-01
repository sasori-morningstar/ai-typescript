import { execFile } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

// Get the current directory equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateAndSaveImage = (prompt: string, outputPath: string) => {
    return new Promise<void>((resolve, reject) => {
      const pythonPath = path.join(__dirname, "../python/venv/bin/python3"); // Virtual env Python
      const scriptPath = path.join(__dirname, "../python/generate_image.py"); // Python script
  
      execFile(pythonPath, [scriptPath, prompt, outputPath], (error, stdout, stderr) => {
        if (error) {
          console.error("Error generating image:", error);
          console.error("STDERR:", stderr);
          reject(error);
          return;
        }
  
        if (stderr) {
          console.error("Python script stderr:", stderr);
        }
  
        console.log(stdout);
        resolve();
      });
    });
  };


export { generateAndSaveImage };