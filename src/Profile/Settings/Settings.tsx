import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, StatusBar, TouchableOpacity, Text } from 'react-native';
import { EditProfile } from './EditProfile';
import { GigColors } from '../../constants/colors';
import { DefaultHeader } from '../../components/Header/DefaultHeader';
import EditLanguages from './EditLanguages';

export default function SettingsScreen(props: any) {

    const [ isEditMode, setIsEditMode ] = useState(false);
    const closeEditModal = () => setIsEditMode(false);

    const [ isEditLangMode, setIsEditLangMode ] = useState(false);
    const closeEditLangModal = () => setIsEditLangMode(false);

    const user = props.route.params.user;

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <DefaultHeader title={'My Settings'} navigation={props.navigation} goBack={true}/>
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
                <TouchableOpacity style={styles.setting}>
                    <Text style={styles.title}>Change to Consumer</Text>
                </TouchableOpacity>

                <EditProfile visible={isEditMode} onCancel={closeEditModal} user={user} initials={props.initials} />
                <EditLanguages visible={isEditLangMode} onCancel={closeEditLangModal} user={user} />
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
