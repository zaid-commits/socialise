import React, { useState } from 'react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Switch } from './ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Config } from '../App'
import { useToast } from '@/hooks/use-toast'
import { Slider } from './ui/slider'
import { ColorPicker } from './ColorPicker'
interface ConfigPanelProps {
  config: Config
  setConfig: React.Dispatch<React.SetStateAction<Config>>
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({ config, setConfig }) => {
  const [url, setUrl] = useState('')
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({ ...config, [e.target.name]: e.target.value })
  }

  const handleSwitchChange = (name: keyof Config) => (checked: boolean) => {
    setConfig({ ...config, [name]: checked })
  }

  const handleSelectChange = (name: keyof Config) => (value: string) => {
    setConfig({ ...config, [name]: value })
  }

  const handleColorChange = (name: 'primaryColor' | 'secondaryColor') => (color: string) => {
    setConfig({ ...config, [name]: color })
  }

  const handleSliderChange = (value: number[]) => {
    // This could be used for adjusting image dimensions, opacity, etc.
    console.log('Slider value:', value[0])
  }

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`https://api.github.com/repos/${url}`)
      if (!response.ok) {
        throw new Error('Repository not found')
      }
      const data = await response.json()
      setConfig({
        ...config,
        owner: data.owner.login,
        repo: data.name,
        description: data.description || '',
      })
      toast({
        title: 'Repository fetched successfully',
        description: `Loaded data for ${data.full_name}`,
      })
    } catch (error) {
      toast({
        title: 'Error fetching repository',
        description: 'Please check the URL and try again',
        variant: 'destructive',
      })
    }
  }

  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setConfig({ ...config, backgroundImage: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
          </TabsList>
          <TabsContent value="basic">
            <form onSubmit={handleUrlSubmit} className="space-y-4">
              <div>
                <Label htmlFor="url">GitHub Repository URL</Label>
                <div className="flex space-x-2">
                  <Input
                    id="url"
                    placeholder="owner/repo"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                  <Button type="submit">Fetch</Button>
                </div>
              </div>
              <div>
                <Label htmlFor="owner">Owner</Label>
                <Input id="owner" name="owner" value={config.owner} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="repo">Repository</Label>
                <Input id="repo" name="repo" value={config.repo} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input id="description" name="description" value={config.description} onChange={handleInputChange} />
              </div>
            </form>
          </TabsContent>
          <TabsContent value="advanced">
            <div className="space-y-4">
              <div>
                <Label htmlFor="theme">Theme</Label>
                <Select onValueChange={handleSelectChange('theme')} defaultValue={config.theme}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="font">Font</Label>
                <Select onValueChange={handleSelectChange('font')} defaultValue={config.font}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inter">Inter</SelectItem>
                    <SelectItem value="Roboto">Roboto</SelectItem>
                    <SelectItem value="Open Sans">Open Sans</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="pattern">Pattern</Label>
                <Select onValueChange={handleSelectChange('pattern')} defaultValue={config.pattern}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pattern" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem  value="plus">Plus</SelectItem>
                    <SelectItem value="topography">Topography</SelectItem>
                    <SelectItem value="circuit-board">Circuit Board</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="layout">Layout</Label>
                <Select onValueChange={handleSelectChange('layout')} defaultValue={config.layout}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select layout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="compact">Compact</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="showLanguage">Show Language</Label>
                  <Switch id="showLanguage" checked={config.showLanguage} onCheckedChange={handleSwitchChange('showLanguage')} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="showStars">Show Stars</Label>
                  <Switch id="showStars" checked={config.showStars} onCheckedChange={handleSwitchChange('showStars')} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="showForks">Show Forks</Label>
                  <Switch id="showForks" checked={config.showForks} onCheckedChange={handleSwitchChange('showForks')} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="showIssues">Show Issues</Label>
                  <Switch id="showIssues" checked={config.showIssues} onCheckedChange={handleSwitchChange('showIssues')} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="showPullRequests">Show Pull Requests</Label>
                  <Switch id="showPullRequests" checked={config.showPullRequests} onCheckedChange={handleSwitchChange('showPullRequests')} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="showDescription">Show Description</Label>
                  <Switch id="showDescription" checked={config.showDescription} onCheckedChange={handleSwitchChange('showDescription')} />
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="style">
            <div className="space-y-4">
              <div>
                <Label htmlFor="primaryColor">Primary Color</Label>
                <ColorPicker color={config.primaryColor} onChange={handleColorChange('primaryColor')} />
              </div>
              <div>
                <Label htmlFor="secondaryColor">Secondary Color</Label>
                <ColorPicker color={config.secondaryColor} onChange={handleColorChange('secondaryColor')} />
              </div>
              <div>
                <Label htmlFor="backgroundImage">Background Image</Label>
                <Input id="backgroundImage" type="file" accept="image/*" onChange={handleBackgroundUpload} />
              </div>
              <div>
                <Label htmlFor="imageOpacity">Image Opacity</Label>
                <Slider
                  defaultValue={[100]}
                  max={100}
                  step={1}
                  onValueChange={handleSliderChange}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default ConfigPanel