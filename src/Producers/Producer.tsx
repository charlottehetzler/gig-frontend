import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { Avatar, AirbnbRating } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useQuery } from '@apollo/client';
import { GET_AVG_RATING_FOR_SKILL } from '../lib/review';
import { GigColors } from '../constants/colors';

export function Producer ( props: any ) {

    const { data, loading, error } = useQuery(GET_AVG_RATING_FOR_SKILL, {variables: {query: {skillId: props.skillId, userId: props.userId} }});  
    const [ avgRating, setAvgRating ] = useState(0);

    useMemo(() => {
        if (data && data?.getAvgRatingForSkill) {
            setAvgRating(data?.getAvgRatingForSkill);
        }
    }, [data]);

    const getInitials = (firstName : string, lastName : string) => {
        let first = firstName.charAt(0).toUpperCase();
        let last = lastName.charAt(0).toUpperCase();
        return first + last;
    }

    const handlePress = () => {
        // if (props.onClose) await props.onClose;
        props.navigation.navigate('Profile', { 
            userId: props.userId, isMe: false, skillId: props.skillId, navigation: props.navigation, isConsumer: props.isConsumer
        });
    }
    
    return ( <>
        {loading &&  <ActivityIndicator size="large" color={GigColors.Blue} style={{alignItems:'center', justifyContent:'center'}}/>}

        <TouchableOpacity style={styles.card} onPress={handlePress}>
            <Avatar title={getInitials(props.firstName, props.lastName)} containerStyle={styles.avatar} size={60} />
        
            <View style={styles.text}>
                <Text style={styles.name}>{props.firstName + " " + props.lastName}</Text>
                <AirbnbRating
                    count={5}
                    selectedColor={GigColors.Blue}
                    defaultRating={avgRating}
                    size={15}
                    showRating={false}
                    isDisabled={true}
                />
            </View>
        </TouchableOpacity>
   </> )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: GigColors.White,
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        backgroundColor: GigColors.Taupe, 
        borderRadius: 50, 
        marginRight: 20
    },
    text: {
        width: 200,
        alignItems: 'flex-start'
    },
    name: {
        fontSize: 18,
        textAlign: 'left',
        fontWeight: '600',
        color: GigColors.Blue,
        marginBottom: 5
    },
    date: {
        fontSize: 12,
        textAlign: 'right',
        fontWeight: '300',
        color: GigColors.Grey
    }
});