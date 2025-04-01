import readline from "readline"
import { trainModel } from "./linear.ts";
import { classifyImage } from "./mobilenet.ts";
import { queryGemma3 } from './text.ts';
import { generateAndSaveImage } from "./image.ts";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const main = async () => {
    process.stdout.write("\x1Bc");
    console.log('## AI TS Testing\n');
    console.log("## Available commands:\nlinear-regression,\nimage-classification,\ntext-generation,\nimage-generation,\nhelp\nexit\n");

    while (true) {
        const userInput = await askQuestion("=> What do you want to test: ");

        if (userInput === "exit") {
            console.log("\nGood bye!");
            rl.close();
            break;
        } else if (userInput === "linear-regression") {
            await trainModel();
        } else if (userInput === "image-classification") {
            await classifyImage();
        } else if (userInput === "text-generation") {
            console.log("## Text Generation (Gemma3)\n");
            console.log("type 'exit' to quit the text generation test.\n");
            while(true){
                const prompt = await askQuestion("=> Enter your prompt: ");
                if(prompt === "exit"){
                    console.log("Exiting text generation test.\n");
                    break;
                }
                if (prompt) {
                    await queryGemma3(prompt);
                }
            }
        } else if(userInput === 'image-generation') {
            const prompt = await askQuestion("Enter your image generation prompt => ");
            if(prompt){    
                await generateAndSaveImage(prompt, "output.png")
                .then(() => console.log("Image generation complete."))
                .catch((err) => console.error("Failed to generate image:", err));
            }
        }else if (userInput === "help") {
            console.log("## Available commands:\nlinear-regression,\nimage-classification,\ntext-generation,\nimage-generation,\nhelp\nexit\n");
        } else {
            console.log("\nInvalid input. Please try again. Type 'help' for options.");
        }
    }
};

const askQuestion = (query: string): Promise<string> => {
    return new Promise(resolve => rl.question(query, resolve));
}

main();
