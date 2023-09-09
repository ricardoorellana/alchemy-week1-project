const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "5e2552a3ec9caddd398008d6aa9bb9f975a93250": 100,
  "9688509f1832b3fbaba9df3e1d489e6945120fe0": 50,
  "6e05462c1f54c00dfdafd65b31b9c6c294d19fc7": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, recoveryPublicKey } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[recoveryPublicKey] === null) {
    res.status(400).send({ message: "Invalid signature please try again!" });
  }

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = null;
  }
}
