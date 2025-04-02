import text2wav from 'text2wav';
import fs from 'fs';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

// Manually set WASM path if needed
const wasmPath = fileURLToPath(new URL('../node_modules/text2wav/lib/espeak-ng.wasm', import.meta.url));
process.env.ESPEAK_NG_WASM = wasmPath;

const options = {
    voice: 'en', // Adjust language as needed
};

const speak = async (text: string) => {
    try {
        // Convert text to a WAV buffer
        const wavBuffer = await text2wav(text, options);
        const outputFile = 'output.wav';

        // Save the file
        fs.writeFileSync(outputFile, wavBuffer);
        console.log(`Audio file saved as ${outputFile}`);

        // Play the audio file (Linux/macOS: 'aplay', Windows: 'start')
        exec(`aplay ${outputFile} || start ${outputFile}`, (err) => {
            if (err) console.error('Error playing the file:', err);
        });
    } catch (error) {
        console.error('Failed to generate audio:', error);
    }
};

// Example usage
speak('Hello, my name is Manini.').catch(error => {
    console.error('Error in speak function:', error);
});

export { speak };
