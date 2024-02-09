import convertColor from 'color-convert'
import { Contrast } from '@smockle/contrast'

const randomColor = function (): string[] {
  return [0, 0, 0].map(() => Number(Math.random() * 255).toFixed(0))
}

const randomRgbColor = function () {
  return 'rgb(' + randomColor().join(',') + ')'
}

const rgbToHex = (rgb: string) => {
  //hex() sig should work with ...rgb, however, was giving wrong results
  //and works correctly if pass the array in.
  //thus ignoring error
  // @ts-ignore
  return '#' + convertColor.rgb.hex(rgbToArr(rgb))
}

const hexToRgb = (hex: string) => {
  return 'rgb(' + convertColor.hex.rgb(hex).join(',') + ')'
}

const determineContrast = (rgb1: string, rgb2: string): string => {
  let contrast = new Contrast(rgbToHex(rgb1), rgbToHex(rgb2)).value.toFixed(1)

  if (contrast.charAt(contrast.length - 1) == '0') {
    contrast = contrast.split('.')[0]
  }

  const rating = Number(contrast) >= 7 ? ' AAA' : Number(contrast) >= 4.5 ? ' AA' : ''

  return contrast + rating
}

const rgbToArr = (rgb: string): [number, number, number] => {
  return rgb.replace(/[^\d,]/g, '').split(',') as unknown as [number, number, number]
}

export { randomColor, randomRgbColor, determineContrast, rgbToHex, hexToRgb }
