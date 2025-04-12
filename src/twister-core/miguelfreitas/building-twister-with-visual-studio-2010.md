## Q/A ##

_What is this?_  
This page contains instructions on how to build twister with Visual Studio 2010.

_Is this relevant for me if I want to run twister on Windows?_  
No. If you just need to run twister, please get the twister build based on Cygwin as it is more stable at this time. This is for people who are familiar with Visual Studio and want to develop/debug twister there.

_Does it really work?_  
Not exactly. It builds and runs. You can open the GUI and start using it. It crashes after a while though. But this is just a matter of debugging it. From what I see, most of the problems are related to STL usage and MS specifics in this area.

_Why don't you make it work?_  
I don't have as much time to work on this as I would like. I would greatly appreciate if a younger C++ padawan would take a look at it and fix it. If not, I will probably fix it myself eventually.

## How to build twister with VS 2010 (VC 10) ##

1.) Download twister-core, put it into c:\twister\twister-core

2.) Download OpenSSL 1.0.1c, put it into c:\twister\twister-core\openssl-1.0.1c (see below on how to build it)

3.) Download Boost 1.43.0, put it into c:\twister\twister-core\boost_1_43_0 (see below on how to build it)

4.) Download Berkeley DB 4.8.30.NC, put it into c:\twister\twister-core\db-4.8.30.NC (see below on how to build it)

5.) Download ittypes.h (from https://code.google.com/p/msinttypes) and put it into c:\twister\vcbuild\include

6.) Create the environmental variable TWISTER_CORE and set it to c:\twister\twister-core

7.) Create the environmental variable LIBTORRENT and set it to c:\twister\twister-core\libtorrent

8.) Create the environmental variable OPENSSL and set it to c:\twister\twister-core\openssl-1.0.1c

9.) Create the environmental variable BOOST_ROOT and set it to c:\twister\twister-core\boost_1_43_0

10.) Create the environmental variable BERKELEY_DB and set it to c:\twister\twister-core\db-4.8.30.NC

11.) Create a Win32 Console Application project named "twisterd" in c:\twister\twister-core\vcbuild. Under Additional options, select Empty project.

