import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Button } from "./ui/button"
import { Config } from '../App'
import { Card, CardContent } from "./ui/card"

interface ConfigFormProps {
  config: Config
  setConfig: React.Dispatch<React.SetStateAction<Config>>
}

const ConfigForm: React.FC<ConfigFormProps> = ({ config, setConfig }) => {
  const [url, setUrl] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({ ...config, [e.target.name]: e.target.value })
  }

  const handleSwitchChange = (name: keyof Config) => (checked: boolean) => {
    setConfig({ ...config, [name]: checked })
  }

  const handleSelectChange = (name: keyof Config) => (value: string) => {
    setConfig({ ...config, [name]: value })
  }

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`https://api.github.com/repos/${url}`)
      const data = await response.json()
      setConfig({
        ...config,
        owner: data.owner.login,
        repo: data.name,
        description: data.description || '',
      })
    } catch (error) {
      console.error('Error fetching repository data:', error)
    }
  }

  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 max-w-2xl mx-auto"
    >
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <form onSubmit={handleUrlSubmit} className="space-y-4">
            <Label htmlFor="url" className="text-gray-300">GitHub Repository URL</Label>
            <div className="flex space-x-2">
              <Input
                id="url"
                placeholder="owner/repo"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="bg-gray-800 border-gray-700 text-gray-200"
              />
              <Button type="submit" className="bg-gray-700 hover:bg-gray-600 text-gray-200">Fetch</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6 space-y-4">
          <div>
            <Label htmlFor="owner" className="text-gray-300">Owner</Label>
            <Input id="owner" name="owner" value={config.owner} onChange={handleInputChange} className="bg-gray-800 border-gray-700 text-gray-200" />
          </div>
          <div>
            <Label htmlFor="repo" className="text-gray-300">Repository</Label>
            <Input id="repo" name="repo" value={config.repo} onChange={handleInputChange} className="bg-gray-800 border-gray-700 text-gray-200" />
          </div>
          <div>
            <Label htmlFor="description" className="text-gray-300">Description</Label>
            <Input id="description" name="description" value={config.description} onChange={handleInputChange} className="bg-gray-800 border-gray-700 text-gray-200" />
          </div>
          <div>
            <Label htmlFor="theme" className="text-gray-300">Theme</Label>
            <Select onValueChange={handleSelectChange('theme')} defaultValue={config.theme}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="light">Light</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="font" className="text-gray-300">Font</Label>
            <Select onValueChange={handleSelectChange('font')} defaultValue={config.font}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200">
                <SelectValue placeholder="Select font" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="Inter">Inter</SelectItem>
                <SelectItem value="Roboto">Roboto</SelectItem>
                <SelectItem value="Open Sans">Open Sans</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="pattern" className="text-gray-300">Pattern</Label>
            <Select onValueChange={handleSelectChange('pattern')} defaultValue={config.pattern}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200">
                <SelectValue placeholder="Select pattern" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="Plus">Plus</SelectItem>
                <SelectItem value="Circuit Board">Circuit Board</SelectItem>
                <SelectItem value="Diagonal Stripes">Diagonal Stripes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="showLanguage" className="text-gray-300">Show Language</Label>
            <Switch id="showLanguage" checked={config.showLanguage} onCheckedChange={handleSwitchChange('showLanguage')} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="showStars" className="text-gray-300">Show Stargazers</Label>
            <Switch id="showStars" checked={config.showStars} onCheckedChange={handleSwitchChange('showStars')} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="showForks" className="text-gray-300">Show Forks</Label>
            <Switch id="showForks" checked={config.showForks} onCheckedChange={handleSwitchChange('showForks')} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="showIssues" className="text-gray-300">Show Issues</Label>
            <Switch id="showIssues" checked={config.showIssues} onCheckedChange={handleSwitchChange('showIssues')} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="showPullRequests" className="text-gray-300">Show Pull Requests</Label>
            <Switch id="showPullRequests" checked={config.showPullRequests} onCheckedChange={handleSwitchChange('showPullRequests')} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default ConfigForm