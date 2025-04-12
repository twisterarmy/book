## Overview

The twister peer-to-peer network requires a couple of special [DNS seeders](https://twisterarmy.github.io/network) that are hardcoded in [twister-core](https://github.com/twisterarmy/twister-core/blob/twisterarmy/src/chainparams.cpp#L218) and [twister-seeder](https://github.com/twisterarmy/twister-seeder/blob/twisterarmy/main.cpp#L426) to provide an updated list of known peers to the new connections. If you have a 24/7 Linux machine and can add a special NS record to your domain, please consider running [twister-seeder](https://github.com/twisterarmy/twister-seeder)!

### Requirements

The `twister-seeder` is based on the [bitcoin-seeder](https://github.com/sipa/bitcoin-seeder) so it has similar build requirements

#### Server

* root access
* free port `53` to launch `twister-seeder` DNS on it
* domain access with the ability to change `NS` records
* free centralized domain providers are [not recommended](Troubleshooting#domain-provider-disallowed-changes-to-ns-record)

#### Client (public peer)

To be reachable for `twister-seeder`, the client (`twister-core` peer) must meet the following requirements:

* port `28333` is open (`twister-core` is launched with `./twisterd -port=28333`)
* _todo: other conditions require a revision of the existing crawl filter implementation_
