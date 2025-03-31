import * as tf from "@tensorflow/tfjs-node"

const trainModel = async () => {
    const model = tf.sequential();

    model.add(tf.layers.dense({ units: 1, inputShape: [1]}))

    model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' })

    const xs = tf.tensor2d([[1], [2], [3], [4]], [4, 1])
    const ys = tf.tensor2d([[1], [2], [6], [8]], [4, 1])

    await model.fit(xs, ys, { epochs: 100 })

    console.log("Linear regression model trained successfully")

    //Make a prediction
    const prediction = model.predict(tf.tensor2d([[5]], [1, 1])) as tf.Tensor
    prediction.print() //Should be close to [[10]]
}

export { trainModel }