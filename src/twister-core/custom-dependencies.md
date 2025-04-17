## Boost C++

If the `twisterd` build fails because your system repository has a newer version of [libboost](https://www.boost.org/) that is incompatible with the current `twister-core` API, follow these steps to build a custom (legacy) version from source:

> [!NOTE]
> * latest tested `boost` version is `1.83.0`
> * the version `1.88.0` requires `twister-core` API update!

1. `wget https://archives.boost.io/release/1.83.0/source/boost_1_83_0.tar.gz` - get specified version (replace `1_83_0` with your value)
    * compare the output of `sha256sum boost_1_83_0.tar.gz` which should be `c0685b68dd44cc46574cce86c4e17c0f611b15e195be9848dfd0769a0a207628`
2. `tar -xzf boost_1_83_0.tar.gz` - unarchive the sources
3. `cd boost_1_83_0` - navigate the sources directory
4. `./bootstrap.sh --prefix=/path/to/boost-build` - replace `/path/to/boost-build` with your value
    * optionally, you may skip the `--prefix=` argument, when installing the boost into default location, but it is not recommended as may overwrite your existing system version installed by package manager!
5. `./b2 install` - build and install to the `--prefix=` destination (optionally provide `-j` argument if you want to specify the number of CPU threads)

When the `boost` build is complete, configure the `twister-core` using `--with-boost=/path/to/boost-build` argument, for example:

``` bash
cd twister-core
./configure --with-boost=/path/to/boost-build
```
* then build `twisterd` with `make`

> [!IMPORTANT]
> Make sure that the `/path/to/boost-build` directory exists when launching your `twisterd`!

## Berkeley DB

The current version of `twister-core` should be compatible with recent system versions of [Berkeley DB](https://www.oracle.com/database/technologies/related/berkeleydb.html) (also known as `bdb`, `libdb`), at least on Fedora 41, which provides version `5.3.28` from its repository.

If you want to build a specific version of `libdb` from source, use the following steps:

1. `wget https://download.oracle.com/berkeley-db/db-4.8.30.NC.tar.gz` - get legacy version (or replace `4.8.30.NC` with your value)
    * compare the output of `sha256sum db-4.8.30.NC.tar.gz` which should be `12edc0df75bf9abd7f82f821795bcee50f42cb2e5f76a6a281b85732798364ef`
2. `tar -xzf db-4.8.30.NC.tar.gz` - unarchive the sources
3. `cd db-4.8.30.NC` - navigate the sources directory
    * `wget https://gist.githubusercontent.com/LnL7/5153b251fd525fe15de69b67e63a6075/raw/7778e9364679093a32dec2908656738e16b6bdcb/clang.patch` - download this patch when building with `clang` and `C++11` ([details](https://community.oracle.com/thread/3952592))
    * `patch -p2 < clang.patch` - apply a patch
4. `cd build_unix` - navigate to this directory if you are building on Linux
5. `../dist/configure --prefix=/path/to/libdb-build --enable-cxx` - replace `/path/to/libdb-build` with your value
    * optionally, you may skip the `--prefix=` argument, when installing the `libdb` into default location, but it is not recommended as may overwrite your existing system version installed by package manager!
    * if you see `WARNING: NO SHARED LATCH IMPLEMENTATION FOUND FOR THIS PLATFORM` - as a temporary solution, append `CFLAGS=-Wno-error=implicit-function-declaration` to the `configure` command above
6. `make` - build (optionally provide `-j` argument if you want to specify the number of CPU threads)
7. `make install` - install the build to the `--prefix=` destination (`/path/to/libdb-build`)

When our `libdb` version is ready to use, configure the `twister-core` using `--with-libdb=/path/to/libdb-build` argument, for example:

``` bash
cd twister-core
./configure --with-libdb=/path/to/libdb-build
```
* then build `twisterd` with `make`

> [!IMPORTANT]
> Make sure that the `/path/to/libdb-build` directory exists when launching your `twisterd`!