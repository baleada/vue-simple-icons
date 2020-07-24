const simpleIcons = require('simple-icons'),
      { toComponentCase } = require('./util')
      

module.exports = function () {
  const replaceDictionary = [
          { regexp: /\./g, replacement: ' Dot ' },
          { regexp: /&/g, replacement: ' And ' },
          { regexp: /\+/g, replacement: ' Plus ' },
          { regexp: /[!’':]/g, replacement: '' },
          { regexp: /[àáâãä]/g, replacement: 'a' },
          { regexp: /[ç]/g, replacement: 'c' },
          { regexp: /[èéêë]/g, replacement: 'e' },
          { regexp: /[ìíîï]/g, replacement: 'i' },
          { regexp: /[ñ]/g, replacement: 'n' },
          { regexp: /[òóôõö]/g, replacement: 'o' },
          { regexp: /[ùúûü]/g, replacement: 'u' },
          { regexp: /[ýÿ]/g, replacement: 'y' },
          { regexp: /\s+/g, replacement: '-' },
        ],
        toComponentName = title => {
          return toComponentCase(
            replaceDictionary.reduce(
              (componentName, { regexp, replacement}) => componentName.replace(regexp, replacement),
              title
            )
          )
        },
        getIconArray = json => Object.keys(json).map(key => ({
          componentName: `Simple${toComponentName(key)}`,
          contents: json[key].svg.replace(/<svg.*?>/, '').replace(/<\/svg>/, ''),
          viewBox: '0 0 24 24',
        }))

  return getIconArray(simpleIcons)
}


