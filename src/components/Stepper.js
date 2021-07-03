import { observer, useLocalStore } from 'mobx-react-lite';
import React from 'react';
import Config from '../Config';
import StepperPointer from './StepperPointer';

export const Stepper = observer((props) => {
  const store = useLocalStore(() => ({
    selected: 0,
    onSelect(event) {
      let tempInt = parseInt(event.currentTarget.id);
      this.selected = tempInt;
      props.onSelect(tempInt);
    },
  }));
  return (
    <div>
      <hr className="stepperTrack" />
      <div
        style={{
          top: 0,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginTop: '-20px',
        }}
      >
        {Config.tokens[props.indexOfToken].amountSteps.map((item, index) => (
          <div
            id={index}
            onClick={store.onSelect}
            key={item.amount}
            style={{
              filter: item.address !== '' ? 'none' : 'grayscale(100%)',
              pointerEvents: item.address !== '' ? 'initial' : 'none',
            }}
            className="stepperNode"
          >
            <StepperPointer selected={store.selected === index} avaliable={item.address !== ''} />
            <div>{item.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
});
export default Stepper;
