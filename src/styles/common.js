import { css } from '../modules/index'

const globalStyle = {
  a: css({
    color: "#38DCD5",
    cursor: "pointer",
    textDecoration: "underline",
  }),
  textPrimary: css({
    color: "rgb(56, 220, 213)"
  })
}

const navStyles = {
  title: css({
    width: "100%",
    marginTop: "2.5rem",
    '@md': {
      width: "23vw",
      maxWidth: "332px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: "3vh",
      height: "3.5rem",
      marginLeft: "14vw",
      padding: "0 0.5rem",
    },
    '@lg': {
      marginLeft: "15vw"
    },
    '@xxl': {
      marginLeft: "212px",
    }
  })
}

const mainStyles = {
  mainView: css({
    padding: "0 1rem",
    boxSizing: "border-box",
    '@md': {
      width: "100vw",
      height: "100%",
      maxWidth: "1395px",
      padding: 0,
      margin: "auto",
      backgroundImage: "url('/images/bg.jpg')",
      backgroundRepeat: "no-repeat",
      backgroundSize: "100% 100%",
      overflow: "hidden",
    },
  }),
  mainBlock: css({
    marginTop: "2.5rem",
    '@md': {
      width: "86%",
      margin: "4.7rem auto 0",
      overflow: 'auto',
      height: '86vh',
      paddingBottom: '5vh',
      "&::-webkit-scrollbar": {
        display: 'none'
      }
    },
    '@lg': {
      width: "77%",
    },
    '@xl': {
      width: "77%",
    },
    ".notice": {
      fontSize: "0.88rem",
      marginBottom: "3rem",
      padding: "0.7rem",
      borderRadius: "3px",
      background: 'rgba(69, 188, 184, 0.2)',
      fontFamily: 'IBM Plex Mono',
      '@md': {
        fontSize: "0.77rem",
        marginBottom: "3rem"
      },
      "span": {
        a: {
          color: '#38dcd5 !important',
          textDecoration: "underline",
        }
      }
    }
  }),
  mainPanel: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    '@md': {
      alignItems: "flex-start",
      flexDirection: "row",
      justifyContent: "flex-start"
    },
    ".mainTabBarLeft": {
      width: "100%",
      backgroundImage: "url('/images/left_bg.png')",
      backgroundRepeat: "no-repeat",
      backgroundSize: "100% 100%",
      marginBottom: "3rem",
      paddingBottom: '1rem',
      '@xs': {
        maxWidth: "459px",
      },
      '@md': {
        marginRight: "5rem",
        maxWidth: "459px",
        width: "45%",
        marginBottom: 0
      },
    },
    ".mainTabBarRight": {
      backgroundImage: "url('/images/right_bg.png')",
      backgroundRepeat: "no-repeat",
      backgroundSize: "100% 100%",
      marginBottom: "3rem",
      width: "100%",
      '@xs': {
        maxWidth: "462px",
      },
      '@md': {
        width: "462px",
        marginBottom: 0
      },
      ".mainTabBarWrapper": {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "428px"
      },
      ".panelTitle": {
        height: "40px",
        lineHeight: "40px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: "1rem",
        fontSize: "1.1rem",
        '@md': {
          paddingLeft: "40px",
          fontSize: "18px"
        }
      },
      ".records": {
        padding: "0 0 0 20px",
        fontSize: "1rem",
        height: "70%",
        '@md': {
          padding: "20px",
          fontSize: "16px",
          height: "70%"
        }
      },
      ".yourIp": {
        height: "25px",
        fontSize: "0.3rem",
        marginLeft: "10px",
        paddingLeft: "20px",
        display: "none",
        textOverflow: "ellipsis",
        width: "60%",
        overflow: "hidden",
        whiteSpace: "nowrap",
        '@md': {
          height: "34px",
          lineHeight: "34px",
          display: "block",
          marginLeft: "20px",
          paddingLeft: "20px",
          fontSize: "12px",
        }
      },
      ".yourIpMobile": {
        height: "25px",
        fontSize: "0.3rem",
        marginLeft: "10px",
        paddingLeft: "20px",
        display: "block",
        textOverflow: "ellipsis",
        width: "60%",
        overflow: "hidden",
        whiteSpace: "nowrap",
        '@md': {
          display: "none"
        }
      }
    }
  })
}

export {
  navStyles,
  mainStyles,
  globalStyle
}