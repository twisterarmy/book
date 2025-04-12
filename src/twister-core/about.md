# About twister-core

`twister-core` is the primary twister networking application, released by [Miguel Freitas](https://github.com/miguelfreitas) in 2013. 

According to the original [README](https://github.com/miguelfreitas/twister-core#what-is-twister):

> User registration and authentication is provided by a bitcoin-like network, so it is completely decentralized (does not depend on any central authority).\
> Post distribution uses kademlia DHT network and bittorrent-like swarms, both are provided by libtorrent.\
> Both Bitcoin and libtorrent versions included here are highly patched and do not interoperate with existing networks (on purpose).

## Conception

The software design uses proof-of-work (PoW) to permanently store usernames (public keys) and message indexes in the blockchain. Mining is not required to create a new account; it is performed by service nodes that support the network by generating promotional messages. Also, the blockchain does not provide any coins for trading; it is solely used to offer decentralized storage for the network's usernames and messaging metadata.

To keep the blockchain as small as possible, all data exchanges occur over the BitTorrent protocol, using a modified version of the [libtorrent](https://www.libtorrent.org/) library; this library is implemented as the local component of [twister-core](https://github.com/twisterarmy/twister-core/tree/twisterarmy/libtorrent).

For more technical details about twister design, please read the original [whitepaper](https://github.com/twisterarmy/archive/raw/main/whitepaper.pdf)

## Development status

According to the [announcement](http://twister.net.co/archives/617), on June 25, 2020, official project maintenance was discontinued, but the network remains active as it does not require centralized servers. Since 2021, development has been maintained by the [community](https://twisterarmy.github.io/).

## Requirements

* CPU architectures: amd64, armhf
* RAM: 512 Mb
* Disk: ~1Gb
  * build with dependencies: [529 Mb](https://github.com/twisterarmy/twister-core/issues/15#issuecomment-2781573423)
  * profile data: ~512 Mb in 2025 (depending on subscriptions)
* Bandwidth: depends on the network activity, at this moment - about 2 Gb per month

## User interface

Since `twister-core` has no GUI out of the box, it requires a web UI application called [twister-html](https://github.com/twisterarmy/twister-html) to interact using a web browser.

## Install options

The simplest way to get started is to use the latest [Flatpak bundle](https://github.com/twisterarmy/twister). To build from source, you will want to follow the instructions, depending on your system.