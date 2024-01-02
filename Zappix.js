var express = require("express");
var venom = require("venom-bot");
var bodyParser = require("body-parser");

venom
  .create({ session: 'bot' })
  .then((client) => start(client))
  .catch((error) => console.log("Erro ao criar o cliente WhatsApp:", error));

async function start(client) {
  var app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.listen(3080, () => {
    console.log("Servidor rodando na porta 3080");
  });

  app.post("/api/message", async (req, res, next) => {
    try {
      if (req.body.message) {
        const message = req.body.message;

        // ID do grupo
        const groupId = '120363198752762506@g.us';

        // Envia a mensagem para o grupo
        await client.sendText(groupId, message);
        console.log(`Mensagem enviada para o grupo com ID '${groupId}'.`);

        res.json({ success: true, message: 'Mensagem enviada para o grupo!' });
      } else {
        res.status(400).json({ success: false, message: 'Parâmetros inválidos' });
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      res.status(500).json({ success: false, message: "Erro ao enviar mensagem" });
    }
  });

  client.onStateChange((state) => {
    console.log('State changed: ', state);
  });
}
