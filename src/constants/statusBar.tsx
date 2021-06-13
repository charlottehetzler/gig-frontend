import React from 'react';
import { View, StatusBar, StyleSheet} from 'react-native';

export function GeneralStatusBarColor ({ backgroundColor, ...props }: any) {
    return (
        <View style={[styles.statusBar, { backgroundColor }]}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

const styles = StyleSheet.create({
    statusBar: {}

});