import React from 'react';
import { View, Modal, TouchableWithoutFeedback } from 'react-native';
import { StyleSheet, Text } from "react-native";
import { GigColors } from '../constants/colors';
import { Icon } from 'react-native-elements';
import FriendSearch from '../components/Search/FriendSearch';


export function NewMessage ( props: any ) {   
     
    return (
        <Modal visible={props.visible} animationType='slide'>
            <View style={styles.inputContainer}>
                <View style={{marginBottom: 20}}>
                    <TouchableWithoutFeedback onPress={props.onCancel}>
                        <Icon type='material' name='close' style={styles.icon} size={25}/>
                    </TouchableWithoutFeedback>
                    <Text style={styles.title}>New Chat</Text>
                </View>
                <FriendSearch isChat={true} navigation={props.navigation} onSelect={props.onSelect}/>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        marginTop: 60
    },
    icon: {
        alignItems:'flex-end',
        marginRight: 20
    },
    title: {
        fontWeight: '600',
        color: GigColors.Black,
        fontSize: 24,
        textAlign: 'center'
    }

 });