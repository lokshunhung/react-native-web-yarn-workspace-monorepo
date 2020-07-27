import { render } from '@testing-library/react';
import React from 'react';
import App from './App';

describe('App', () => {
    test('renders learn react link', () => {
        expect.hasAssertions();
        const { getByText } = render(<App />);
        const linkElement = getByText(/learn react/i);
        expect(linkElement).toBeInTheDocument();
    });
});
