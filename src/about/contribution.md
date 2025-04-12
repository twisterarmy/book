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

Feel free to open an [Issue](https://github.com/twisterarmy/book/issues) if you have any questions!