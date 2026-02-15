        // Dark mode management
        function setDarkMode(isDark) {
            const body = document.body;
            const modeSwitchBtn = document.getElementById('modeSwitch');
            const icon = document.querySelector('#modeSwitch i');
            const prismLight = document.querySelector('link[href*="prism.min.css"]');
            const prismDark = document.getElementById('prism-dark');

            if (isDark) {
                body.classList.add("dark-mode");
                prismLight.disabled = true;
                prismDark.disabled = false;
                
                if (modeSwitchBtn) {
                    modeSwitchBtn.classList.remove('btn-outline-dark');
                    modeSwitchBtn.classList.add('btn-outline-light');
                }
                if (icon) icon.className = 'fas fa-sun';
            } else {
                body.classList.remove("dark-mode");
                prismLight.disabled = false;
                prismDark.disabled = true;
                
                if (modeSwitchBtn) {
                    modeSwitchBtn.classList.remove('btn-outline-light');
                    modeSwitchBtn.classList.add('btn-outline-dark');
                }
                if (icon) icon.className = 'fas fa-moon';
            }
        }

        function toggleMode() {
            const isDark = !document.body.classList.contains("dark-mode");
            setDarkMode(isDark);
        }

        function getPreferredDarkMode() {
            return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        }

        setDarkMode(getPreferredDarkMode());

        const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        systemThemeQuery.addEventListener('change', (event) => {
            setDarkMode(event.matches);
        });

        // Copy code functionality
        function copyCode(button) {
            const codeBlock = button.nextElementSibling;
            const text = codeBlock.textContent;

            navigator.clipboard.writeText(text).then(() => {
                const originalIcon = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i>';
                button.style.background = 'rgba(40, 167, 69, 0.3)';

                setTimeout(() => {
                    button.innerHTML = originalIcon;
                    button.style.background = 'rgba(255,255,255,0.1)';
                }, 2000);
            });
        }

        // Scroll to top functionality
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Show/hide scroll to top button and floating TOC
        window.addEventListener('scroll', () => {
            const scrollBtn = document.getElementById('scrollToTop');
            const floatingToc = document.getElementById('floatingToc');

            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('show');
                if (window.innerWidth > 768) {
                    floatingToc.classList.add('show');
                }
            } else {
                scrollBtn.classList.remove('show');
                floatingToc.classList.remove('show');
            }
        });

        function setupTocSmoothScroll() {
            document.querySelectorAll('.toc-item').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId);

                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }

        function setupHashTabBehavior() {
            const hash = window.location.hash;
            if (hash) {
                const tabButton = document.querySelector(`[data-bs-target="${hash}"]`);
                if (tabButton) {
                    const tab = new bootstrap.Tab(tabButton);
                    tab.show();
                }
            }
        }

        function setupTabHistoryListeners() {
            document.querySelectorAll('[data-bs-toggle="pill"]').forEach(tab => {
                tab.addEventListener('shown.bs.tab', (e) => {
                    const target = e.target.getAttribute('data-bs-target');
                    history.replaceState(null, null, target);
                });
            });
        }

        function initToolCardHover() {
            const toolCards = document.querySelectorAll('.tool-card');

            toolCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'translateY(-8px) scale(1.02)';
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(0) scale(1)';
                });
            });
        }

        document.addEventListener('DOMContentLoaded', () => {
            Prism.highlightAll();
            setupTocSmoothScroll();
            setupHashTabBehavior();
            setupTabHistoryListeners();
            initToolCardHover();
            addProgressIndicator();
        });

        // Add loading animation for better UX
        window.addEventListener('load', () => {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease';

            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });

        // Add progress indicator for long code blocks
        function addProgressIndicator() {
            const codeBlocks = document.querySelectorAll('.code-block');

            codeBlocks.forEach(block => {
                const existingIndicator = block.querySelector('.scroll-indicator');
                if (existingIndicator) {
                    existingIndicator.remove();
                }

                if (block.scrollWidth > block.clientWidth) {
                    const indicator = document.createElement('div');
                    indicator.className = 'scroll-indicator';
                    indicator.innerHTML = '<i class="fas fa-arrows-alt-h"></i> Scroll horizontally';
                    indicator.style.cssText = `
                        position: absolute;
                        bottom: 5px;
                        right: 50px;
                        font-size: 0.8rem;
                        color: rgba(255,255,255,0.6);
                        pointer-events: none;
                    `;
                    block.appendChild(indicator);
                }
            });
        }

        window.addEventListener('resize', addProgressIndicator);