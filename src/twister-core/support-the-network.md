## Become a public peer

Assist newcomers in discovering other peers by open following ports ([source](https://github.com/miguelfreitas/twister-core/issues/22#issuecomment-32464556)):

### Required ports

The following ports are required to be reachable for [twister seeders](https://twisterarmy.github.io/network):

* `28333` - TCP, must be open for blockchain sync operations, supports UPnP
    * please note that this port is random by default, you should run `twisterd` with `-port=28333` to make it permanent!

### Optional ports

* `29333` - TCP + UDP, must be open for WS/DHT operations, supports UPnP
    * this port is related to the value of port `28333` and its final value is implemented as `28333` + `1000` (`LIBTORRENT_PORT_OFFSET`)
* `4433` - DHT-over-SSL, see [ssl_listen](https://github.com/twisterarmy/twister-core/blob/twisterarmy/libtorrent/docs/manual.html#L4100) manual for `libtorrent`
* `4434` - same as port `4433`, but used to listen on the IPv6 interface when IPv4 one is not disabled (e.g. by the `-bind` option)
* `20000+` outbound - `twisterd` will open outgoing connections on a number of ephemeral ports to manage both blockchain sync and DHT operations, supports UPnP

``` bash
sudo ufw allow PORT_NUMBER
```

> [!IMPORTANT]
> * use `-public_server_mode` argument on `twisterd` startup to limit JSON-RPC execution to public/safe commands only ([implementation](https://github.com/twisterarmy/twister-core/blob/twisterarmy/src/bitcoinrpc.cpp#L227), [note](https://github.com/twisterarmy/twister-html/issues/43))
> * `TCP` / `UDP` ports are random by default; use also `-port=PORT_NUMBER` on `twisterd` startup to make it static

## Mine blocks

Mine blocks and promote your services! This operation aims to store network meta-information on the blockchain.

> [!NOTE]
> * twister ecosystem does not have an internal currency or market cost, the mining process is intended solely to store infrastructure data
> * in contrast to regular publications distributed via the DHT, the mining process allows your promotional message to be permanently saved on the twister blockchain
> * see also [twisterad](https://github.com/twisterarmy/twisterad) - CLI tool to rotate multiple twister ads on a single worker