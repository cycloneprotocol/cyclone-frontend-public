import React, { useEffect, useState } from 'react';
import { css } from '../modules/index';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';
import { Link } from 'react-router-dom';
import Utility from '../Utility';


export const LaunchButton = observer((props) => {
  const { lang } = useStore();
  const [isBlur, setIsBlur] = useState(false);

  const openDeepLink = () => {
    const a = document.createElement("a");
    const tagId = "startIoPay";
    a.setAttribute("href", "iopay://io.iotex.iopay/open?action=web&url=https://cyclone.xyz");
    a.setAttribute("id", tagId);
    if (document.getElementById(tagId)) {
      // @ts-ignore
      document.body.removeChild(document.getElementById(tagId));
    }
    document.body.appendChild(a);
    a.click();
  };

  const ioPayIsInstall = () => {
    openDeepLink();
    setTimeout(() => {
      if (!isBlur) {
        window.location.href = "https://iopay.iotex.io";
      }
    }, 3000);
  };

  useEffect(() => {
    window.onblur = () => {
      setIsBlur(true);
    };
  });

  return (
    <div className={props.addStyle}>
      {Utility.isInMobile() && !Utility.isIoPayMobile() ? (
        <div className={styles.launchBtn.className}
          onClick={() => ioPayIsInstall()}>
          <a>
            {lang.t('launch.app')}
          </a>
        </div>
      ) : (
        <div className={styles.launchBtn.className}>
          <Link to="/iotx">
            {lang.t('launch.app')}
          </Link>
        </div>
      )}
    </div>
  );
});
const styles = {
  launchBtn: css({
    width: "140px",
    height: '2.5rem',
    lineHeight: '2.5rem',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '0 auto 3rem',
    a: {
      display: 'block',
      width: '100%',
      height: '100%',
      backgroundColor: '#45BCB8',
      "&:hover": {
        color: '#ffff !important',
        backgroundColor: '#24928E',
      }
    },
    '@md': {
      margin: '0 inherit 0'
    }
  })
};

export default LaunchButton;
