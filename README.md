# D4RM

> Decentralized forms, for decentralized projects

<p align="center">
  <a href="http://dapplion.github.io/d4rm">
    <img width="300" src="/ui/src/logo.png">
  </a>
</p>

It doesn't makes sense that decentralized projects have to use Google Forms or Typeform to aggregate their user's opinion. This platform is rough POC do so in a decentralized fashion.

## How

Anyone can create a form just by creating a JSON that describes the form with this particular spec: a title, an array of questions, and a submit mechanism.

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

Once the creator uploads the JSON to IPFS, the form is ready to be used at https://dapplion.github.io/d4rm/#/results/QmckmTWYsSTgwsgBj45HAqRirC8WNXLo7FRr11tdN6yboY ! This is a static app that can be distributed as a decentralized website via IPFS and ENS (d4rm.eth for example), and cats the given IPFS hash, parses the JSON and displays the form.

Any user can then access the URL and fill the form. The answers are encoded as ordered ascending bytes: 

```
MethodID: 0xef7fa71b
[0]:  0000000000000000000000000000000000000000000000000000000000000020
[1]:  0000000000000000000000000000000000000000000000000000000000000002
[2]:  0102000000000000000000000000000000000000000000000000000000000000
```

In the demo form the submission mechanism is a smart contract deployed in Rinkeby. It has no access control and anyone can participate n times. This architecture is easily extendable to support cases such as:
- Only allow participation to users holding > 0 ANT
- Only allow participation to user holding the EthParis Proof of Attendance Protocol (POAP) ERC-721 badge
- Reward users with a token on submission
- Add encryption (NuChyper proxy-reencryption) so users can provide sensitive data, such a contact method

## Demo

Please try by yourself at:

https://dapplion.github.io/d4rm/#/form/QmckmTWYsSTgwsgBj45HAqRirC8WNXLo7FRr11tdN6yboY

I uses a sample at

[QmckmTWYsSTgwsgBj45HAqRirC8WNXLo7FRr11tdN6yboY](https://ipfs.io/ipfs/QmckmTWYsSTgwsgBj45HAqRirC8WNXLo7FRr11tdN6yboY)
