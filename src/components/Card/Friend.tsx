import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { Avatar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GigColors } from '../../constants/colors';
import { useMutation } from '@apollo/client';
import { ACCEPT_OR_DECLINE_REQUEST } from '../../lib/friend';
import { MessageButton } from '../Button/MessageButton';
import { RequestButton } from '../Button/RequestButton';


export function Friend (props: any) {
    
    const [ doUpdateRequest, { loading: updateRequestLoading } ] = useMutation(ACCEPT_OR_DECLINE_REQUEST);
    
    const getInitials = (firstName : string, lastName : string) => {
        let first = firstName.charAt(0).toUpperCase();
        let last = lastName.charAt(0).toUpperCase();
        return first + last;
    }

    const onUpdateRequest = async () => {
        try {
            const { data, errors } = await doUpdateRequest({
                variables: { input: {currentUserId: props.currentUserId, userId: props.userId, status: 'accept'} }
            });
            if (data && data?.acceptOrDeclineRequest) {
                props.onUpdate();
            }
        } catch (e) {
          console.log(e);
        }
    }

    return ( <>
        <View style={styles.card}>
            <View style={styles.cardName}>
                <Avatar title={getInitials(props.firstName, props.lastName)} containerStyle={styles.avatar} size={60} />
                <Text style={styles.name}>{props.firstName + " " + props.lastName}</Text>
            </View>
            {updateRequestLoading &&  
                <ActivityIndicator size="small" color="#0000ff" style={{alignItems:'center', justifyContent:'center'}}/>
            }
            {props.isFriend && !props.isNew &&
                <MessageButton userId={props.userId} firstName={props.firstName} lastName={props.lastName} navigation={props.navigation}/>
            }
            {!props.isFriend && !props.isNew && 
                <View style={styles.requestButtons}>
                    <RequestButton userId={props.userId} title={'Accept'} status={'accept'} onUpdate={props.onUpdate}/>
                    <RequestButton userId={props.userId} title={'Decline'} status={'decline'} onUpdate={props.onUpdate}/>
                </View>
            }
            {!props.isFriend && props.isNew &&
                <TouchableOpacity>
                    <RequestButton userId={props.userId} title={'Connect'} status={'connect'} onUpdate={props.onUpdate}/>
                </TouchableOpacity>
            }
            
        </View>
   </> )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: GigColors.White,
        borderRadius: 4,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: GigColors.Grey,
        borderBottomWidth: 1,
    },
    cardName: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        backgroundColor: GigColors.DarkGrey, 
        borderRadius: 50, 
        marginRight: 20
    },
    name: {
        fontSize: 18,
        textAlign: 'left',
        fontWeight: '600',
        color: GigColors.Black
    },
    requestButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
    },
    requestButton: {
        borderColor: GigColors.Black,
        borderWidth: 1,
        borderRadius: 4,
        padding: 5,
        marginLeft: 5
    },
});