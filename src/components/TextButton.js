import { observer } from 'mobx-react-lite';
import React from 'react';

export const TextButton = observer((props) => {
  return (
    <a
      href={props.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={props.onClick}
      className="textButton"
      style={{ fontSize: props.small ? '14px' : 'none', display: 'block' }}
    >
      {props.text}
    </a>
  );
});

export default TextButton;
