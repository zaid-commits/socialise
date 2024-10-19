import React, { useState } from 'react'
import Header from './components/Header'
import Preview from './components/Preview'
import ConfigPanel from './components/Configpanel'
import { Toaster } from './components/ui/toaster'
import { ThemeProvider } from './components/theme-provider'
import { Button } from './components/ui/button'
import { Download, Share2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export interface Config {
  owner: string
  repo: string
  description: string
  logo: string
  font: string
  pattern: string
  theme: 'dark' | 'light'
  layout: 'default' | 'compact'
  showLanguage: boolean
  showStars: boolean
  showForks: boolean
  showIssues: boolean
  showPullRequests: boolean
  showDescription: boolean
  primaryColor: string
  secondaryColor: string
  backgroundImage: string | null
}

const App: React.FC = () => {
  const [config, setConfig] = useState<Config>({
    owner: 'github',
    repo: 'octocat',
    description: 'The amazing Octocat repository',
    logo: '',
    font: 'Inter',
    pattern: 'plus',
    theme: 'dark',
    layout: 'default',
    showLanguage: true,
    showStars: true,
    showForks: true,
    showIssues: true,
    showPullRequests: true,
    showDescription: true,
    primaryColor: '#000000',
    secondaryColor: '#ffffff',
    backgroundImage: null,
  })

  const { toast } = useToast()

  const handleDownload = () => {
    // Implement actual download logic here
    toast({
      title: "Image Downloaded",
      description: "Your Socialify image has been downloaded.",
    })
  }

  const handleShare = () => {
    navigator.clipboard.writeText("https://socialify.pro/your-unique-link")
    toast({
      title: "Link Copied",
      description: "Shareable link copied to clipboard.",
    })
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-8">Socialify Pro</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="bg-card rounded-lg shadow p-4">
                <Preview config={config} />
              </div>
              <div className="flex justify-center space-x-4">
                <Button onClick={handleDownload} className="w-full sm:w-auto">
                  <Download className="mr-2 h-4 w-4" /> Download
                </Button>
                <Button onClick={handleShare} variant="outline" className="w-full sm:w-auto">
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
              </div>
            </div>
            <div className="bg-card rounded-lg shadow p-4">
              <ConfigPanel config={config} setConfig={setConfig} />
            </div>
          </div>
        </main>
      </div>
      <Toaster />
    </ThemeProvider>
  )
}

export default App
