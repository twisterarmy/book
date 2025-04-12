## DNS can't discover new peers

First of all, check that the DNS cache has really been updated; it may take some time for the domain settings to change.

Then, make sure that at least one expected `twister-core` instance (with port `28333`) has been online for about one day or more. If you're running `twister-core` with recently changed random port to `28333`, try clear the [storage](Usage#storage) cache and restart your `twister-seeder`; make sure, the `twister-core` [port is open](https://www.yougetsignal.com/tools/open-ports/?port=28333).

Try sending a new request to your new `twister-seeder` from the peering `twister-core`, as your `twister-core` probably doesn't know about the new `twister-seeder` since it's not [listed](https://github.com/twisterarmy/twister-core/blob/twisterarmy/src/chainparams.cpp#L218) and can't obtain its address from other peers: open the [web UI](http://127.0.0.1:28332) and add your `seed.domain.org` to the `DNS to obtain list of peers` entry.

If the `twister-seeder` outputs `0/2 available` for a while, and you already running or know an existing `twister-core` IP with active connections (on port `28333`), try defining it as the initial peer by temporarily hardcoding the following [line](https://github.com/twisterarmy/twister-seeder/blob/twisterarmy/main.cpp#L431) in `main.cpp`, then recompile and restart `dnsseed`:

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

This solution will work and could be useful in certain situations (e.g., when all other seeds are offline and you are using an existing hostname from [this list](https://twisterarmy.github.io/network))