import axios, { AxiosResponse } from 'axios';

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
            console.log('\n\nFull Response:', fullResponse);
        });

        // Handle stream errors
        response.data.on('error', (err: Error) => {
            console.error('Stream error:', err);
        });

    } catch (error) {
        console.error('Error querying Gemma 3:', error);
    }
};

export { queryGemma3 }