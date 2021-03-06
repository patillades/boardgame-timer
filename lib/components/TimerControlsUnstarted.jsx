import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import TimerButton from 'components/TimerButton';

const propTypes = {
    isVisible: PropTypes.bool.isRequired,
    clickAddHandler: PropTypes.func.isRequired,
    clickPlayHandler: PropTypes.func.isRequired
};

function TimerControlsUnstarted(props) {
    const timerControlsCls = classnames({ hidden: !props.isVisible });

    return (
        <div className={timerControlsCls}>
            <TimerButton
                clickHandler={props.clickAddHandler}
                isVisible
                txt="Add player"
                className="btn-info btn-block btn-lg"
            />

            <TimerButton
                clickHandler={props.clickPlayHandler}
                isVisible
                txt="Play"
                className="btn-primary btn-block btn-lg"
            />
        </div>
    );
}

TimerControlsUnstarted.propTypes = propTypes;

export default TimerControlsUnstarted;
