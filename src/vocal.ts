import { execFile } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

// Get the current directory equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transcribe = () => {
    return new Promise<void>((resolve, reject) => {
      const source = path.join(__dirname, "../assets/audio/test.mp3"); // Source audio file
      const pythonPath = path.join(__dirname, "../python/venv/bin/python3"); // Virtual env Python
      const scriptPath = path.join(__dirname, "../python/transcribe.py"); // Python script
  
      execFile(pythonPath, [scriptPath, source], (error, stdout, stderr) => {
        if (error) {
          console.error("Error transcribing:", error);
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


export { transcribe };