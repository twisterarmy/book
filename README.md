# The twister P2P Book

Community-driven guide to [twister p2p](http://twister.net.co/), based on Wiki data from various community [repositories](https://github.com/orgs/twisterarmy/repositories).

It uses the [mdBook](https://github.com/rust-lang/mdBook) builder to create a static HTML book,\
which is also available for online reading at the community [website](https://twisterarmy.github.io/book/).

## Download

See [Releases](https://github.com/twisterarmy/book/releases) to download stable HTML build!

## Build

> [!NOTE]
> Install following dependencies to continue:
> * `rustc`, `cargo` - see [rustup](https://rustup.rs/)
> * `python3` - to run the `preprocessor.py` on build

* `cargo install mdbook` - requires [rustup](https://rustup.rs/)
* `git clone https://github.com/twisterarmy/book.git && cd book`
* `chmod +x build.sh`
* `./build.sh`

## Launch

To read in the browser using a local server, run the following command after [build](#build):

``` bash
mdbook serve --open
```

## Contribute

Please do not make changes directly; this project uses `build.sh` to dynamically generate data from different sources.
Instead, submit your edits to following Wiki:

* Summary
  * [About](https://github.com/twisterarmy/book/wiki)
* Client applications
  * [twister-core](https://github.com/twisterarmy/twister-core/wiki)
* Network tools
  * [twister-seeder](https://github.com/twisterarmy/twister-seeder/wiki)

Feel free to open an [Issue](https://github.com/twisterarmy/book/issues) if you have any questions!