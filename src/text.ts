/*import axios, { AxiosResponse } from 'axios';

// Define the structure of the response that Gemma3 returns.
interface GemmaResponse {
    model: string;
    response: string;
    done: boolean;
    context?: any[];
}

const queryGemma3 = async (prompt: string): Promise<void> => {
    try {
        const response: AxiosResponse<NodeJS.ReadableStream> = await axios({
            method: 'post',
            url: 'http://localhost:11434/api/generate',
            data: {
                model: 'gemma3',
                prompt: prompt,
                stream: true // Enable streaming responses
            },
            responseType: 'stream'  // Required to handle streaming data
        });

        let fullResponse = '';

        // Read and handle the stream
        response.data.on('data', (chunk: Buffer) => {
            const lines = chunk.toString().split('\n').filter(Boolean); // Filter out empty lines
            for (const line of lines) {
                try {
                    const parsedLine: GemmaResponse = JSON.parse(line);
                    if (parsedLine.response) {
                        fullResponse += parsedLine.response;
                        process.stdout.write(parsedLine.response); // Print incrementally
                    }
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            }
        });

        // When stream ends, log the complete response
        response.data.on('end', () => {
            //console.log('\n\nFull Response:', fullResponse);
        });

        // Handle stream errors
        response.data.on('error', (err: Error) => {
            console.error('Stream error:', err);
        });

    } catch (error) {
        console.error('Error querying Gemma 3:', error);
    }
};
*/

import ollama from 'ollama';

// Define the function to query Gemma3
const queryGemma3 = async (prompt: string): Promise<void> => {
    try {
        const response = await ollama.chat({
            model: 'gemma3',
            messages: [{ role: 'user', content: prompt }],
            stream: true // Enable streaming response
        });

        let fullResponse = '';

        for await (const part of response) {
            if (part.message?.content) {
                fullResponse += part.message.content;
                process.stdout.write(part.message.content); // Print incrementally
            }
        }

        // Log the full response when complete
        console.log('\n\nFull Response:', fullResponse);

    } catch (error) {
        console.error('Error querying Gemma3:', error);
    }
};

export { queryGemma3 };