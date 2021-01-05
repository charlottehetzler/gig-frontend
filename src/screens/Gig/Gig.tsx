import React, { useState } from 'react';
import { View, SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';
import { WhiteHeader } from '../../components/Header/WhiteHeader';
import { Avatar } from 'react-native-elements';
import { GigColors } from '../../constants/colors';
import { DefaultButton } from '../../components/Button/DefaultButton';
import moment from 'moment';
import { NewGig } from '../../components/overlay/NewGig';

export default function GigScreen (props: any) {
    // const gig = props.navigation.getParam('gig');

    // const otherUser = props.navigation.getParam('otherUser');

    const { gig, otherUser } = props.route.params;

    const [ isAddMode, setIsAddMode ] = useState(false);

    const getInitials = (firstName : string, lastName : string) => {
        let first = firstName.charAt(0).toUpperCase();
        let last = lastName.charAt(0).toUpperCase();
        return first + last;
    }

    const hasDescription = () => {
        return gig.description !== "";
    }

    const closeModal = () => {
        setIsAddMode(false)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <WhiteHeader title={gig.title} navigation={props.navigation}/>
            </View>
            <Text style={styles.title}>{gig.title}</Text>
            <View style={styles.gigWrapper}>
                {hasDescription() ? <Text style={styles.description}>{gig.description}</Text> : <Text></Text>}
                <View style={styles.userWrapper}>
                    <Avatar title={getInitials(otherUser.firstName, otherUser.lastName)} containerStyle={styles.avatar} size={40} />
                    <Text style={styles.user}>{otherUser.firstName + " " + otherUser.lastName}</Text>
                </View>
                <View style={styles.dateWrapper}>
                    <Text style={styles.info}>{moment(gig.date).format('LL')}</Text>
                    <Text style={styles.info}>{moment(gig.date).format('LT')}</Text>
                </View>
                {/* <Text style={styles.info}>{gig.streetRoadName + " " + gig.houseNumber + ", " + gig.stateCountry}</Text>
                <Text style={styles.price}>{gig.price + gig.currency}</Text> */}
            </View>
            <View style={styles.buttonWrapper}>
                <DefaultButton title={'Modify gig'} navigation={props.navigation} onPress={() => setIsAddMode(true)}/>
                <DefaultButton title={'claim an expense'} navigation={props.navigation}/>
                <DefaultButton title={'Gig completed'} navigation={props.navigation}/>
                <NewGig visible={isAddMode} onCancel={closeModal} navigation={props.navData} gig={gig}/>

            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight || 0,
        width: '100%', 
        height: '100%'
    },
    title: {
        textAlign: 'center',
        color: GigColors.Black, 
        fontWeight: '600',
        fontSize: 24, 
        backgroundColor: GigColors.White
    },
    gigWrapper: {
        backgroundColor: GigColors.White,
        paddingHorizontal: 15,
        paddingBottom: 30, 
        borderBottomColor: GigColors.Grey,
        borderBottomWidth: 1, 
    },
    description: {
        fontSize: 16,
        color: GigColors.DarkGrey,
        marginTop: 20,
        marginBottom: 10
    },
    userWrapper: {
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        marginVertical: 15
    },
    avatar: {
        backgroundColor: GigColors.DarkGrey, 
        borderRadius: 50, 
        marginRight: 10
    },
    user: {
        color: GigColors.Black,
        fontWeight: '500', 
        fontSize: 20
    },
    dateWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center'
    }, 
    info: {
        fontSize: 16, 
        color: GigColors.DarkGrey,
        marginBottom: 10
    }, 
    price: {
        fontWeight: '600', 
        fontSize: 20,
        textAlign: 'right'
    },
    buttonWrapper: {
        flex: 1, 
        marginHorizontal: 10,
        marginTop: 20
    }

});
