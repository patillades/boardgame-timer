import React, { PropTypes } from 'react';
import classnames from 'classnames';

const propTypes = {
  id: PropTypes.number.isRequired,
  isEditable: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  changeHandler: PropTypes.func.isRequired,
};

function PlayerNameInput(props) {
  const inputCls = classnames(
    'form-control',
    { no: !props.isEditable }
  );

  return (
    <input
      data-playerid={props.id}
      className={inputCls}
      onChange={props.changeHandler}
      value={props.value}
    />
  );
}

PlayerNameInput.propTypes = propTypes;

export default PlayerNameInput;
