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
        languageColors: {
            JavaScript: '#f1e05a',
            Python: '#3572A5',
            Java: '#b07219',
            Ruby: '#701516',
            Go: '#00ADD8',
            TypeScript: '#2b7489',
            PHP: '#4F5D95',
            CPP: '#f34b7d',
            CSharp: '#178600',
            Swift: '#ffac45',
            // Add more languages as needed
        }
    },
    methods: {
        async fetchRepoData() {
            try {
                const repoPath = this.repoUrl.split('github.com/')[1];
                const response = await axios.get(`https://api.github.com/repos/${repoPath}`);
                this.repoData = response.data;
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
                scale: 2 // Increase resolution
            });
            const link = document.createElement('a');
            link.download = 'repo-card.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        }
    }
});