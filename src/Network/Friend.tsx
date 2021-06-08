import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { Avatar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useMutation } from '@apollo/client';
import { ACCEPT_OR_DECLINE_REQUEST } from '../lib/friend';
import { RequestButton } from '../components/Button/RequestButton';
import { GigColors } from '../constants/colors';


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
        <TouchableOpacity 
            style={styles.card} 
            onPress={() => props.navigation.navigate('Profile', { 
                userId: props.userId, isMe: false, skillId: null, navigation: props.navigation
            })}
        > 
            <View style={styles.cardName}>
                <Avatar title={getInitials(props.firstName, props.lastName)} containerStyle={styles.avatar} size={60} />
                <Text style={styles.name}>{props.firstName + " " + props.lastName}</Text>
            </View>
            {updateRequestLoading &&  
                <ActivityIndicator size="small" color="#0000ff" style={{alignItems:'center', justifyContent:'center'}}/>
            }
            {!props.isFriend && !props.isNew && 
                <View style={styles.requestButtons}>
                    <RequestButton 
                        userId={props.userId} 
                        title={'Accept'} 
                        status={'accept'} 
                        onUpdate={props.onUpdate}
                        isConsumer={props.isConsumer}
                    />
                    <RequestButton 
                        userId={props.userId} 
                        title={'Decline'} 
                        status={'decline'} 
                        onUpdate={props.onUpdate}
                        isConsumer={props.isConsumer}
                    />
                </View>
            }
            {!props.isFriend && props.isNew &&
                <TouchableOpacity>
                    <RequestButton 
                        userId={props.userId} 
                        title={'Connect'} 
                        status={'connect'} 
                        onUpdate={props.onUpdate} 
                        isConsumer={props.isConsumer}
                    />
                </TouchableOpacity>
            }
        </TouchableOpacity>
   </> )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: GigColors.White,
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    cardName: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        backgroundColor: GigColors.Taupe, 
        borderRadius: 50, 
        marginRight: 20
    },
    name: {
        fontSize: 18,
        textAlign: 'left',
        fontWeight: '400',
        color: GigColors.Blue
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