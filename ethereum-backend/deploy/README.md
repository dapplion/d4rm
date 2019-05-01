# Deploy

These contracts are going to be deployed using the keyless deployment method—also known as Nick’s method—which relies on a single-use address. (See [Nick’s article](https://medium.com/@weka/how-to-send-ether-to-11-440-people-187e332566b7) for more details)

```
v: 27,
r: "0x4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d",
s: "0x4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d"
```

## How to deploy

To deploy in a truffle environment run

```
truffle compile
truffle exec deploy/keylessDeploy.js
```
