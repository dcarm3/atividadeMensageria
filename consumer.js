const amqp = require('amqplib');
require('dotenv').config();

const consumeMessages = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(process.env.QUEUE_NAME, { durable: true });

        console.log(`aguardaaando na fila: ${process.env.QUEUE_NAME}`);

        channel.consume(process.env.QUEUE_NAME, (msg) => {
            if (msg !== null) {
                console.log(`mensagem: ${msg.content.toString()}`);
                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error('erro:', error);
    }
};

consumeMessages();
