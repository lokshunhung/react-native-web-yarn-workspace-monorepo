import React, { ReactElement } from 'react';
import { Platform, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
    highlight: {
        fontWeight: '700',
    },
});

export const DebugInstructions: () => ReactElement = Platform.select({
    ios: () => (
        <Text>
            Press <Text style={styles.highlight}>Cmd + D</Text> in the simulator or{' '}
            <Text style={styles.highlight}>Shake</Text> your device to open the React Native debug menu.
        </Text>
    ),
    android: () => (
        <Text>
            Press <Text style={styles.highlight}>Cmd or Ctrl + M</Text> or <Text style={styles.highlight}>Shake</Text>{' '}
            your device to open the React Native debug menu.
        </Text>
    ),
    default: () => (
        <Text>
            Press <Text style={styles.highlight}>Cmd + Opt + I or F12</Text> in the browser to open DevTools.
        </Text>
    ),
});
