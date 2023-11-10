import React from 'react';
import CustomInputNumber from './components/CustomInputNumber/index.jsx';
import RoomAllocation from './components/RoomAllocation/index.jsx';

export default () => {
  return (
    <div>
    App
    <CustomInputNumber
      onChange={(e) => console.log('onChange callback from outside',e.target.name, e.target.value)}
      name="test"
    ></CustomInputNumber>

    <div>123</div>
    <CustomInputNumber
      min={0}
      max={99}
      step={5}
      name='field-name'
      value={50}
      disabled={true}
      onChange={(e) => console.log(e)}
      onBlur={(e) => console.log(e)}
    ></CustomInputNumber>

    <RoomAllocation
      value={[
        { adult: 1, child: 0},
        { adult: 1, child: 0 },
        { adult: 1, child: 0 }
      ]}
    />
    </div>
  )
}