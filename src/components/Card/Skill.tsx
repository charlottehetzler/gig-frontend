import React from 'react';
import { View, StyleSheet, Text, GestureResponderEvent } from 'react-native';
import { GigColors } from '../../constants/colors';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = { name: string, editMode: boolean, darkMode: boolean, onDelete?: any }


export function Skill ({name, editMode, darkMode, onDelete} : Props) {
    const iconColor = darkMode ? GigColors.White : GigColors.Black;

    return (<>
        {editMode ? 
            <TouchableOpacity style={[styles.skill, darkMode ? styles.darkmodeOn : styles.darkmodeOff]}>
                <Text style={{color: iconColor}}>{name}</Text>
                <Icon type='material' name='close' size={20} color={iconColor}/>
            </TouchableOpacity>
        :
            <View style={[styles.skill, darkMode ? styles.darkmodeOn : styles.darkmodeOff]}>
                <Text style={{color: iconColor}}>{name}</Text>
            </View>
        } 
    </>
    )
}

const styles = StyleSheet.create({
    skill: {
        borderWidth: 1,
        textTransform: 'uppercase',
        padding: 5,
        borderRadius: 4,
        marginBottom: 10,
        marginRight: 3,
        flexDirection: 'row',
        alignItems: 'center'
    },
    darkmodeOff: {
        borderColor: GigColors.Black,
        backgroundColor: GigColors.White,
        color: GigColors.Black,
    },
    darkmodeOn: {
        borderColor: GigColors.Black,
        backgroundColor: GigColors.Black,
        color: GigColors.White,
    }
});