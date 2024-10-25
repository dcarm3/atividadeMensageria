const express = require('express');
const sendToQueue = require('./producer');

const app = express();
app.use(express.json());

app.post('/send', async (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'escreva alguma mensagem' });
    }
    await sendToQueue(message);
    res.status(200).json({ success: true, message: 'Mensagem enviada!' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`servidor rodando em http://localhost:${PORT}`);
});
