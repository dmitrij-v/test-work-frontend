import React from 'react';

function ButtonLine(containerClassName, title, className, onClick) {
  return (
    <div className={containerClassName}>
      <button type='button' onClick={onClick} className={className}>{title}</button>
    </div>
  )
}

export default ButtonLine;