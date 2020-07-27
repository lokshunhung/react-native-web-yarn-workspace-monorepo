import React, { ReactElement } from 'react';
import { Platform, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
    highlight: {
        fontWeight: '700',
    },
});

export const ReloadInstructions: () => ReactElement = Platform.select({
    ios: () => (
        <Text>
            Press <Text style={styles.highlight}>Cmd + R</Text> in the simulator to reload your app's code.
        </Text>
    ),
    android: () => (
        <Text>
            Double tap <Text style={styles.highlight}>R</Text> on your keyboard to reload your app's code.
        </Text>
    ),
    default: () => (
        <Text>
            Press <Text style={styles.highlight}>Cmd + R</Text> in the browser to reload your app's code.
        </Text>
    ),
});
