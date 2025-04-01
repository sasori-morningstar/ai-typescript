import * as tf from '@tensorflow/tfjs-node';
import * as mobilenet from '@tensorflow-models/mobilenet';
import sharp from 'sharp'
import fs from 'fs';

const MODEL_PATH = 'file://assets/mobilenet-v2/model.json'; // Load locally
const LABELS_PATH = 'assets/mobilenet-v2/labels.json';

const getLabels = (): string[] => {
    const rawData = fs.readFileSync(LABELS_PATH, 'utf-8');
    const labelsObj = JSON.parse(rawData); // Parse JSON as an object

    // Convert object to an array indexed by class number
    const labels = Object.keys(labelsObj).map((key) => labelsObj[key][1]);
    return labels;
};



const loadImage = async (path: string): Promise<tf.Tensor3D> => {
    const buffer = await sharp(path)
        .removeAlpha()
        .resize(128, 128) // Resize to match the model input size
        .toBuffer();

    return tf.tidy(() => {
        const tensor = tf.node.decodeImage(buffer, 3) as tf.Tensor3D;
        return tensor.toFloat().div(255) as tf.Tensor3D; // Normalize to [0,1]
    });
};

const classifyImage = async () => {
    try {
        console.log("Loading model...");
        const model = await tf.loadGraphModel(MODEL_PATH);
        console.log("Model loaded successfully!");

        const image = await loadImage('assets/img/baby.jpeg');

        console.log("Expanding dimensions...");
        const input = image.expandDims(0); // Model expects batch shape [1, 128, 128, 3]

        console.log("Running prediction...");
        const predictions = model.predict(input) as tf.Tensor;
        const predictionData = await predictions.data();

        // Find the index of the highest value
        const maxIndex = predictionData.indexOf(Math.max(...predictionData));
        const labels = getLabels();
        console.log(`Prediction: ${labels[maxIndex]} (Class #${maxIndex})`);
        console.log(`Confidence: ${predictionData[maxIndex]}`);

        image.dispose();
        predictions.dispose();
    } catch (error) {
        console.error('Error:', error);
    }
};

export { classifyImage }