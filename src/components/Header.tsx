import React from 'react'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { MoonIcon, SunIcon, GithubIcon } from 'lucide-react'
import { useTheme } from './theme-provider'

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme()

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="border-b border-border"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Socialify Pro
          </h1>
        </motion.div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a href="https://github.com/yourusername/socialify-pro" target="_blank" rel="noopener noreferrer">
              <GithubIcon className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </motion.header>
  )
}

export default Header