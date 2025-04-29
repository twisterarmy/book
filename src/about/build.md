## Dependencies

* `rustc`, `cargo` - see [rustup](https://rustup.rs/)
  * `cargo install mdbook` - [mdBook](https://rust-lang.github.io/mdBook/) builder CLI
  * `cargo install mdbook-alerts` - preprocessor to add [GitHub Flavored Markdown's Alerts](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts)
* `python3` - to run the `preprocessor.py` on build

## Get this builder

* `git clone https://github.com/twisterarmy/book.git && cd book`
* `chmod +x build.sh`

## Get latest book sources

> [!IMPORTANT]
> Current `build.sh` implementation operates `rm` command to clean up the relative paths,\
> ensure you are still in this project directory to continue!

``` bash
./build.sh
```

## Launch

Compiled HTML version should be available in the `/book` directory.

To read in the browser using a local server, run:

``` bash
mdbook serve --open
```

> [!NOTE]
> The `serve` option generates an additional WebSocket API for local reading; do not use its code for `/book` contributions!