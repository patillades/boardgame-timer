import React, { PropTypes } from 'react';
import classnames from 'classnames';

import TwoTimingDigits from './TwoTimingDigits.jsx';

import { msToTime } from '../utils/date';

const propTypes = {
  elapsed: PropTypes.number.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

function Timer(props) {
  const timerCls = classnames({ no: !props.isVisible });
  const time = msToTime(props.elapsed);

  return (
    <div className={timerCls}>
      <TwoTimingDigits value={time.hours} />
      :
      <TwoTimingDigits value={time.minutes} />
      :
      <TwoTimingDigits value={time.seconds} />
    </div>
  );
}

Timer.propTypes = propTypes;

export default Timer;
