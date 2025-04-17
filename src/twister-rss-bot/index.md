The [twister-rss-bot](https://github.com/twisterarmy/twister-rss-bot) is RSS bot for twister P2P written in PHP 8.

It uses the [twister-php](https://github.com/twisterarmy/twister-php) library to interact with [twisterd](https://github.com/twisterarmy/twister-core) node through the JSON-RPC API and supports following features: 

* multiple feed providers
* custom tags configuration
* can send messages to different twister accounts (that you own)

## Requirements

### Installation

``` bash
apt install composer git
```

### Runtime

``` bash
apt install php-curl php-fpm php-mbstring php-pdo php-sqlite3 php-xml
```

## Install

> [!TIP]
> As this software was initially created to be used with `crontab`, it is recommended to create a new system user with a home directory and continue installation from there. Use following steps to create new system user:
> * `useradd -m twister-rss-bot`
> * `su twister-rss-bot`
> * `cd ~`

* `git clone https://github.com/twisterarmy/twister-rss-bot-php.git`
* `cd twister-rss-bot-php`
* `composer update`

## Setup

* `cp config.example.json config.json`
* `nano config.json` - setup your twister connection, tags and RSS feeds!

## Usage

* `crontab -e` - open crontab configuration from system user
    * `@hourly php src/cli/bot.php` - update feeds every hour (see [more examples](https://crontab.guru/))