import React from 'react';
import { shallow } from 'enzyme';
import TaskTracker from './TaskTracker';

const user={email: 'test@mail.com'}
const tasks=[{ id: 1, base_string: 'enter', substring: 'etk', status: false, enterings: []}]
const deleteTask = id => {};

describe('<TaskTracker />', () => {
  const container = shallow(<TaskTracker user={user} tasks={tasks} deleteTask={deleteTask}/>);

  it('should render header', () => {
    const header = container.find('.task-tracker--header');

    expect(header.children('p').prop('children')).toEqual(['Hello ', user.email]);
    expect(header.children('button').prop('children')).toEqual('Log out');
  });

  it('should render add panel', () => {
    const panel = container.find('.task-tracker--add-panel');
    const stringInput = panel.find('.task-tracker--string-input');
    const substringInput = panel.find('.task-tracker--substring-input');

    expect(panel.find('.task-tracker--send-button').prop('children')).toEqual('Send task');
    expect(panel.find('.task-tracker--cancel-button').prop('children')).toEqual('Cancel');
    expect(stringInput.prop('placeholder')).toEqual('Please enter string');
    expect(stringInput.prop('value')).toEqual('');
    expect(substringInput.prop('placeholder')).toEqual('Please enter string for finding');
    expect(substringInput.prop('value')).toEqual('');
  });

  it('should render task list', () => {
    const task = container.find('.task-tracker--list').find('.task-tracker--list-line');

    expect(task.prop('children').length).toEqual(5);
    expect(task.find('.string').prop('children')).toEqual('enter');
    expect(task.find('.substring').prop('children')).toEqual('etk');
    expect(task.find('.status').prop('children')).toEqual('Not found');
    expect(task.find('.result').prop('children')).toBe(false);
    expect(task.find('.task-tracker--delete-button').prop('children')).toEqual('Delete');
  });
});