module.exports = async (client) => {
  const express = require('express');
  const app = express();
  const port = 8080;
  app.all('/', (req, res) => {
    res.send(`Express Activated for BoltWays DC BOT.`);
    res.end();
  });
  app.listen(port, () => console.log(`Bot running on http://localhost:${port}`));

}