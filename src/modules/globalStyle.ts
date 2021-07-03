import { styled, keyframes, global } from './index';

export const antdPopoverStyle = global({
  '.ant-popover-placement-top>.ant-popover-content>.ant-popover-arrow': {
    borderColor: '#45bcb8 !important'
  },
  '.ant-popover-placement-right>.ant-popover-content>.ant-popover-arrow': {
    borderColor: '#45bcb8 !important'
  },
  '.ant-popover-placement-bottom>.ant-popover-content>.ant-popover-arrow': {
    borderColor: '#45bcb8 !important'
  },
  '.ant-popover-inner': {
    backgroundColor: '#45bcb8 !important'
  },
  '.ant-popover-inner-content': {
    fontSize: '13px !important',
    color: '#fff !important'
  }
});

export const Wrapper = styled('div', {
  height: '100%',
  margin: 'auto',
  maxWidth: '90%',
  '@md': {
    maxWidth: '942px'
  },
  a: {
    cursor: 'pointer',
    '&:hover': {
      color: '$primary'
    }
  }
});

const rotate = keyframes({
  from: { transform: 'rotatez(0deg)' },
  to: { transform: 'rotatez(360deg)' }
});

export const Button = styled('button', {
  outline: 'none',
  height: '40px',
  fontSize: '1rem',
  cursor: 'pointer',
  border: 'none',
  fontFamily: 'Montserrat',
  variants: {
    size: {
      mini: {
        width: '94px'
      },
      small: {
        width: '125px'
      },
      medium: {
        width: '180px'
      },
      large: {
        width: '390px'
      }
    },
    color: {
      primary: {
        backgroundColor: '$primary',
        color: '$dark1',
        fontWeight: 600,
        '&:hover': {
          backgroundColor: '$primary600'
        },
        '&:disabled': {
          backgroundColor: '$info400',
          color: '$textGray900',
          cursor: 'not-allowed'
        },
        '&:focus': {
          backgroundColor: '$primary200'
        }
      },
      info: {
        backgroundColor: '$info',
        color: '$primary',
        '&:hover': {
          backgroundColor: '$info'
        },
        '&:disabled': {
          backgroundColor: '$info400',
          color: '$textGray900',
          cursor: 'not-allowed'
        }
      },
      normal: {
        backgroundColor: '$info',
        color: '$textLight',
        borderLeft: '1px solid $borderPrimary',
        fontWeight: 600,
        '&:hover': {
          background: '$bg4',
          color: '$primary',
          borderLeft: '1px solid $primary'
        }
      },
      active: {
        background: '$bg4',
        color: '$primary',
        borderLeft: '1px solid $primary',
        fontWeight: 600
      },
      approve: {
        background: '$bg4',
        color: '$primary',
        border: '1px solid $primary',
        fontWeight: 600,
        '&:hover': {
          background: '$bg4',
          color: '$primary',
          border: '1px solid $primary'
        },
        '&:disabled': {
          backgroundColor: '$info',
          color: '$textLight',
          border: '1px solid $borderPrimary',
          cursor: 'not-allowed'
        }
      }
    },
    responsive: {
      mini: {
        width: '56px',
        height: '24px',
        '@md': {
          width: '94px',
          height: 40
        }
      },
      medium: {
        width: 106,
        height: 33,
        fontSize: '0.875rem',
        '@md': {
          width: 180,
          height: 40,
          fontSize: '1rem'
        }
      },
      lg: {
        width: 138,
        height: 30,
        fontSize: '0.75rem',
        '@md': {
          width: 180,
          height: 40,
          fontSize: '1rem'
        }
      },
      large: {
        width: '100%',
        height: 30,
        '@md': {
          width: 390,
          height: 40
        }
      }
    },
    status: {
      normal: {
        opacity: 1,
        pointerEvents: 'auto',
        cursor: 'pointer',
        '&:before': {
          width: 0
        }
      },
      loading: {
        opacity: 0.8,
        cursor: 'default',
        pointerEvents: 'none',
        '&:before': {
          display: 'inline-block',
          content: '',
          width: '1rem',
          height: '1rem',
          marginRight: '0.5rem',
          borderRadius: '50%',
          verticalAlign: '-10%',
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%)',
          border: '2px solid $textPrimary',
          animation: `${rotate} 1s linear infinite`
        }
      }
    }
  }
});

export const LoadingIcon = styled('div', {
  opacity: 0.8,
  cursor: 'default',
  pointerEvents: 'none',
  '&:before': {
    display: 'inline-block',
    content: '',
    width: '1.5rem',
    height: '1.5rem',
    marginRight: '0.5rem',
    borderRadius: '50%',
    verticalAlign: '-10%',
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 70%, 0% 70%)',
    border: '2px solid $primary',
    animation: `${rotate} 1s linear infinite`
  }
})

