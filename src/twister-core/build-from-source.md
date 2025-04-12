At this moment, the `twister-core` source code available in two options:

## @miguelfreitas branch

Legacy version, released by [Miguel Freitas](https://github.com/miguelfreitas) in 2013.

According to the [announcement](http://twister.net.co/archives/617), on June 25, 2020, official project maintenance was discontinued.

[Website](http://twister.net.co/) | [Source code](https://github.com/miguelfreitas/twister-core)

## @twisterarmy branch

Maintained by the community, it includes additional seeds and minor updates to make the codebase buildable on modern distributions.

It is 100% compatible with the main twister network (which was created by [@miguelfreitas](https://github.com/miguelfreitas)), and must remain compatible in the future.

> [!TIP]
> Prefer this version in the following cases:
> * you are using modern distributions with latest `-dev` libraries in the repository
> * you want to improve the network connectivity, as this branch includes actual [seeds](https://twisterarmy.github.io/network)
> * you are using IPv4+IPv6 or want to connect with [Yggdrasil](https://yggdrasil-network.github.io/) (the legacy branch requires additional arguments in the build configuration to enable IPv6 features)

> [!NOTE]
> Repository contains different branches, some of which are used to make reverse PRs to @miguelfreitas. Make sure you switch to the `twisterarmy` branch by using `git checkout twisterarmy` to continue with the build from this source!

[Website](https://twisterarmy.github.io/) | [Source code](https://github.com/twisterarmy/twister-core)