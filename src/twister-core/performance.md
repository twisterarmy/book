## Service peer

If you are running a [public peer](Support-the-network#become-a-public-peer) or just using `twister-core` on a machine with limited resources, consider following these recommendations:

### Peering

Do not follow too many accounts, especially RSS bots that produce massive feeds, as every message in the twister peer-to-peer network is a separate torrent that requires hash management.

### Mining

If you're a [network supporter](Support-the-network) and [mining blocks](Support-the-network#mine-blocks) on a powerful machine, take a look at the [twistead](https://github.com/twisterarmy/twisterad) tool, which provides the `--latency` option that hibernates the miner for a specified time in seconds as soon as a new block has been mined. If someone mines a block after the timeout expires, the daemon will continue to sleep.