import React, { useState } from 'react';
import { List } from 'immutable';
import { Wrapper, ColorItem } from './styles';
import { colorData } from './constants';

function ColorBar({ onPressColor }) {
  const [colorState, setColorState] = useState(List(colorData));

  function onPressColorItem({ colorId }) {
    const data = colorState.toJS().map((x) => {
      if (x.id === colorId) {
        return { ...x, selected: !x.selected };
      }
      return { ...x };
    });
    setColorState(List(data));
    onPressColor({ colorId });
  }
  console.log(colorState.toJS());

  return (
    <Wrapper>
      {colorState.map((data) => (
        <ColorItem
          selected={data.selected}
          onPress={() => onPressColorItem({ colorId: data.id })}
          key={`colorBarItem-${data.id}`}
          color={data.value}
        >
        </ColorItem>
      ))}
    </Wrapper>
  );
}

export default ColorBar;
