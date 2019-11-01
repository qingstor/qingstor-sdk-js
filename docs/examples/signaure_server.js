import express from 'express';

// replace this line by: import { Signer } from 'qingstor-sdk';
import Signer from '../../src/sign';

const app = express();
const port = 3000;

const signer = new Signer('test_key', 'test_secret');

app.use(express.json()); // for parsing application/json

app.post('/', (req, res) => {
  const operation = req.body;
  // if there is expiresTTL in operation, means sign request in query style
  if (operation.expiresTTL) {
    res.json(signer.getQuerySignature(operation));
  } else {
    res.json(signer.getSignature(operation));
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
