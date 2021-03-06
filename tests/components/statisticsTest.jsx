import expect from 'expect';
import setup from './../setup';
import Statistics from './../../lib/components/Statistics.jsx';

/**
 * Set up a Statistics element for testing purposes
 *
 * @param {?number} start
 * @param {?number} finish
 * @param {number} elapsed
 * @param {boolean} isOn
 * @param {number} turns
 * @returns {ReactElement}
 */
function propsSetup(start, finish, elapsed, isOn, turns) {
  const props = { start, finish, elapsed, isOn, turns };

  return setup(Statistics, props);
}

describe('Statistics', function () {
  it('should be hidden if not finished', function () {
    const element = propsSetup(0, null, 1, true, 2);

    expect(element.type).toBe('div');
    expect(element.props.className).toInclude('hidden');
  });

  it('should show statistics if finished', function () {
    const start = 1000;
    const finish = 5000;
    const elapsed = 2000;
    const turnNum = 3;

    const element = propsSetup(start, finish, elapsed, false, turnNum);
    const turns = element.props.children[0];
    const turnsCount = turns.props.children[1];
    const total = element.props.children[1];
    const totalTimer = total.props.children[1];
    const paused = element.props.children[2];
    const pausedTimer = paused.props.children[1];

    expect(element.props.className).toNotInclude('hidden');

    expect(turns.type).toBe('div');

    expect(turnsCount.type).toBe('div');
    expect(turnsCount.props.children).toBe(turnNum);

    expect(total.type).toBe('div');
    expect(totalTimer.props.elapsed).toBe(finish - start);
    expect(totalTimer.props.isVisible).toExist();

    expect(paused.type).toBe('div');
    expect(pausedTimer.props.elapsed).toBe(finish - start - elapsed);
    expect(pausedTimer.props.isVisible).toExist();
  });
});
