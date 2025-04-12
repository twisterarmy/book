## Become a public peer

Assist newcomers in discovering other peers by open following ports:

* `28333` - TCP
* `29333` - TCP + UDP
* `4433` - SSL (optional)
* `4434` - SSL (optional)

``` bash
sudo ufw allow PORT_NUMBER
```

> [!IMPORTANT]
> * use `-public_server_mode` argument on `twisterd` startup to limit JSON-RPC execution to public/safe commands only ([note](https://github.com/twisterarmy/twister-html/issues/43))
> * `TCP` / `UDP` ports are random by default; use also `-port=PORT_NUMBER` on `twisterd` startup to make it static

## Mine blocks

Mine blocks and promote your services! This operation aims to store network meta-information on the blockchain.

> [!NOTE]
> * twister ecosystem does not have an internal currency or market cost, the mining process is intended solely to store infrastructure data
> * in contrast to regular publications distributed via the DHT, the mining process allows your promotional message to be permanently saved on the twister blockchain
> * see also [twisterad](https://github.com/twisterarmy/twisterad) - CLI tool to rotate multiple twister ads on a single worker