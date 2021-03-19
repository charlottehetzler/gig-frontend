import React, { useState } from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GigColors } from '../../constants/colors';
import { useSelector } from 'react-redux';

export function DefaultHeader (props: any) {

    const [ isAddMode, setIsAddMode ] = useState(false);
        
    const closeModal = () => { setIsAddMode(false) }

    const isLoggedIn = useSelector( (state: any) => state.user.isLoggedIn);
  
    const userType = useSelector( (state: any) => state.user.userType);

    const isConsumer = () => {
        if (isLoggedIn) {
            if (userType === 'consumer') {
                return true;
            } else {
                return false;
            }
        }
    }

    return (
        <View >
            {!isLoggedIn && 
                <View style={styles.headerWrapper}>
                    {props.goBack ? 
                        <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
                            <Icon name='menu' color={'#000000'}/>
                        </TouchableOpacity>

                    :
                        <TouchableOpacity style={styles.iconWrapper} onPress={() => props.navigation.goBack()}>
                            <Icon type={'material'} name='keyboard-backspace' color={'#000000'}/>
                        </TouchableOpacity>
                    }
                    <Text style={styles.headerTitle}>{props.title}</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
                        <Text style={styles.login}>Login</Text>
                    </TouchableOpacity>
                </View>
            }
            {isLoggedIn && 
                <View style={styles.headerWrapper}>
                    {!props.goBack ? 
                        <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
                            <Icon name='menu' color={'#000000'}/>
                        </TouchableOpacity>

                    :
                        <TouchableOpacity style={styles.iconWrapper} onPress={() => props.navigation.goBack()}>
                            <Icon type={'material'} name='keyboard-backspace' color={'#000000'}/>
                        </TouchableOpacity>
                    }
                    <Text style={styles.headerTitle}>{props.title}</Text>
                    <View></View>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    headerWrapper: {
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-between',
        height: 75,
        backgroundColor: GigColors.White,
        paddingHorizontal: 7,
        borderBottomWidth: 2,
        borderBottomColor: GigColors.Grey,
        marginBottom: 10
    },
    headerTitle: {
        fontSize: 20,
        textAlign: 'center',
        color: GigColors.Black
    },
    login: {
        textAlign: 'right', 
        color: GigColors.Black
    },
    iconWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10
    },
});