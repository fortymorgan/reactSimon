import React from 'react';
import cn from 'classnames';

const Field = (props) => {
  const { field, handler } = props

  const styleMap = {
    red: 'danger',
    blue: 'primary',
    yellow: 'warning',
    green: 'success',
  }

  return (
    <div className="btn-group-vertical m-3">
      {field.map((row, index) => <div className="btn-group" key={index} role="group">{row.map(button => {
        const secondaryStyle = `btn${button.active ? '' : '-outline'}-${styleMap[button.color]}`;
        const className = cn({
          btn: true,
          [secondaryStyle]: true,
        });

        return <button type="button" key={button.id} className={className} onClick={handler(button.id)}>{button.color}</button>
      })}</div>)}
    </div>
  )
}

export default Field;