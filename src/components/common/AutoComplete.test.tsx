import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AutoComplete from './AutoComplete';

describe('testing AutoComplete Component', () => {
  test('render components without suggestions', () => {
    // GIVEN
    const label = 'testing label';

    // WHEN
    const { container, getAllByText } = render(
      <AutoComplete label={label} suggestions={[]} />
    );

    // THEN
    expect(getAllByText(label)).toBeTruthy();
    expect(container.getElementsByTagName('ul').length).toBe(0);
  });

  test('render components with suggestions and testing events', async () => {
    // GIVEN
    const label = 'testing label';
    const suggestions = ['s1', 's2', 's3'];
    const onSelect = jest.fn();

    // WHEN
    const { container, getAllByText } = render(
      <AutoComplete
        label={label}
        suggestions={suggestions}
        onSelect={onSelect}
      />
    );

    // THEN
    expect(getAllByText(label)).toBeTruthy();

    const inputs = container.getElementsByTagName('input');
    expect(inputs.length).toBe(1);

    // testing suggestion filter
    await fireEvent.focus(inputs[0]);
    expect(inputs[0].value).toBe('');
    expect(container.getElementsByTagName('ul').length).toBe(1);
    expect(container.getElementsByTagName('li').length).toBe(3);
    await userEvent.type(inputs[0], '{arrowdown}{arrowdown}{enter}');
    expect(inputs[0].value).toBe('s2');

    // testing show suggestions list
    await fireEvent.focus(inputs[0]);
    expect(container.getElementsByTagName('ul').length).toBe(1);
    expect(container.getElementsByTagName('li').length).toBe(3);
    expect((await screen.findAllByText('s1')).length).toBe(1);
    expect((await screen.findAllByText('s2')).length).toBe(1);
    expect((await screen.findAllByText('s3')).length).toBe(1);

    // testing suggestion filter
    await fireEvent.focus(inputs[0]);
    await userEvent.type(inputs[0], 's1');
    expect(container.getElementsByTagName('li').length).toBe(1);
    expect((await screen.findAllByText('s1')).length).toBe(1);

    // testing onclick suggestion
    const s1 = await screen.getByText('s1');
    await fireEvent.click(s1);
    expect(inputs[0].value).toBe('s1');
    expect(container.getElementsByTagName('ul').length).toBe(0);
    expect(container.getElementsByTagName('li').length).toBe(0);
    expect(onSelect).toBeCalled();
  });
});
