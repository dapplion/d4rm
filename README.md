# D4RM

> Decentralized forms, for decentralized projects

<p align="center">
  <a href="http://dapplion.github.io/d4rm">
    <img width="300" src="/ui/src/logo.png">
  </a>
</p>

It doesn't makes sense that decentralized projects have to use Google Forms or Typeform to aggregate their user's opinion. This platform is rough POC do so in a decentralized fashion.

## Methodology

- Use the generator UI to create a JSON that describes a form according to the specs.
- Upload the resulting JSON to IPFS and send a link with the resulting hash `decentralized-form.eth/QmaozNR7DZHQK1ZcU9p7QdrshMvXqWK6gpu5rmrkPdT3L4` to the form users.
- Users will fill the answers which will encoded to a bytes array and signed by their address.
- The form results can be aggregated off-chain or on-chain, where participation can be regulated with some smart contract logic; i.e. having a balance greater than zero of a specific token.
- Results can be public or private, using an encryption scheme to be discussed.

## Specs

form JSON example:

```json
{
  "title": "EthParis aftermath",
  "questions": [
    {
      "title": "Is EthParis the best hackaton ever?",
      "answers": ["Yes", "No"]
    },
    {
      "title": "Would you come back?",
      "answers": ["Yes", "No", "Once ETH is back at 300$"]
    }
  ],
  "submit": {
    "to": "rinkeby",
    "address": "0x77E91Ab5af418A6154637216d596d75eB8ecf70a"
  }
}
```

form answer example:

```
x01
```

## Sample form

[QmckmTWYsSTgwsgBj45HAqRirC8WNXLo7FRr11tdN6yboY](https://ipfs.io/ipfs/QmckmTWYsSTgwsgBj45HAqRirC8WNXLo7FRr11tdN6yboY)
