import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { Avatar, Rating, AirbnbRating } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GigColors } from '../../constants/colors';
import { useQuery } from '@apollo/client';
import { GET_AVG_RATING_FOR_SKILL } from '../../lib/review';


type Props = { firstName: string, lastName: string, userId: number, navigation: any, skillId: number }

export function Producer ({firstName, lastName, userId, navigation, skillId} : Props) {
    
    const { data, loading, error } = useQuery(GET_AVG_RATING_FOR_SKILL, {variables: {query: {skillId: skillId, userId: userId} }});  
    
    const [ avgRating, setAvgRating ] = useState();

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
    const { navigate } = navigation;

    
    return ( <>
        {loading &&  <ActivityIndicator size="small" color='#000000' style={{alignItems:'center', justifyContent:'center'}}/>}

        <TouchableOpacity style={styles.card} onPress={() => navigate('Profile', {userId: userId, isMe: false, skillId: skillId})}>
            <Avatar title={getInitials(firstName, lastName)} containerStyle={styles.avatar} size={60} />
        
            <View style={styles.text}>
                <Text style={styles.name}>{firstName + " " + lastName}</Text>
                <AirbnbRating
                    count={5}
                    selectedColor={GigColors.Black}
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
        borderRadius: 4,
        paddingVertical: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: GigColors.Grey,
        borderBottomWidth: 1,
    },
    avatar: {
        backgroundColor: GigColors.DarkGrey, 
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
        color: GigColors.Black,
        marginBottom: 5
    },
    date: {
        fontSize: 12,
        textAlign: 'right',
        fontWeight: '300',
        color: GigColors.Grey
    }
});