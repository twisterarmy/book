## Connect new project

If you have a new Wiki (or documentation) repository for your project to connect, please define it in the Book's `webroot` location, e.g:
* `/twister-core`
* `/twister-html`
* `/your-app`

## Formatting

Please follow these recommendations when creating or editing content:

* exclude remote content dependencies, such as status badges, images, and other media that require a remote connection to function; if the media file is required, it should be associated with your upstream repository for cloning;
* prefer absolute URLs for local referencing, as the book route may be different;
* this book supports [GitHub Flavored Markdown's Alerts](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts) - feel free to decorate the content semantically!

## Edit existing sources

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

## Run the mirror

Make the book accessible to others by setting up an additional repository or web mirror for online reading!

### Repository mirror

Some self-hosted repository providers, such as [Gitea](https://about.gitea.com/), allow you to easily clone the [upstream repository](https://github.com/twisterarmy/book) using web UI and create a mirror out of the box. Follow the software [documentation](https://docs.gitea.com/usage/repo-mirror) for details!

Alternatively, you can set up your own public (or private) repository by running:

``` bash
git clone https://github.com/twisterarmy/book.git
```

and then set up the auto-updates using `crontab` and `git pull` command ([example](#update-the-mirror-with-crontab)).

### Web mirror for online reading

The [upstream repository](https://github.com/twisterarmy/book) contains a precompiled HTML version in the [/book](https://github.com/twisterarmy/book/tree/main/book) directory, which you can set up as the web root in your [nginx](https://nginx.org/) or [Apache](https://httpd.apache.org/) web server.

> [!IMPORTANT]
> When running the web mirror, make sure the repository root (which contains the `.git` directory) is located above the web root directory!

### Update the mirror with crontab

For daily auto-updates, consider using a `crontab` task with the `git pull` command running from the cloned book project:

``` bash
@daily cd /var/www/book && /usr/bin/git pull
```
* if the repository is located at `/var/www/book` and its HTML version is located in the original `book` directory
* for more `crontab` examples, visit this beautiful [guide](https://crontab.guru/)

### Announce new mirror

If you're the public mirror maintainer, feel free to share your link with others on the **Releases** page in the **Mirrors** section!