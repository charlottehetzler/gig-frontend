import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, StatusBar, TouchableOpacity, Text } from 'react-native';
import { EditProfile } from './EditProfile';
import { GigColors } from '../../constants/colors';
import { DefaultHeader } from '../../components/Header/DefaultHeader';
import EditLanguages from './EditLanguages';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../lib/user';
import { useDispatch, useSelector } from 'react-redux';
// import { USER_UPDATE, USER_LOGOUT, saveUserDataToStorage } from '../../redux/actions/user';


export default function SettingsScreen(props: any) {

    const [ isEditMode, setIsEditMode ] = useState(false);
    const closeEditModal = () => setIsEditMode(false);

    const [ isEditLangMode, setIsEditLangMode ] = useState(false);
    const closeEditLangModal = () => setIsEditLangMode(false);

    const { user, isConsumer } = props.route.params;

    const [ doUserUpdate, { loading: userUpdateLoading } ] = useMutation(UPDATE_USER);
    const dispatch = useDispatch();
    const userId = useSelector( (state: any) => state.user.userId);
    const type = useSelector( (state: any) => state.user.userType);
    

    const changeType = async (type: string) => {
        try {
            const userType = type === "consumer" ? "producer" : "consumer";
  
            const { data, errors } = await doUserUpdate({
                variables: { input: { userId: userId, type: userType}}
            });

            // if (data.userUpdate) {
            //     dispatch({
            //         type: USER_UPDATE, 
            //         token: data.userUpdate.token, 
            //         userId: data.userUpdate.userId, 
            //         isLoggedIn: true,
            //         firstName: data.userUpdate.firstName, 
            //         lastName: data.userUpdate.lastName,
            //         userType: data.userUpdate.userType
            //     });
            //     saveUserDataToStorage(data.userUpdate.userId,data.userUpdate.token, data.userUpdate.userType);
            //     props.navigation.navigate('HomeScreen');
            // }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <DefaultHeader title={'My Settings'} navigation={props.navigation} goBack={true} isConsumer={isConsumer}/>
            </View> 

            <View >
                <TouchableOpacity style={styles.setting} onPress={() => setIsEditMode(true)}>
                   <View><Text style={styles.title}>Profile</Text></View> 
                </TouchableOpacity>
                <TouchableOpacity style={styles.setting} onPress={() => setIsEditLangMode(true)}>
                    <Text style={styles.title}>Languages</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.setting}>
                    <Text style={styles.title}>Notifications</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.setting} onPress={() => changeType(type)}>
                    <Text style={[styles.title, {color: isConsumer ? GigColors.Mustard : GigColors.Sky}]}>Change to {isConsumer ? 'Producer' : 'Consumer' }</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.setting} 
                    onPress={() => { 
                        // dispatch({type: USER_LOGOUT});
                    }}
                >
                    <Text style={styles.title}>Logout</Text>
                </TouchableOpacity>

                <EditProfile visible={isEditMode} onCancel={closeEditModal} user={user} initials={props.initials} isConsumer={isConsumer}/>
                <EditLanguages visible={isEditLangMode} onCancel={closeEditLangModal} user={user} isConsumer={isConsumer}/>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight || 0,
    }, 
    setting: {
        backgroundColor: GigColors.White,
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 15,
        marginVertical: 4,
    },
    title: {
        fontSize: 18,
        textAlign: 'left',
        color: GigColors.Blue
    },
});
