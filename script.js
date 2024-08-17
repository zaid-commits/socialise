new Vue({
    el: '#app',
    data: {
        repoUrl: '',
        repoData: null,
        cardTheme: 'light',
        cardFont: 'Poppins',
        cardLayout: 'classic',
        showLanguage: true,
        useGradient: false,
        sharableImageUrl: '',
        languageColors: {
            JavaScript: '#f1e05a',
            Python: '#3572A5',
            Java: '#b07219',
            Ruby: '#701516',
            Go: '#00ADD8',
            TypeScript: '#2b7489',
            PHP: '#4F5D95',
            CPlusPlus: '#f34b7d',
            CSharp: '#178600',
            Swift: '#ffac45',
            // Add other languages as needed
        },
        mobileMenuOpen: false,
        scrolled: false,
    },
    methods: {
        async fetchRepoData() {
            try {
                const repoPath = this.repoUrl.split('github.com/')[1];
                const response = await axios.get(`https://api.github.com/repos/${repoPath}`);
                this.repoData = response.data;
                this.animateCard();
            } catch (error) {
                console.error('Error fetching repo data:', error);
                alert('Error fetching repository data. Please check the URL and try again.');
            }
        },
        async downloadImage() {
            const element = document.querySelector('.repo-card');
            const canvas = await html2canvas(element, {
                backgroundColor: this.cardTheme === 'light' ? '#ffffff' :
                                 this.cardTheme === 'dark' ? '#24292e' : '#0d1117',
                scale: 2, // Increase scale for higher resolution
                useCORS: true // Ensure images from different origins are included
            });
            const dataURL = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'repo-card.png';
            link.href = dataURL;
            link.click();
            this.sharableImageUrl = dataURL;
        },
        

        copyToClipboard() {
            const urlInput = document.querySelector('.url-container input');
            urlInput.select();
            document.execCommand('copy');
            alert('URL copied to clipboard!');
        },
        scrollToGenerator() {
            const generatorSection = document.getElementById('generator');
            generatorSection.scrollIntoView({ behavior: 'smooth' });
        },
        toggleMobileMenu() {
            this.mobileMenuOpen = !this.mobileMenuOpen;
        },
        handleScroll() {
            this.scrolled = window.scrollY > 50;
        },
        animateCard() {
            gsap.from('.repo-card', {
                opacity: 0,
                y: 50,
                duration: 0.5,
                ease: 'power2.out',
            });
        },
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        
        gsap.registerPlugin(ScrollTrigger);
        
        gsap.from('.hero h1', {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: '.hero',
                start: 'top center',
            },
        });

        gsap.from('.hero p', {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: 0.5,
            scrollTrigger: {
                trigger: '.hero',
                start: 'top center',
            },
        });

        gsap.from('.hero button', {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: 1,
            scrollTrigger: {
                trigger: '.hero',
                start: 'top center',
            },
        });
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
});
