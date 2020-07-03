var defaultWidth = window.screen.width > 768 ? (window.screen.width * 1) / 3 : window.screen.width;

var style = {
  Wrapper: {},
  Containers: {
    DefaultStyle: {
      position: 'fixed',
      width: defaultWidth,
      padding: '10px 10px 10px 20px',
      zIndex: 9998,
      WebkitBoxSizing: '',
      MozBoxSizing: '',
      boxSizing: '',
      height: 'auto',
      display: 'inline-block',
      border: '0',
      fontSize: '14px',
      WebkitFontSmoothing: 'antialiased',
      fontFamily: '"Roboto","Helvetica Neue",Arial,sans-serif',
      fontWeight: '400',
      color: '#FFFFFF'
    },

    tl: {
      top: '0px',
      bottom: 'auto',
      left: '0px',
      right: 'auto'
    },

    tr: {
      top: '0px',
      bottom: 'auto',
      left: 'auto',
      right: '0px'
    },

    tc: {
      top: '0px',
      bottom: 'auto',
      margin: '0 auto',
      left: '50%',
      marginLeft: -(defaultWidth / 2)
    },

    bl: {
      top: 'auto',
      bottom: '0px',
      left: '0px',
      right: 'auto'
    },

    br: {
      top: 'auto',
      bottom: '0px',
      left: 'auto',
      right: '0px'
    },

    bc: {
      top: 'auto',
      bottom: '0px',
      margin: '0 auto',
      left: '50%',
      marginLeft: -(defaultWidth / 2)
    }
  },

  Title: {
    DefaultStyle: {
      fontSize: '30px',
      margin: '0',
      padding: 0,
      fontWeight: 'bold',
      color: '#FFFFFF',
      display: 'block',
      left: '15px',
      position: 'absolute',
      top: '50%',
      marginTop: '-15px'
    }
  },

  MessageWrapper: {
    DefaultStyle: {
      marginLeft: '55px',
      marginRight: '30px',
      padding: '0 12px 0 0',
      color: '#FFFFFF',
      maxWidthwidth: '89%'
    }
  },

  Action: {
    DefaultStyle: {
      background: '#ffffff',
      borderRadius: '2px',
      padding: '6px 20px',
      fontWeight: 'bold',
      margin: '10px 0 0 0',
      border: 0
    },

    success: {
      backgroundColor: '#a1e82c',
      color: '#ffffff'
    },

    error: {
      backgroundColor: '#fc727a',
      color: '#ffffff'
    },

    warning: {
      backgroundColor: '#ffbc67',
      color: '#ffffff'
    },

    info: {
      backgroundColor: '#63d8f1',
      color: '#ffffff'
    }
  },

  ActionWrapper: {
    DefaultStyle: {
      margin: 0,
      padding: 0
    }
  }
};

module.exports = {
  style // For notifications (App container and Notifications view)
};
