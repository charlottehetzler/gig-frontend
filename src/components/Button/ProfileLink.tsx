import React, { useState } from 'react';
import {StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GigColors } from '../../constants/colors';
import { Icon } from 'react-native-elements';
import { EditProfile } from '../Overlay/EditProfile';

type Props = { firstName: string, title: string, icon: string }

export function ProfileLink (props: any) {
    
    const navigation = () => {
        if (props.title === 'reviews') {
            props.navigation.navigate('Reviews', { userId: props.user.id, firstName: props.firstName });
        } else if (props.title === 'friends') {
            props.navigation.navigate('Friends', { navigation: props.navigation});
        } else if (props.title === 'skills') {
            // return props.navigation.navigate('Friends', { navigation: props.navigation});
        } else {
            setIsEditMode(true)
        }
    }

    const [ isEditMode, setIsEditMode ] = useState(false);
    const closeEditModal = () => setIsEditMode(false);

    return (
        <TouchableOpacity style={styles.card} onPress={() => navigation()}>
            <View style={styles.icon}>
              <Icon type='material' name={props.icon} color={GigColors.Mustard}/>
            </View>
            <View style={styles.text}>
                <Text style={{fontSize: 16}}>{props.firstName} {props.title}</Text>
            </View>
            <EditProfile visible={isEditMode} onCancel={closeEditModal} user={props.user} initials={props.initials} />
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
        backgroundColor: GigColors.Sun,
        borderRadius: 7,
        padding: 10,
        marginRight: 20
    },
    text: {
        width: 200,
        alignItems: 'flex-start'
    },
});