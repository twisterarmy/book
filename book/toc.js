// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="about/index.html"><strong aria-hidden="true">1.</strong> About</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="about/releases.html"><strong aria-hidden="true">1.1.</strong> Releases</a></li><li class="chapter-item expanded "><a href="about/build.html"><strong aria-hidden="true">1.2.</strong> Build</a></li><li class="chapter-item expanded "><a href="about/contribution.html"><strong aria-hidden="true">1.3.</strong> Contribution</a></li><li class="chapter-item expanded "><a href="about/thanks.html"><strong aria-hidden="true">1.4.</strong> Thanks</a></li></ol></li><li class="chapter-item expanded "><li class="part-title">twister-core</li><li class="chapter-item expanded "><a href="twister-core/about.html"><strong aria-hidden="true">2.</strong> Introduction</a></li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.</strong> Install</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="twister-core/desktop-bundle.html"><strong aria-hidden="true">3.1.</strong> Desktop bundle</a></li><li class="chapter-item expanded "><a href="twister-core/build-from-source.html"><strong aria-hidden="true">3.2.</strong> Build from source</a></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">3.2.1.</strong> @twisterarmy branch</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="twister-core/twisterarmy/build-on-linux.html"><strong aria-hidden="true">3.2.1.1.</strong> Fedora / Debian / Ubuntu</a></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.2.2.</strong> @miguelfreitas branch</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="twister-core/miguelfreitas/compiling-twister-on-centos-6.html"><strong aria-hidden="true">3.2.2.1.</strong> CentOS 6</a></li><li class="chapter-item expanded "><a href="twister-core/miguelfreitas/compiling-for-windows.html"><strong aria-hidden="true">3.2.2.2.</strong> Windows</a></li><li class="chapter-item expanded "><a href="twister-core/miguelfreitas/build-native-windows-client-using-gitian.html"><strong aria-hidden="true">3.2.2.3.</strong> Client using Gitian</a></li><li class="chapter-item expanded "><a href="twister-core/miguelfreitas/building-twister-with-visual-studio-2010.html"><strong aria-hidden="true">3.2.2.4.</strong> Visual Studio 2010</a></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.2.3.</strong> Custom dependencies</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="twister-core/custom-dependencies.html"><strong aria-hidden="true">3.2.3.1.</strong> libboost / libdb</a></li><li class="chapter-item expanded "><a href="twister-core/libtorrent-build-on-ubuntu.html"><strong aria-hidden="true">3.2.3.2.</strong> libtorrent on Ubuntu</a></li></ol></li></ol></li></ol></li><li class="chapter-item expanded "><a href="twister-core/usage.html"><strong aria-hidden="true">4.</strong> Usage</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="twister-core/profile.html"><strong aria-hidden="true">4.1.</strong> Profile</a></li><li class="chapter-item expanded "><a href="twister-core/remote-node.html"><strong aria-hidden="true">4.2.</strong> Remote node</a></li><li class="chapter-item expanded "><a href="twister-core/administration.html"><strong aria-hidden="true">4.3.</strong> Administration</a></li><li class="chapter-item expanded "><a href="twister-core/performance.html"><strong aria-hidden="true">4.4.</strong> Performance</a></li><li class="chapter-item expanded "><a href="twister-core/yggdrasil.html"><strong aria-hidden="true">4.5.</strong> Yggdrasil / IPv6</a></li></ol></li><li class="chapter-item expanded "><a href="twister-core/support-the-network.html"><strong aria-hidden="true">5.</strong> Support the network</a></li><li class="chapter-item expanded "><a href="twister-core/contribution.html"><strong aria-hidden="true">6.</strong> Contribution</a></li><li class="chapter-item expanded affix "><li class="part-title">Mining tools</li><li class="chapter-item expanded "><a href="twisterad/index.html"><strong aria-hidden="true">7.</strong> twisterad</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="twisterad/install.html"><strong aria-hidden="true">7.1.</strong> Install</a></li><li class="chapter-item expanded "><a href="twisterad/usage.html"><strong aria-hidden="true">7.2.</strong> Usage</a></li></ol></li><li class="chapter-item expanded "><a href="cudaminer-twister/index.html"><strong aria-hidden="true">8.</strong> CudaMiner</a></li><li class="chapter-item expanded affix "><li class="part-title">Network tools</li><li class="chapter-item expanded "><a href="twister-seeder/index.html"><strong aria-hidden="true">9.</strong> twister-seeder</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="twister-seeder/install-options.html"><strong aria-hidden="true">9.1.</strong> Install options</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="twister-seeder/twisterarmy/install.html"><strong aria-hidden="true">9.1.1.</strong> @twisterarmy branch</a></li><li class="chapter-item expanded "><div><strong aria-hidden="true">9.1.2.</strong> @miguelfreitas branch</div></li></ol></li><li class="chapter-item expanded "><a href="twister-seeder/domain-setup.html"><strong aria-hidden="true">9.2.</strong> Domain setup</a></li><li class="chapter-item expanded "><a href="twister-seeder/usage-examples.html"><strong aria-hidden="true">9.3.</strong> Usage examples</a></li><li class="chapter-item expanded "><a href="twister-seeder/storage-location.html"><strong aria-hidden="true">9.4.</strong> Storage location</a></li><li class="chapter-item expanded "><a href="twister-seeder/announce-new-seed.html"><strong aria-hidden="true">9.5.</strong> Announce new seed</a></li><li class="chapter-item expanded "><a href="twister-seeder/troubleshooting.html"><strong aria-hidden="true">9.6.</strong> Troubleshooting</a></li></ol></li><li class="chapter-item expanded "><a href="twister-seedrs/index.html"><strong aria-hidden="true">10.</strong> twister-seedrs</a></li><li class="chapter-item expanded affix "><li class="part-title">Bridge tools</li><li class="chapter-item expanded "><a href="twister-rss-bot/index.html"><strong aria-hidden="true">11.</strong> twister-rss-bot</a></li><li class="chapter-item expanded affix "><li class="part-title">Other</li><li class="chapter-item expanded "><a href="popular-accounts-to-follow.html"><strong aria-hidden="true">12.</strong> Popular accounts to follow</a></li><li class="chapter-item expanded "><a href="twister白皮书.html"><strong aria-hidden="true">13.</strong> twister 白皮书</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
