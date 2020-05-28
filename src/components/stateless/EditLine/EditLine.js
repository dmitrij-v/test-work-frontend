import React from 'react';

function EditLine(className, placeholder, type, onChange, value, inputClassName) {
  return (
    <div className={className}>
      <input className={inputClassName} placeholder={placeholder} type={type} onChange={onChange} value={value}/>
    </div>
  )
}

export default EditLine;