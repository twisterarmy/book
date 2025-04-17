# The twister P2P Book

Community-driven guide to [twister p2p](http://twister.net.co/), based on Wiki data from various sources, primarily from the community [repositories](https://github.com/orgs/twisterarmy/repositories).

It uses the [mdBook](https://github.com/rust-lang/mdBook) builder to create a static HTML book,\
which is also available for online reading at the community [website](https://twisterarmy.github.io/book/).

## Download

See [Releases](https://github.com/twisterarmy/book/releases) to download stable HTML build!

## Build

### Dependencies

* `rustc`, `cargo` - see [rustup](https://rustup.rs/)
  * `cargo install mdbook` - [mdBook](https://rust-lang.github.io/mdBook/) builder CLI
  * `cargo install mdbook-alerts` - preprocessor to add [GitHub Flavored Markdown's Alerts](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts)
* `python3` - to run the `preprocessor.py` on build

### Get this builder

* `git clone https://github.com/twisterarmy/book.git && cd book`
* `chmod +x build.sh`

### Get latest book sources

> [!IMPORTANT]
> Current `build.sh` implementation operates `rm` command to clean up the relative paths,\
> ensure you are still in this project directory to continue!

* `./build.sh`

## Launch

Compiled HTML version should be available in the `/book` directory.

To read in the browser using a local server, run:

``` bash
mdbook serve --open
```
* please note: this option generates additional content for local reading; do not use its output for `/book` contributions!

## Contribute

This project uses `build.sh` to aggregate the book data from different sources.\
If you want to make any changes, please submit your edits to the relevant Wiki providers:

* Summary
  * [About](https://github.com/twisterarmy/book/wiki)
* twister-core
  * [miguelfreitas](https://github.com/miguelfreitas/twister-core/wiki)
  * [twisterarmy](https://github.com/twisterarmy/twister-core/wiki)
* Mining tools
  * [twisterad](https://github.com/twisterarmy/twisterad/wiki)
  * [CudaMiner-twister](https://github.com/miguelfreitas/twister-core/wiki/mining)
* Network tools
  * [twister-seeder](https://github.com/twisterarmy/twister-seeder/wiki)
* Bridge tools
  * [twister-rss-bot](https://github.com/twisterarmy/twister-rss-bot/wiki)

Feel free to open an [Issue](https://github.com/twisterarmy/book/issues) if you have any questions!