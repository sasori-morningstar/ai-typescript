import readline from "readline"
import * as readlineSync from "readline-sync";
import { trainModel } from "./linear.ts";
import { classifyImage } from "./mobilenet.ts";
import { queryGemma3 } from './text.ts';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const main = async () => {
    process.stdout.write("\x1Bc");
    console.log('AI TS Testing\n');

    while (true) {
        const userInput = await askQuestion("What do you want to test (type 'help' for options or 'exit' to quit): ");

        if (userInput === "exit") {
            console.log("\nGood bye!");
            rl.close();
            break;
        } else if (userInput === "linear") {
            await trainModel();
        } else if (userInput === "image") {
            await classifyImage();
        } else if (userInput === "text") {
            const prompt = await askQuestion("Enter your prompt => ");
            if (prompt) {
                await queryGemma3(prompt);
            }
        } else if (userInput === "help") {
            console.log("\nAvailable commands: linear, image, text, exit");
        } else {
            console.log("\nInvalid input. Please try again. Type 'help' for options.");
        }
    }
};

const askQuestion = (query: string): Promise<string> => {
    return new Promise(resolve => rl.question(query, resolve));
}

main();
