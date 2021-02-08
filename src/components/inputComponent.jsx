import React from 'react';

const InputComponent = ({data}) => {
  console.log('item: ',data)
  return ( 
    <div className="row">
      <div className="col">
        <input name="meta" type="text" placeholder="meta"></input>
        <input name="value" type="text" placeholder="value"></input>
      </div>
    </div>
  );
}
 
export default InputComponent;