import { App } from '@lsh/core/src/App';
import React from 'react';
import { render } from 'react-native-testing-library';

describe('App', () => {
    test('renders correctly', () => {
        expect.assertions(1);
        const { getByText } = render(<App />);
        expect(getByText(/^RN Android$/)).toBeTruthy();
    });
});
