import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from './ui/card'
import { Config } from '../App'

interface PreviewProps {
  config: Config
}

const Preview: React.FC<PreviewProps> = ({ config }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Set background
        ctx.fillStyle = config.theme === 'dark' ? '#000000' : '#ffffff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw pattern
        if (config.pattern === 'plus') {
          drawPlusPattern(ctx, canvas.width, canvas.height, config.secondaryColor)
        } else if (config.pattern === 'topography') {
          drawTopographyPattern(ctx, canvas.width, canvas.height, config.secondaryColor)
        }

        // Draw text
        ctx.font = `bold 48px ${config.font}`
        ctx.fillStyle = config.primaryColor
        ctx.textAlign = 'center'
        ctx.fillText(`${config.owner}/${config.repo}`, canvas.width / 2, 100)

        if (config.showDescription) {
          ctx.font = `24px ${config.font}`
          ctx.fillText(config.description, canvas.width / 2, 150)
        }

        // Draw stats
        const stats = []
        if (config.showLanguage) stats.push('JavaScript')
        if (config.showStars) stats.push('★ 1.2k')
        if (config.showForks) stats.push('⑂ 234')
        if (config.showIssues) stats.push('◯ 15')
        if (config.showPullRequests) stats.push('⇆ 5')

        ctx.font = `18px ${config.font}`
        const statsY = canvas.height - 50
        stats.forEach((stat, index) => {
          const x = (canvas.width / (stats.length + 1)) * (index + 1)
          ctx.fillText(stat, x, statsY)
        })
      }
    }
  }, [config])

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <canvas
            ref={canvasRef}
            width={1200}
            height={600}
            className="w-full h-auto"
          />
        </CardContent>
      </Card>
    </motion.div>
  )
}

function drawPlusPattern(ctx: CanvasRenderingContext2D, width: number, height: number, color: string) {
  ctx.strokeStyle = color
  ctx.lineWidth = 1
  const step = 20
  for (let x = 0; x < width; x += step) {
    for (let y = 0; y < height; y += step) {
      ctx.beginPath()
      ctx.moveTo(x + step / 2, y)
      ctx.lineTo(x + step / 2, y + step)
      ctx.moveTo(x, y + step / 2)
      ctx.lineTo(x + step, y + step / 2)
      ctx.stroke()
    }
  }
}

function drawTopographyPattern(ctx: CanvasRenderingContext2D, width: number, height: number, color: string) {
  ctx.strokeStyle = color
  ctx.lineWidth = 1
  for (let y = 0; y < height; y += 5) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    for (let x = 0; x < width; x += 10) {
      ctx.lineTo(x, y + Math.sin(x * 0.01) * 5)
    }
    ctx.stroke()
  }
}

export default Preview