import { createCss } from '@stitches/react';
import { CSSProperties } from 'react';

export const { styled, css, global, keyframes } = createCss({
  prefix: '',
  insertionMethod: 'append',
  theme: {
    colors: {
      primary: '#38DCD5',
      primary200: '#60E3DD',
      primaryOpacity: 'rgba(56, 220, 213, 0.2)',
      primary600: 'rgba(56, 220, 213, 0.6)',
      info: '#2C2F45',
      info200: '#414458',
      info400: '#505360',
      bg: '#191B29',
      bg1: '#1C1F2E',
      bg2: '#2D2F3F',
      bg3: 'rgba(0, 0, 0, 0.2)',
      bg4: '#212333',
      bg5: 'rgba(38,42,59,0.8)',
      bg6: 'rgba(0, 0, 0, 0.8)',
      bg7: '#262A3B',
      bg8: '#242838',
      bg9: 'rgba(255, 255, 255, 0.1)',
      textPrimary: '#fff',
      textLight: 'rgba(250, 252, 255, 0.5)',
      textInfo: '#E6BF93',
      textGray: '#ccc',
      textGray200: '#E0E0E0',
      textGray900: '#999',
      borderPrimary: 'rgba(255, 255, 255, 0.2)',
      textWarn: '#E84D4D'
    },
    space: {
      $0: '0',
      $1: '0.25rem',
      $2: '0.5rem',
      $3: '0.75rem',
      $4: '1rem',
      $5: '1.25rem',
      $6: '1.5rem',
      $7: '1.75rem',
      $8: '2rem',
      autoX: '0 auto'
    },
    fontSizes: {
      $xs: '0.75rem',
      $sm: '0.875rem',
      $base: '1rem',
      $lg: '1.125rem',
      $xl: '1.25rem',
      $2xl: '1.5rem',
      $3xl: '1.875rem',
      $4xl: '2.25rem',
      $5xl: '3rem',
      $6xl: '4rem'
    }
  },
  media: {
    xss: `(min-width: 468px)`,
    xs: `(min-width: 640px)`,
    sm: `(min-width: 768px)`,
    md: '(min-width: 992px)',
    lg: `(min-width: 1024px)`,
    xl: `(min-width: 1280px)`,
    xxl: `(min-width: 1440px)`
  },
  utils: {
    m: (config) => (value) => ({
      marginTop: value,
      marginBottom: value,
      marginLeft: value,
      marginRight: value
    }),
    mt: (config) => (value) => ({
      marginTop: value
    }),
    mr: (config) => (value) => ({
      marginRight: value
    }),
    mb: (config) => (value) => ({
      marginBottom: value
    }),
    ml: (config) => (value) => ({
      marginLeft: value
    }),
    mx: (config) => (value) => ({
      marginLeft: value,
      marginRight: value
    }),
    my: (config) => (value) => ({
      marginTop: value,
      marginBottom: value
    }),
    p: (config) => (value) => ({
      paddingTop: value,
      paddingBottom: value,
      paddingLeft: value,
      paddingRight: value
    }),
    pt: (config) => (value) => ({
      paddingTop: value
    }),
    pr: (config) => (value) => ({
      paddingRight: value
    }),
    pb: (config) => (value) => ({
      paddingBottom: value
    }),
    pl: (config) => (value) => ({
      paddingLeft: value
    }),
    px: (config) => (value) => ({
      paddingLeft: value,
      paddingRight: value
    }),
    py: (config) => (value) => ({
      paddingTop: value,
      paddingBottom: value
    }),
    size: (config) => (value) => ({
      width: value,
      height: value
    }),
    linearGradient: (config) => (value) => ({
      backgroundImage: `linear-gradient(${value})`
    }),
    br: (config) => (value) => ({
      borderRadius: value
    }),
    flexBetweenCenter: (config) => (value: CSSProperties['flexDirection'] = 'row') => ({
      flexDirection: value,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }),
    flexCenterCenter: (config) => (value: CSSProperties['flexDirection'] = 'row') => ({
      flexDirection: value,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    })
  }
});
