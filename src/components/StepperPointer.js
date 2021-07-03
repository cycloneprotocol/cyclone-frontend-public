import { observer } from 'mobx-react-lite';
import React from 'react';

export const StepperPointer = observer((props) => {
  return (
    <div className="stepperPointer">
      <div
        className="stepperPointerInside"
        style={{
          backgroundColor: props.selected ? '#45BCB8' : 'black',
          filter: props.avaliable ? 'none' : 'grayscale(100%)',
        }}
      />
    </div>
  );
});

export default StepperPointer;
