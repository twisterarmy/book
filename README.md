# The twister p2p book

Community-driven guide for [twister p2p](http://twister.net.co/), based on Wiki data from various community [repositories](https://github.com/orgs/twisterarmy/repositories). It uses the [mdBook](https://github.com/rust-lang/mdBook) builder to create a static HTML book, which is also available for online reading at [twisterarmy.github.io](https://twisterarmy.github.io/book) website.

## Download

See [Releases](https://github.com/twisterarmy/book/releases) to download precompiled HTML version!

## Build

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
Instead, submit your edits there:

* [about](https://github.com/twisterarmy/book/wiki)
* [twister-core](https://github.com/twisterarmy/twister-core/wiki)
* [twister-seeder](https://github.com/twisterarmy/twister-seeder/wiki)

Feel free to open an [Issue](https://github.com/twisterarmy/book/issues) if you have any questions!