12.) Add source files to the project in the following way:

	[Source Files]
	  (stuff from c:\twister\twister-core\src)
	  addrman.cpp
	  alert.cpp
	  bitcoind.cpp
	  bitcoinrpc.cpp
	  bloom.cpp
	  chainparams.cpp
	  checkpoints.cpp
	  core.cpp
	  crypter.cpp
	  db.cpp
	  hash.cpp
	  init.cpp
	  key.cpp
	  keystore.cpp
	  leveldb.cpp
	  main.cpp
	  net.cpp
	  netbase.cpp
	  noui.cpp
	  protocol.cpp
	  rpcblockchain.cpp
	  rpcdump.cpp
	  rpcmining.cpp
	  rpcnet.cpp
	  rpcrawtransaction.cpp
	  rpcwallet.cpp
	  script.cpp
	  scrypt-sse2.cpp
	  scrypt.cpp
	  sync.cpp
	  twister.cpp
	  twister_utils.cpp
	  txdb.cpp
	  util.cpp
	  version.cpp
	  wallet.cpp
	  walletdb.cpp
	  [leveldb] (stuff from c:\twister\twister-core\src\leveldb)
	    [db]
	      builder.cc
	      c.cc
	      dbformat.cc
	      db_impl.cc
	      db_iter.cc
	      filename.cc
	      log_reader.cc
	      log_writer.cc
	      memtable.cc
	      repair.cc
	      table_cache.cc
	      version_edit.cc
	      version_set.cc
	      write_batch.cc
	    [helpers]
	      [memenv]
	        memenv.cc
	    [port]
	      port_win.cc
	    [table]
	      block.cc
	      block_builder.cc
	      filter_block.cc
	      format.cc
	      iterator.cc
	      merger.cc
	      table.cc
	      table_builder.cc
	      two_level_iterator.cc
	    [util]
	      arena.cc
	      bloom.cc
	      cache.cc
	      coding.cc
	      comparator.cc
	      crc32c.cc
	      env.cc
	      env_win.cc
	      filter_policy.cc
	      hash.cc
	      histogram.cc
	      logging.cc
	      options.cc
	      status.cc
	      testharness.cc
	      testutil.cc
	  [libtorrent] (stuff from c:\twister\twister-core\libtorrent\src)
	    alert.cpp
	    alert_manager.cpp
	    allocator.cpp
	    asio.cpp
	    asio_ssl.cpp
	    assert.cpp
	    bandwidth_limit.cpp
	    bandwidth_manager.cpp
	    bandwidth_queue_entry.cpp
	    bloom_filter.cpp
	    broadcast_socket.cpp
	    bt_peer_connection.cpp
	    chained_buffer.cpp
	    connection_queue.cpp
	    ConvertUTF.cpp
	    create_torrent.cpp
	    disk_buffer_holder.cpp
	    disk_buffer_pool.cpp
	    disk_io_thread.cpp
	    entry.cpp
	    enum_net.cpp
	    error_code.cpp
	    escape_string.cpp
	    file.cpp
	    file_pool.cpp
	    file_storage.cpp
	    gzip.cpp
	    hasher.cpp
	    http_connection.cpp
	    http_parser.cpp
	    http_seed_connection.cpp
	    http_stream.cpp
	    http_tracker_connection.cpp
	    i2p_stream.cpp
	    identify_client.cpp
	    instantiate_connection.cpp
	    ip_filter.cpp
	    ip_voter.cpp
	    lazy_bdecode.cpp
	    logger.cpp
	    lsd.cpp
	    lt_trackers.cpp
	    magnet_uri.cpp
	    metadata_transfer.cpp
	    natpmp.cpp
	    packet_buffer.cpp
	    parse_url.cpp
	    peer_connection.cpp
	    pe_crypto.cpp
	    piece_picker.cpp
	    policy.cpp
	    puff.cpp
	    random.cpp
	    rsa.cpp
	    rss.cpp
	    session.cpp
	    session_impl.cpp
	    settings.cpp
	    sha1.cpp
	    smart_ban.cpp
	    socket_io.cpp
	    socket_type.cpp
	    socks5_stream.cpp
	    stat.cpp
	    storage.cpp
	    string_util.cpp
	    thread.cpp
	    time.cpp
	    timestamp_history.cpp
	    torrent.cpp
	    torrent_handle.cpp
	    torrent_info.cpp
	    tracker_manager.cpp
	    udp_socket.cpp
	    udp_tracker_connection.cpp
	    upnp.cpp
	    utf8.cpp
	    utp_socket_manager.cpp
	    utp_stream.cpp
	    ut_metadata.cpp
	    ut_pex.cpp
	    web_connection_base.cpp
	    web_peer_connection.cpp
	    GeoIP.c
	    mpi.c
	    [kademlia]
	      dht_get.cpp
	      dht_tracker.cpp
	      find_data.cpp
	      logging.cpp
	      node.cpp
	      node_id.cpp
	      refresh.cpp
	      routing_table.cpp
	      rpc_manager.cpp
	      traversal_algorithm.cpp

13.) Open properties for libtorrent\alert.cpp, go to C/C++ / Output Files, set Object File Name to $(IntDir)libtorrent_alert.obj

14.) Open properties for leveldb\util\bloom.cc, go to C/C++ / Output Files, set Object File Name to $(IntDir)leveldb_util_bloom.obj

15.) Open properties for leveldb\util\hash.cc, go to C/C++ / Output Files, set Object File Name to $(IntDir)leveldb_util_hash.obj

16.) Apply patches to source files (see below)

17.) Open the project Property Pages. (The instructions that follow are for the Win32 platform and debug configuration.)

