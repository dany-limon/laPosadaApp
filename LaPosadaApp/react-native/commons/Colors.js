export const main = '#722f37'
export const selected = '#722f3711'
export const backgroundList = '#e9e9e9'

export const black = '#000000'
export const white = '#FFFFFF'
export const gray = 'gray'
export const lightGray = '#A0a0a0'
export const graySepator = '#DFDFDF'


export function getColorFromType(type){

  let t = (type?type.toUpperCase().trim():'')
  if (t=='MENAJE'){
    return 'burlywood'
  }else if (t=='ROMANOS'){
    return 'dimgray'
  }else if (t=='LIMPIEZA'){
    return 'cornflowerblue'
  }else if (t=='ELECTRODOMÉSTICOS'){
    return 'deeppink'
  }else if (t=='MOBILIARIO'){
    return 'forestgreen'
  }else if (t=='HERRAMIENTAS'){
    return 'goldenrod'
  }else if (t=='OTROS'){
    return 'slateblue'
  }else{
    return 'black'
  }
}
