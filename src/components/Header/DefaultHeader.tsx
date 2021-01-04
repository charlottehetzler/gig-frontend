import React, { useState } from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GigColors } from '../../constants/colors';
import { NewGig } from '../overlay/NewGig';

export function DefaultHeader (props: any) {

    const [ isAddMode, setIsAddMode ] = useState(false);

    const closeModal = () => {
        setIsAddMode(false)
    }

    return (
        <View >
            <View style={styles.headerWrapper}>
                <TouchableOpacity onPress={() => props.navData.toggleDrawer()}>
                    <Icon name='menu' color={'#FFFFFF'}/>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{props.title}</Text>
                <TouchableOpacity onPress={() => setIsAddMode(true)}>
                    <Icon name='add' color={'#FFFFFF'} />
                    <NewGig visible={isAddMode} onCancel={closeModal} navigation={props.navData}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerWrapper: {
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-between',
        height: 75,
        backgroundColor: GigColors.DarkGrey
    },
    headerTitle: {
        fontSize: 20,
        textAlign: 'center',
        color: GigColors.White
    },
    icon: {
        color: GigColors.White
    }
});