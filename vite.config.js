import { configureable, getIcons } from '@baleada/prepare'
import { parse } from 'path'
import simpleIcons from 'simple-icons'

const replacements = [
        // remove diacritics
        { re: /[\u0300-\u036f]/g, replacement: '' },
        { re: /\./g, replacement: ' Dot ' },
        { re: /&/g, replacement: ' And ' },
        { re: /\+/g, replacement: ' Plus ' },
        { re: /[!’':]/g, replacement: '' },
        { re: /\s+/g, replacement: '-' },
      ],
      simpleIconsEntries = Object.entries(simpleIcons),
      lite = [
        'github',
        'twitter',
      ],
      iconsLite = getIcons({
        set: 'Simple',
        dirs: ['icons'],
        basePath: 'git_modules/simple-icons',
        test: ({ id }) => lite.includes(parse(id).name.toLowerCase()),
        toSnakeCased: ({ name }) => replacements.reduce(
          (snakeCased, { re, replacement }) => snakeCased.replace(re, replacement), 
          simpleIconsEntries.find(([_, { slug }]) => slug === name)?.[0]?.normalize?.("NFD")
        ),
      })

export default configureable('vite')
  .alias({
    '/@src/': `/src`,
  })
  .koa(configureable => 
    configureable
      .virtual.iconComponentIndex({ icons: iconsLite })
      .virtual.iconComponents({ icons: iconsLite })
      .configure()
  )
  .configure()
