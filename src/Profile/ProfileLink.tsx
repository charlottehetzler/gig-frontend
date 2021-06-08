import React, { useState } from 'react';
import {StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GigColors } from '../constants/colors';
import { Icon } from 'react-native-elements';
import { EditSkills } from './Settings/EditSkills';
import { useSelector } from 'react-redux';

export function ProfileLink (props: any) {
    const [ isEditMode, setIsEditMode ] = useState(false);
    const closeEditModal = () => setIsEditMode(false);

    const type = useSelector( (state: any) => state.user.userType);
    const isConsumer = () => { return type === 'consumer' }
    
    const navigation = () => {
        if (props.title === 'reviews') {
            props.navigation.navigate('Reviews', { userId: props.user.id, firstName: props.firstName, isConsumer: props.isConsumer });
        } else if (props.title === 'friends') {
            props.navigation.navigate('Friends', { navigation: props.navigation});
        } else if (props.title === 'skills') {
            setIsEditMode(true)
        } else {
            props.navigation.navigate('Settings', { navigation: props.navigation, user: props.user, isConsumer: props.isConsumer })
        }
    }

    return (
        <TouchableOpacity style={styles.card} onPress={() => navigation()}>
            <View style={[styles.icon, { backgroundColor: isConsumer() ? GigColors.Sky : GigColors.Mustard }]}>
              <Icon type='material' name={props.icon} color={GigColors.White}/>
            </View>
            <View style={styles.text}>
                <Text style={{fontSize: 16}}>{props.firstName} {props.title}</Text>
            </View>
            <EditSkills visible={isEditMode} onCancel={closeEditModal} user={props.user} isConsumer={isConsumer()}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: GigColors.White,
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginHorizontal: 16,
        marginBottom: 10
    },
    icon: {
        borderRadius: 7,
        padding: 10,
        marginRight: 20
    },
    text: {
        width: 200,
        alignItems: 'flex-start'
    },
});