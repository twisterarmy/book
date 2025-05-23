## Records example

Create at least two subdomains in your provider's control panel:

* `ns.domain.org`
  * `A`:`SERVER_IP`
* `seed.domain.org`
  * `NS`:`ns.domain.org`

If the provider requires two `NS` records:

* `ns1.domain.org`
  * `A`:`SERVER_IP`
* `ns2.domain.org`
  * `A`:`SERVER_IP`
* `seed.domain.org`
  * `NS`:`ns1.domain.org`
  * `NS`:`ns2.domain.org`

> [!NOTE]
> `SERVER_IP` is the IP address where `twister-seeder` is listening for connections on port `53`

## Alternative domain providers

#### [Alfis DNS](https://github.com/Revertron/Alfis/)

Alternative Free Identity System - decentralized domain registration in the blockchain;\
requires renewal once per year by the PoW (Proof-of-Work).

This solution is not compatible with Clearnet domain zones but supports Clearnet IPs.\
It also supports [Yggdrasil](https://yggdrasil-network.github.io/) out of the box.

## Use an expired domain

Feel free to use any expired domain from [this list](https://twisterarmy.github.io/network), as defined in [chainparams.cpp](https://github.com/twisterarmy/twister-core/blob/twisterarmy/src/chainparams.cpp#L217)

This could be beneficial for older nodes based on existing `twister-core` builds from the [twisterarmy](https://github.com/twisterarmy/twister-core/tree/twisterarmy) or [miguelfreitas](https://github.com/miguelfreitas/twister-core) branch!