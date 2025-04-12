(please help improving this page)
### Pre-Configured Gitian VirtualBox image

A pre-configured VirtualBox <a href="https://gitian.org/" title="Gitian">Gitian</a> image based on Ubuntu 12.04 LTS x86_64 + gitian + twister sources is now available for download (3.2 GB file):

<a href="https://mega.co.nz/#!TMFWRLhI!WVuDMn58mZgD6EdkqWeKYmB2LfkFAWgnhayKv-VSIjw" title="ubuntu_12.04_amd64_gitian_twister.ova">ubuntu_12.04_amd64_gitian_twister.ova (download from Mega)</a>

<a href="https://www.dropbox.com/s/kqxfyyvts9yzvva/ubuntu_12.04_amd64_gitian_twister.ova" title="ubuntu_12.04_amd64_gitian_twister.ova">ubuntu_12.04_amd64_gitian_twister.ova (download from Dropbox)</a>

<a href="https://drive.google.com/file/d/0BziKIN0Q3QEmRlRZZVNpODJIaWs/edit?usp=sharing" title="ubuntu_12.04_amd64_gitian_twister.ova">ubuntu_12.04_amd64_gitian_twister.ova (download from Google Drive)</a>

The md5sum of the file is:

<blockquote>
48f62fce1ba105cdcd172b8de6a2466a  ubuntu_12.04_amd64_gitian_twister.ova
</blockquote>

The Ubuntu desktop contains a simple <code>README</code> text file with very basic gitian instructions on building both 32 and 64-bits native Windows executables (using mingw, not cygwin).

One just have to boot the VirtualBox and execute a couple of commands to create an updated <code>twisterd.exe</code> from twister-core github repository.

For more information on the building process refer to <a href="https://github.com/devrandom/gitian-builder" title="Gitian documentation">Gitian documentation</a>.

***

### Create your Gitian build without VirtualBox (Ubuntu required)

For the most up-to-date instructions see:
[[https://github.com/miguelfreitas/twister-core/tree/master/contrib/gitian-descriptors]]
and
[[https://github.com/miguelfreitas/twister-core/blob/master/doc/release-process.md]]

You need the right hardware: you need a 64-bit-capable CPU with hardware virtualization support (Intel VT-x or AMD-V). Not all modern CPUs support hardware virtualization.

You probably need to enable hardware virtualization in your machine's BIOS.

You need to be running a recent version of 64-bit-Ubuntu, and you need to install several prerequisites:

	sudo apt-get install ruby apache2 git apt-cacher-ng python-vm-builder qemu-kvm

Sanity checks:

	sudo service apt-cacher-ng status  # Should return apt-cacher-ng is running
	ls -l /dev/kvm   # Should show a /dev/kvm device


Once you've got the right hardware and software:

    git clone git://github.com/miguelfreitas/twister-core.git
    git clone git://github.com/devrandom/gitian-builder.git
    mkdir gitian-builder/inputs

    # Create base images
    cd gitian-builder
    bin/make-base-vm --suite precise --arch i386
    bin/make-base-vm --suite precise --arch amd64
    cd ..

    # Get inputs (see doc/release-process.md for exact inputs needed and where to get them)
    cd gitian-builder/inputs
	wget 'https://www.openssl.org/source/openssl-1.0.1h.tar.gz'
	wget 'http://download.oracle.com/berkeley-db/db-4.8.30.NC.tar.gz'
	wget 'http://zlib.net/zlib-1.2.8.tar.gz'
	wget 'https://downloads.sourceforge.net/project/boost/boost/1.55.0/boost_1_55_0.tar.bz2'
	wget 'https://svn.boost.org/trac/boost/raw-attachment/ticket/7262/boost-mingw.patch' -O boost-mingw-gas-cross-compile-2013-03-03.patch
	wget 'https://protobuf.googlecode.com/files/protobuf-2.5.0.tar.bz2'
	wget 'https://github.com/mingwandroid/toolchain4/archive/10cc648683617cca8bcbeae507888099b41b530c.tar.gz'
	wget 'http://www.opensource.apple.com/tarballs/cctools/cctools-809.tar.gz'
	wget 'http://www.opensource.apple.com/tarballs/dyld/dyld-195.5.tar.gz'
	wget 'http://www.opensource.apple.com/tarballs/ld64/ld64-127.2.tar.gz'
	wget 'https://github.com/theuni/libdmg-hfsplus/archive/libdmg-hfsplus-v0.1.tar.gz'
	wget 'http://llvm.org/releases/3.2/clang+llvm-3.2-x86-linux-ubuntu-12.04.tar.gz' -O clang-llvm-3.2-x86-linux-ubuntu-12.04.tar.gz
	cd ..
	./bin/gbuild ../twister-core/contrib/gitian-descriptors/boost-linux.yml
	mv build/out/boost-*.zip inputs/
	./bin/gbuild ../twister-core/contrib/gitian-descriptors/deps-linux.yml
	mv build/out/twister-deps-*.zip inputs/
	./bin/gbuild ../twister-core/contrib/gitian-descriptors/boost-win.yml
	mv build/out/boost-*.zip inputs/
	./bin/gbuild ../twister-core/contrib/gitian-descriptors/deps-win.yml
	mv build/out/twister-deps-*.zip inputs/
	./bin/gbuild ../twister-core/contrib/gitian-descriptors/protobuf-win.yml
	mv build/out/protobuf-*.zip inputs/
	./bin/gbuild ../twister-core/contrib/gitian-descriptors/gitian-osx-native.yml
	mv build/out/osx-*.tar.gz inputs/
	./bin/gbuild ../twister-core/contrib/gitian-descriptors/gitian-osx-depends.yml
	mv build/out/osx-*.tar.gz inputs/
	./bin/gbuild ../twister-core/contrib/gitian-descriptors/gitian-osx-qt.yml
	mv build/out/osx-*.tar.gz inputs/

Build twister for win 32 and 64-bits:

	./bin/gbuild --commit twister-core=HEAD ../twister-core/contrib/gitian-descriptors/gitian-win.yml
