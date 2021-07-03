import { observer } from 'mobx-react-lite';
import React from 'react';

export const ModalView = observer((props) => {
  return <div className="modalView">{props.children}</div>;
});
export default ModalView;
