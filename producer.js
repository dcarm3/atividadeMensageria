const amqp = require('amqplib');
require('dotenv').config();

const sendToQueue = async (message) => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(process.env.QUEUE_NAME, { durable: true });

        channel.sendToQueue(process.env.QUEUE_NAME, Buffer.from(message));
        console.log(`mensagem enviada3 ${message}`);

        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (error) {
        console.error('erro: ', error);
    }
};

module.exports = sendToQueue;
