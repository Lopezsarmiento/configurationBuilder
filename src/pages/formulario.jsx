import React, {useState, useRef} from 'react';
import { useForm } from "react-hook-form";

const fields = [
  { id: 1, value: 'name'},
  { id: 2, value: 'label'},
  { id: 3, value: 'placeholder'},
  { id: 4, value: 'valor'},
  { id: 5, value: 'type'},
  { id: 6, value: 'disabled'},
  { id: 7, value: 'required'}
]

let inputCounter = 1;
let inputsGroup = [
  { id: 1},
];


// TODO: CLEAR FORM
// FIX UI

const Formulario = () => {
  const inputRef = useRef();
  const [message, setMessage] = useState(false);
  const [inputs, setInputs] = useState(inputsGroup);
  const [result, setResult] = useState();
  const { register, handleSubmit, watch, errors, reset } = useForm();

  const onSubmit = data => { 
    const dataholder = [];
    const json = [];

    // add props to an array
    for (const property in data) {
      const obj = {};
      obj[property.slice(2)] = data[property];
      dataholder.push(obj);
    }
    
    // loop array and unshift until no items in array
    while (dataholder.length  > 0) {
      const objholder = {}
      const props = dataholder.splice(0,7);

      props.map(item => {
        // each item value into a new obj
        for (const prop in item) {
          objholder[prop] = item[prop];
        }
      });
      // and push it to json
      json.push(JSON.stringify(objholder));
    }

    setResult(json.toString());
    reset();
  }

  const onCopy = () => { 
    inputRef.current.select();
    document.execCommand('copy');
    setMessage(true);
  }

  const onReset = () => {
    inputRef.current.value = "";
    setResult("");
    setMessage(false);
    setInputs([{id: 1}]);
  }

  const createInput = () => {
    inputCounter++;
    inputsGroup = [...inputs, { id: inputCounter} ]
    setInputs(inputsGroup);
  }

  return ( 
    <React.Fragment>
      <div className="container-fluid">
        <div className="row mb-3">
          <div className="col-12">
            <div className="row">
              <div className="col mb-2">
                <button type="submit" className="btn btn-dark" onClick={onReset}>Reset</button>
                { message && (
                  <p>Text copied!!!</p>
                )}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <div className="input-group mb-3">
                  <textarea type="text" className="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" value={result} ref={inputRef} readOnly/>
                  <button className="btn btn-info" type="button" id="button-addon1" onClick={onCopy}>Copy to clipboard</button>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              {inputs.map( item => ( 
                <div className="row mb-3" key={item.id}>
                  {fields.map(field => { 
                    return (field.value !== "type" && field.value !== "required" && field.value !== "disabled") ? <InputComponent field={field} register={register} key={field.id} id={item.id}/> :<SelectComponent field={field} register={register} key={field.id} id={item.id}/>;
                  })}
                </div>
                
              ))}
              
              <button type="button" className="btn btn-warning btn-lg btn-block" onClick={createInput}>Add row</button>
              <button type="submit" className="btn btn-primary btn-lg btn-block">Submit rows</button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
 
export default Formulario;

const InputComponent = ({id, field, register}) => {
  return ( 
    <div className="col">
      <label htmlFor={`${id}_${field.value}`} className="form-label">{field.value}</label>
      <input name={`${id}_${field.value}`} type="text" className="form-control" placeholder={field.value} aria-label={field.value} ref={register}/>
    </div>
  );
}
const SelectComponent = ({id, field, register}) => {
  const isFieldType = (field.value === "type") ? true: false;
  return (
    <div className="col"> 
      { isFieldType && (
        <TypeComponent field={field} register={register} id={id}/>
      )}
      { !isFieldType && (
        <BooleanComponent field={field} register={register} id={id}/>
      )}
    </div>
  );
}

const TypeComponent = ({ id, field, register}) => {
  return ( 
    <React.Fragment>
      <label htmlFor={`${id}_${field.value}`} className="form-label">{field.value}</label>
      <select name={`${id}_${field.value}`} className="form-select" aria-label="Default select example" ref={register}>
        <option value="text">text</option>
        <option value="number">number</option>
        <option value="textarea">textarea</option>
      </select>
    </React.Fragment>
  );
}

const BooleanComponent = ({ id, field, register}) => {
  return ( 
    <React.Fragment>
      <label htmlFor={`${id}_${field.value}`} className="form-label">{field.value}</label>
      <select name={`${id}_${field.value}`} className="form-select" aria-label="Default select example" ref={register}>
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
    </React.Fragment>
  );
}

 