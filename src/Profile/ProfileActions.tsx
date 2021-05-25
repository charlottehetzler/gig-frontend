import React, { useState } from 'react';
import {StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import Communications from 'react-native-communications';
import { GigColors } from '../constants/colors';
import { MessageButton } from '../components/Button/MessageButton';
import { NewReview } from '../Reviews/NewReview';

export function ProfileActions (props: any) {

    const [ isAddMode, setIsAddMode ] = useState(false);

    const closeModal = () => setIsAddMode(false);

    const [ reviewDisabled, setReviewDisabled ] = useState(props.reviewDisabled);

    const disableReview = () => setReviewDisabled(true)

    return (
        <View style={styles.profileActions}>
            {props.user.isCallable ?
                <TouchableOpacity style={[styles.profileAction, styles.active]} onPress={() => Communications.phonecall(props.user.phoneNumber, true)}>
                    <Icon type='material' name='call' color={GigColors.White}/>
                </TouchableOpacity>
            :
                <View style={[styles.profileAction, styles.inActive]}>
                    <Icon type='material' name='call' color={GigColors.Mustard}/>
                </View>
            }

            <MessageButton title={'Message'} userId={props.userId} firstName={props.user.firstName} lastName={props.user.lastName} navigation={props.navigation} isSearchBar={false}/>
            
            {reviewDisabled ? 
                <View style={[styles.profileAction, styles.inActive]}>
                    <Icon type='material' name='star-outline' color={GigColors.Mustard}/>
                    <NewReview visible={isAddMode} onCancel={closeModal} userId={props.userId} firstName={props.user.firstName} disable={reviewDisabled}/>
                </View>
            : 
                <TouchableOpacity style={[styles.profileAction, styles.active]} onPress={() => setIsAddMode(true)}>
                    <Icon type='material' name='star-outline' color={GigColors.White}/>
                    <NewReview visible={isAddMode} onCancel={closeModal} userId={props.userId} firstName={props.user.firstName} disable={disableReview}/>
                </TouchableOpacity>
            }

        </View>
    )
}


const styles = StyleSheet.create({
    profileActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        width: '40%'
    },
    profileAction: {
        borderRadius: 50,
        padding: 10
    },
    active: {
        backgroundColor: GigColors.Mustard
    },
    inActive: {
        backgroundColor: GigColors.Sun,
        borderColor: GigColors.Mustard,
        borderWidth: 1
    }
});