import 'react-native';
import { App } from '@lsh/core/src/App';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('App', () => {
    test('renders correctly', () => {
        expect.assertions(0);
        renderer.create(<App />);
    });
});
