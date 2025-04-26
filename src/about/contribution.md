## Connect new project

If you have a new Wiki (or documentation) repository for your project to connect, please follow these steps:

1. Define a new `git` source in the [build](https://github.com/twisterarmy/book/blob/main/build.sh) script:
    * setup wiki page aliases **in lowercase** using the valid URI [STD66](https://www.rfc-editor.org/info/std66) format (e.g. `cp Contribution.md contribution.md`)
    * prefer the webroot location if your project has no alternative branches (e.g. `/twister-seeder`, `/twisterad`)
2. Create a new menu item in the book [summary](https://github.com/twisterarmy/book/blob/main/src/SUMMARY.md) that will be used in the navigation menu
3. Send a [pull request](https://github.com/twisterarmy/book/pulls) with your connection!

## Formatting

Please follow these recommendations when creating or editing content:

* exclude remote content dependencies, such as status badges, images, and other media that require a remote connection to function; if the media file is required, it should be associated with your upstream repository for cloning;
* prefer absolute URLs for local referencing, as the book route may be different;
* this book supports [GitHub Flavored Markdown's Alerts](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts) - feel free to decorate the content semantically!

## Edit existing sources

> [!NOTE]
> This project uses `build.sh` script to aggregate the book data from different sources; please do not edit the precompiled `HTML` or `Markdown` files directly!

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
  * [twister-seedrs](https://github.com/twisterarmy/twister-seedrs/wiki)
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

## Maintenance

If you're this book maintainer, follow these steps to update the [upstream repository](https://github.com/twisterarmy/book):

1. `git clone https://github.com/twisterarmy/book.git`;
2. `./build.sh` - generate recent book version;
3. `git commit -m source-update` - save your changes;
4. `git push` - send updates to the upstream;
5. optionally, create a new stable [Release](https://github.com/twisterarmy/book/releases) in accordance with the versioning policy!

> [!NOTE]
> If you're the [website](https://twisterarmy.github.io/) maintainer, please also update the [online version](https://github.com/twisterarmy/twisterarmy.github.io#maintenance) using `./book.sh` script.