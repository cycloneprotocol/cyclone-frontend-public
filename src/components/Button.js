import { observer } from 'mobx-react-lite';
import React from 'react';

export const Button = observer(props => {
  return (
    <div
      className={props.avaliable ? 'button' : 'buttonDisable'}
      style={{
        pointerEvents: props.avaliable ? 'initial' : 'none',
        width: props.fullWidth ? '100%' : props.width ? props.width : 'none',
        fontSize: props.fontSize ? props.fontSize : 'none',
        height: props.height ? props.height : 'none',
        padding: '0 10px'
      }}
      onClick={props.onClick}
    >
      {props.href ? (
        <a
          href={props.href}
          rel="noopener noreferrer"
          style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            padding: '0, 10px',
            boxSizing: 'border-box',
            color: '#fff',
            '&:hover': {
              color: '$primary'
            }
          }}
        >
          {props.disable && props.disabledLabel ? props.disabledLabel : props.label}
        </a>
      ) : (
        <>{props.disable && props.disabledLabel ? props.disabledLabel : props.label}</>
      )}
    </div>
  );
});

export default Button;
