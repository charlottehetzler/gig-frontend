import React from 'react';
import { View, Modal,TouchableWithoutFeedback } from 'react-native';
import { StyleSheet, Text } from "react-native";
import { GigColors } from '../constants/colors';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Producer } from '../Producers/Producer';


export function Gig ( props: any ) {

    const type = useSelector( (state: any) => state.user.userType);
    const isConsumer = () => { return type === 'consumer' }

    return (
        <Modal visible={props.visible} animationType='slide'>
            <View style={styles.gigContainer}>
                <TouchableWithoutFeedback onPress={props.onCancel}>
                    <Icon type='material' name='close' style={styles.icon} size={25}/>
                </TouchableWithoutFeedback>
                
                <View>
                    <Text style={styles.title}>{props.gig.title}</Text>
                    <Text style={styles.description}>{props.gig.description}</Text>
                </View>
                <View style={styles.wrapper}>
                    <Text style={styles.date}>{moment(props.gig['fromDate']).format('LL')} </Text>
                    <Text style={styles.date}>{moment(props.gig['fromDate']).format('LT')} </Text>
                </View>
                <View style={[styles.wrapper, {marginBottom: 25}]}>
                    <Text style={styles.location}>location</Text>
                </View>
                <Producer 
                    firstName={props.gig.user.firstName} 
                    lastName={props.gig.user.lastName} 
                    userId={props.gig.user.id}
                    navigation={props.navigation}
                    skillId={props.gig.skillId}
                    isConsumer={isConsumer()}
                    onClose={props.onCancel}
                />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    gigContainer: {
        flex: 1,
        marginTop: 80,
        backgroundColor: GigColors.Greyish, 
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        // overflow: 'hidden',
        paddingHorizontal: 16,
    },
    icon: {
        alignItems:'flex-end',
        marginRight: 20,
        marginTop: 20
    },
    title: {
        fontWeight: '600',
        color: GigColors.Blue,
        fontSize: 24,
        textAlign: 'left',
        marginTop: 30
    },
    description: {
        fontSize: 18,
        color: GigColors.Blue,
        marginTop: 20
    },
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 30, 
        paddingHorizontal: 15,
        paddingVertical: 20,
        backgroundColor: GigColors.White, 
        borderRadius: 10
    },  
    date: {
        fontSize: 16,
        textAlign: 'center',
        color: GigColors.Blue,
        fontWeight: '300'
    }, 
    location: {
        color: GigColors.Blue,
        fontSize: 16,
        fontWeight: '500'
    }
 });