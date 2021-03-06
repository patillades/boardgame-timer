import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Timer from 'components/Timer';

const propTypes = {
    elapsed: PropTypes.number.isRequired,
    isOn: PropTypes.bool.isRequired,
    start: PropTypes.number,
    finish: PropTypes.number,
    turns: PropTypes.number.isRequired
};

function Statistics(props) {
    const statisticsCls = classnames('text-center', {
        hidden: props.finish === null
    });

    return (
        <div className={statisticsCls}>
            <div>
                <span className="stats__title">Turns</span>

                <div className="inb">{props.turns}</div>
            </div>

            <div>
                <span className="stats__title">Total time</span>

                <Timer
                    elapsed={props.finish - props.start}
                    isOn={props.isOn}
                    isVisible
                    className="inb"
                />
            </div>

            <div>
                <span className="stats__title">Paused time</span>

                <Timer
                    elapsed={props.finish - props.start - props.elapsed}
                    isOn={props.isOn}
                    isVisible
                    className="inb"
                />
            </div>
        </div>
    );
}

Statistics.propTypes = propTypes;

export default Statistics;