18.) Add the following folders to Additional Include Directories under C/C++ / General:

	$(LIBTORRENT)\include
	$(BOOST_ROOT)
	$(OPENSSL)\inc32
	$(TWISTER_CORE)\vcbuild\include
	$(TWISTER_CORE)\src
	$(TWISTER_CORE)\src\leveldb
	$(TWISTER_CORE)\src\leveldb\include
	$(TWISTER_CORE)\src\leveldb\helpers
	$(BERKELEY_DB)\build_windows

19.) Add the following definitions to Preprocessor Definitions under C/C++ / Preprocessor:

	WIN32
	_DEBUG
	_CONSOLE
	WIN32_LEAN_AND_MEAN
	_WIN32_WINNT=0x0501
	_MSC_VER=1600
	_CRT_SECURE_NO_DEPRECATE
	BOOST_ASIO_HASH_MAP_BUCKETS=1021
	BOOST_FILESYSTEM_VERSION=2
	WITH_SHIPPED_GEOIP_H
	BOOST_ASIO_SEPARATE_COMPILATION
	BOOST_ASIO_ENABLE_CANCELIO
	TORRENT_USE_OPENSSL
	NOMINMAX
	__PRETTY_FUNCTION__=__FUNCTION__
	BOOST_HAS_STDINT_H
	LEVELDB_PLATFORM_WINDOWS
	OS_WIN

20.) Add the following folders to Additional Library Directories under Linker / General:

	$(BOOST_ROOT)\stage\lib
	$(OPENSSL)\out32
	$(BERKELEY_DB)\build_windows\Win32\Debug

21.) Add the following libs to Additional Dependencies under Linker / Input:

	libeay32.lib
	ssleay32.lib
	shlwapi.lib
	libdb48d.lib

22.) Copy libdb48d.dll from c:\twister\twister-core\db-4.8.30.NC\build_windows\Win32\Debug to c:\twister\twister-core\vcbuild\Debug

23.) Hit F5 and keep your fingers crossed (this will take some time)

## Building OpenSSL 1.0.1c ##

1.) Download and install ActivePerl (http://www.activestate.com/activeperl/downloads)

2.) Download and install NASM (http://www.nasm.us)

3.) Create the environmental variable NASM and set it to the NASM folder, e.g. C:\Program Files (x86)\NASM

4.) Start Visual Studio Command Prompt 

5.) Run the following commands:

	> cd C:\Program Files (x86)\Microsoft Visual Studio 10.0\VC\bin
	> vcvars32.bat 
	> cd c:\twister\twister-core\openssl-1.0.1c
	> perl Configure VC-WIN32 --prefix="%OPENSSL%"
	> "%NASM%"\nasmpath.bat
	> call ms\do_nasm
	> nmake -f ms\nt.makdir 

This produces exe and lib files in c:\twister\twister-core\openssl-1.0.1c\out32, and header files in c:\twister\twister-core\openssl-1.0.1c\inc32.

Note: Making vcvars32.bat work is a real pain in the a\*\*. It contains a lot of statements containing environmental variables surrounded by quotes such as <tt>set "PATH=%WindowsSdkDir%bin\NETFX 4.0 Tools;%WindowsSdkDir%bin;%PATH%"</tt> and <tt>if exist "%VSINSTALLDIR%Team Tools\Performance Tools" set ...</tt>. The problem occurs when the value of one of these variables also contains quotes. If you get an error saying something like "\Microsoft\Microsoft was unexpected at this time", your best bet is to make sure that the value of the environmental var PATH does not contain any quotes. 

## Building Boost 1.43.0 ##

1.) Start Visual Studio Command Prompt 

2.) Run the following commands: 

	> cd C:\Program Files (x86)\Microsoft Visual Studio 10.0\VC\bin
	> vcvars32.bat 
	> cd c:\twister\twister-core\boost_1_43_0
	> bootstrap.bat 
	> bjam toolset=msvc-10.0 --build-type=complete stage

This process takes some time. It produces lib files in c:\twister\twister-core\boost_1_43_0\stage\libs.

Note: If vcvars32.bat and/or bootstrap.bat fails, see the comment above on why this happens and how to fix it.

## Building Berkeley DB 4.8.30.NC ##

Coming soon...

(Patches also coming soon.)