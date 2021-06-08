import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GigColors } from '../../constants/colors';

export function DefaultHeader (props: any) {

    return (
        <View>
            <View style={styles.headerWrapper}>
                {!props.goBack ? 
                    <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
                        <Icon name='menu' color={props.isConsumer ? GigColors.Sky : GigColors.Mustard} size={40}/>
                    </TouchableOpacity>

                :
                    <TouchableOpacity style={styles.iconWrapper} onPress={() => props.navigation.goBack()}>
                        <Icon 
                        type={'material'} 
                        name='keyboard-backspace' 
                        color={props.isConsumer ? GigColors.Sky : GigColors.Mustard} 
                        size={35}
                    />
                    </TouchableOpacity>
                }
                <Text style={styles.headerTitle}>{props.title}</Text>
                <View></View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    headerWrapper: {
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-between',
        height: 120,
        paddingHorizontal: 16,
        paddingVertical: 20,

    },
    headerTitle: {
        fontSize: 28,
        textAlign: 'center',
        color: GigColors.Blue, 
    },
    iconWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});