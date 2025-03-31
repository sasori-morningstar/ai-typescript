import * as tf from '@tensorflow/tfjs-node'
import * as readlineSync from "readline-sync";
import { trainModel } from "./linear.ts";
import { classifyImage } from "./mobilenet.ts";



const main = async () => {
    process.stdout.write("\x1Bc");

    console.log('Tensorflow TS Testing\n')
    while (true) {
        const userInput = readlineSync.question("What do you want to test (type 'help' for options or 'exit' to quit): ").trim().toLowerCase();

        if (userInput === "exit") {
            console.log("\nGood bye!")
            break;
        } else if (userInput === "linear") {
            trainModel()
        } else if (userInput === "image") {
            classifyImage()
        } else if (userInput === "help") {
            console.log("\nAvailable commands: linear, image, exit")
        } else {
            console.log("\nInvalid input. Please try again. Type 'help' for options.");
        }
    }



}

main();