export const Text = styled('div', {
  fontFamily: 'IBM Plex Sans',
  fontWeight: 'normal',
  textAlign: 'left',
  cursor: 'default',
  variants: {
    size: {
      mini: {
        fontSize: '0.75rem'
      },
      md: {
        fontSize: '0.875rem'
      },
      small: {
        fontSize: '1rem'
      },
      lg: {
        fontSize: '1.125rem'
      },
      medium: {
        fontSize: '1.5rem'
      },
      large: {
        fontSize: '2.25rem'
      }
    },
    color: {
      primary: {
        color: '$primary'
      },
      yellow: {
        color: '$textInfo'
      },
      gray: {
        color: '$textGray'
      },
      white: {
        color: '$textPrimary'
      },
      light: {
        color: '$textLight'
      },
      black: {
        color: '$bg1'
      },
      warning: {
        color: '$textWarn'
      },
      lightGray: {
        color: '$textGray200'
      }
    },
    weight: {
      light: {
        fontWeight: 300
      },
      normal: {
        fontWeight: 400
      },
      medium: {
        fontWeight: 500
      },
      semibold: {
        fontWeight: 600
      },
      bold: {
        fontWeight: 'bold'
      }
    },
    family: {
      ibm: {
        fontFamily: 'IBM Plex Sans'
      },
      Montserrat: {
        fontFamily: 'Montserrat'
      }
    },
    cursor: {
      pointer: {
        cursor: 'pointer',
        '&:hover': {
          color: '$primary'
        }
      },
      none: {
        cursor: 'auto'
      }
    },
    hover: {
      light: {
        '&:hover': {
          color: '$primary'
        }
      },
      white: {
        '&:hover': {
          color: '$textPrimary'
        }
      }
    },
    display: {
      inline: {
        display: 'inline-block'
      }
    },
    loading: {
      show: {
        position: 'relative',
        '&::before': {}
      }
    },
    align: {
      center: {
        textAlign: 'center'
      },
      left: {
        textAlign: 'left'
      },
      right: {
        textAlign: 'right'
      }
    },
    overflow: {
      truncate: {
        width: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whitespace: 'nowrap'
      }
    },
    responsive: {
      base: {
        display: 'none',
        '@md': {
          width: '20%',
          display: 'block'
        }
      },
      sm: {
        fontSize: '0.75rem',
        '@md': {
          fontSize: '0.875rem'
        }
      },
      md: {
        fontSize: '0.75rem',
        '@md': {
          fontSize: '1rem'
        }
      },
      lg: {
        fontSize: '0.875rem',
        '@md': {
          fontSize: '1.125rem'
        }
      },
      large: {
        fontSize: '2rem',
        '@md': {
          fontSize: '2.25rem'
        }
      }
    }
  }
});

export const FlexBox = styled('div', {
  display: 'flex',
  alignItems: 'center',
  variants: {
    direction: {
      row: {
        flexDirection: 'row'
      },
      column: {
        flexDirection: 'column'
      }
    },
    justify: {
      between: {
        justifyContent: 'space-between'
      },
      start: {
        justifyContent: 'flex-start'
      },
      center: {
        justifyContent: 'center'
      },
      end: {
        justifyContent: 'flex-end'
      }
    },
    items: {
      start: {
        alignItems: 'flex-start'
      },
      end: {
        alignItems: 'flex-end'
      },
      center: {
        alignItems: 'center'
      }
    },
    responsive: {
      rc: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        '@md': {
          flexDirection: 'row',
          alignItems: 'center'
        }
      },
      cr: {
        flexDirection: 'row',
        '@md': {
          flexDirection: 'column'
        }
      },
      base: {
        mb: '1rem',
        '@md': {
          mb: 0
        }
      }
    }
  }
});

export const Icon = styled('img', {
  width: '1.375rem',
  cursor: 'pointer'
});

export const BorderBox = styled('div', {
  padding: '0.75rem 0',
  borderBottom: '1px solid $borderPrimary',
  '@md': {
    padding: '1.25rem 0'
  }
});

export const Input = styled('input', {
  width: '100%',
  color: '$textPrimary',
  border: '1px solid $textLight',
  backgroundColor: '$bg3',
  height: '40px',
  padding: '0 1.25rem',
  outline: 'none',
  '&::placeholder': {
    color: '$textLight'
  },
  '&:hover': {
    borderColor: '$primary'
  },
  '&:focus': {
    borderColor: '$primary'
  }
});

export const TextArea = styled('textarea', {
  width: '100%',
  border: '1px solid $textLight',
  color: '$textPrimary',
  backgroundColor: '$bg3',
  height: '100px',
  padding: '0 1.25rem',
  '&::placeholder': {
    color: '$textLight'
  },
  '&:hover': {
    borderColor: '$primary'
  },
  '&:focus': {
    borderColor: '$primary'
  }
});

export const Section = styled('div', {
  variants: {
    responsive: {
      base: {
        width: '100%',
        '@md': {
          width: '46%'
        }
      }
    }
  }
});

export const DropBox = styled('div', {
  height: 'auto',
  willChange: 'max-height',
  transition: 'height 0.3s ease',
  padding: '0.75rem 0.75rem 1.25rem 0.75rem',
  '@md': {
    padding: '1.5rem 3.125rem'
  },
  variants: {
    color: {
      primary: {
        backgroundColor: '$bg5'
      }
    }
  }
});
