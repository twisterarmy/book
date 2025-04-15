## DNS can't discover new peers

### DNS cache

First of all, check that the DNS cache has really been updated; it may take some time for the domain settings to change.

### Satisfy public peer requirements

Make sure that at least one expected `twister-core` instance (with [open port](https://www.yougetsignal.com/tools/open-ports/?port=28333) `28333`) has been online for about one hour or more. This peer should also be synchronized with the network, meaning it should contain the actual blockchain version and have established DHT connection.

> [!TIP] 
> If you're running `twister-core` with recently changed random port to `28333`, follow the [Clear the crawl cache](#clear-the-crawl-cache) instructions.

### Emit a signal from new peer

Try sending a new request to your new `twister-seeder` from the peering `twister-core`, as your `twister-core` probably doesn't know about the new `twister-seeder` since it's not [listed](https://github.com/twisterarmy/twister-core/blob/twisterarmy/src/chainparams.cpp#L218) and can't obtain its address from other peers: open the [web UI](http://127.0.0.1:28332) and add your `seed.domain.org` to the `DNS to obtain list of peers` entry.

### Clear the crawl cache

Current `twister-seeder` implementation may temporarily ban unstable public peers. This behavior is inherited from the legacy [bitcoin-seeder](https://github.com/sipa/bitcoin-seeder), which filters out public peers that are not running on port `28333` or those with low connectivity. 

To reset `twister-seeder` crawl cache, run `./dnsseed` with following options:

* `--wipeban` - wipe list of banned nodes
* `--wipeignore` - wipe list of ignored nodes

> [!TIP]
> To remove all crawler data collected, stop the `dnsseed` process and remove `dnsseed.dat` file (see **Storage location** for details) then restart `dnsseed` in the initial state.

### Manually define a new peer

Finally, if the `twister-seeder` outputs `0/2 available` for a while, and you already running or know an existing `twister-core` IP with active connections (on port `28333`), try defining it as the initial peer by temporarily hardcoding the following [line](https://github.com/twisterarmy/twister-seeder/blob/twisterarmy/main.cpp#L431) in `main.cpp`, then recompile and restart `dnsseed`:

``` cpp
CDnsSeedOpts *opts = (CDnsSeedOpts *)arg;
```

add after:

``` cpp
db.Add(CService("NODE_IP", 28333, true), true);
```
* where `NODE_IP` is public `twister-core` that running on port `28333`

## Domain provider disallowed changes to NS record

Free domain providers (like [DeSEC](https://desec.io/)) may drop `NS` as the abusive feature.

That is the reason why free domain providers are not recommended for `twister-seeder`, as old `twister-core` peers are already using this address for connectivity checks. As a solution, if you run a public `twister-core` with a static IP (or know stable peers with static IPs), try adding their IPs manually as `A` records for the nameserver:

* `ns.domain.org`
  * `A`:`TWISTER_CORE_IP_1`
  * `A`:`TWISTER_CORE_IP_2` 
  * ...

> [!IMPORTANT]
> This solution is not recommended, but it will work and could be useful in certain situations (e.g., when all other seeds are offline but you are using an existing hostname from [this list](https://twisterarmy.github.io/network) and running the public peer with a static IP)