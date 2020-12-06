import React from 'react'
import { Image } from 'react-native'
import { presets } from './wallpaper.presets'
import { WallpaperProps } from './wallpaper.props'

export const defaultBackgroundImage = require('./bg.png')
export const backgroundImageSky = require('./sky.jpg')
export const backgroundImageTriangles = require('./triangles.jpg')
export const backgroundImageMountains = require('./mountains.jpg')

export const wallpapers = [
  // defaultBackgroundImage,
  backgroundImageSky,
  backgroundImageTriangles,
  backgroundImageMountains,
]
export const randomWallpaper = () => {
  return wallpapers[Math.floor(Math.random() * wallpapers.length)]
}
/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Wallpaper(props: WallpaperProps) {
  // grab the props
  const { preset = 'stretch', style: styleOverride, backgroundImage } = props

  // assemble the style
  const presetToUse = presets[preset] || presets.stretch
  const style = { ...presetToUse, ...styleOverride }

  // figure out which image to use
  const source = backgroundImage || defaultBackgroundImage

  return <Image source={source} style={style} />
}
