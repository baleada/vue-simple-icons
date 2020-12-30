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
      icons = getIcons({
        set: 'Simple',
        dirs: ['icons'],
        basePath: 'git_modules/simple-icons',
        test: ({ id }) => simpleIconsEntries.find(([_, { slug }]) => slug === parse(id).name)?.[0],
        toSnakeCased: ({ name }) => replacements.reduce(
          (snakeCased, { re, replacement }) => snakeCased.replace(re, replacement), 
          simpleIconsEntries.find(([_, { slug }]) => slug === name)?.[0]?.normalize?.("NFD")
        ),
      }),
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
      }),
      shared = configureable('rollup')
        .input('src/index.js')
        .resolve()
        .external([/^vue$/])
        .vue(),
      esm = shared
        .delete({ targets: 'lib/*' })
        .virtual.iconComponentIndex({ icons })
        .virtual.iconComponents({ icons })
        .esm({ file: 'lib/index.js', target: 'browser' }),
      liteEsm = shared
        .delete({ targets: 'lite/*' })
        .virtual.iconComponentIndex({ icons: iconsLite })
        .virtual.iconComponents({ icons: iconsLite })
        .esm({ file: 'lite/index.js', target: 'browser' })

export default [
  esm.configure(),
  liteEsm.configure(),
]
