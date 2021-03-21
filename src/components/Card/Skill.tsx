import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GigColors } from '../../constants/colors';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

export function Skill (props: any) {
    
    const iconColor = props.darkMode ? GigColors.White : GigColors.Black;
    
    const handleDelete = () => {
        props.onDelete(props.id, false, props.addMode);
    }

    return (<>
        {props.editMode ? 
            <TouchableOpacity 
                style={[styles.skill, props.darkMode ? styles.darkmodeOn : styles.darkmodeOff]} 
                onPress={handleDelete}>
                <Text style={{color: iconColor}}>{props.name}</Text>
                <Icon type='material' name='close' size={20} color={iconColor}/>
            </TouchableOpacity>
        :
            <View style={[styles.skill, props.darkMode ? styles.darkmodeOn : styles.darkmodeOff]}>
                <Text style={{color: iconColor}}>{props.name}</Text>
            </View>
        } 
    </>)
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