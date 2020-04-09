import React from 'react'
import { theme } from '@chakra-ui/core'

const customIcons = {
  menu: {
    path: (
      <path
      fill="currentColor"
        d="M3.314,4.8h13.372c0.41,0,0.743-0.333,0.743-0.743c0-0.41-0.333-0.743-0.743-0.743H3.314
								c-0.41,0-0.743,0.333-0.743,0.743C2.571,4.467,2.904,4.8,3.314,4.8z M16.686,15.2H3.314c-0.41,0-0.743,0.333-0.743,0.743
								s0.333,0.743,0.743,0.743h13.372c0.41,0,0.743-0.333,0.743-0.743S17.096,15.2,16.686,15.2z M16.686,9.257H3.314
								c-0.41,0-0.743,0.333-0.743,0.743s0.333,0.743,0.743,0.743h13.372c0.41,0,0.743-0.333,0.743-0.743S17.096,9.257,16.686,9.257z"
      />
    ),
    viewBox: '0 0 20 20'
  }
}

const customTheme = {
  ...theme,
  icons: {
    ...theme.icons,
    ...customIcons
  },
  colors: {
    ...theme.colors,
    color1: "#718096",//gris oscuro
    color2: "#CBD5E0",//gris claro
    color3: "#4FD1C5",//aqua claro
    color5:"#2C7A7B",//aqua oscuro
    color6:"#E6FFFA",//aqua pastel blanco
    color4: "#FFFFFF"//blanco
  }
}

export default customTheme