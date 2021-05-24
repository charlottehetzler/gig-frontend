import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import { GigColors } from '../../constants/colors';
import { NoDataText } from '../Placeholder/NoDataText';
import { useQuery } from '@apollo/client';
import { GET_FRIENDS } from '../../lib/friend';
import { useSelector } from 'react-redux';
import { MessageButton } from '../Button/MessageButton';
import { Icon } from 'react-native-elements';


export default function FriendSearch (props: any) {

    const currentUserId = useSelector((state: any) => state.user.userId);

    const { data, loading, error, refetch } = useQuery(GET_FRIENDS, {variables: {query: {currentUserId: currentUserId } }});

    const [ friends, setFriends ] = useState()
        
    const [filtered, setFiltered] = useState();

    const [searching, setSearching] = useState(false);
    
    const [ iconVisible, setIconVisible ] = useState(false);
  
    const [ searchText, setSearchText ] = useState('');

    useMemo(() => {
        if (data && data?.getFriendsForUser) {
            setFriends(data?.getFriendsForUser);
        }
    }, [data]);
  
    const onSearch = (text: any) => {
        if (text) {
            setSearching(true);
            setSearchText(text);
            setIconVisible(true);
            const temp = text.toLowerCase();
            let friendNames = [];
            for (const friend of friends) {
                const friendItem = [];
                const name = friend.firstName + " " + friend.lastName;
                friendItem.push(friend.id);
                friendItem.push(name);
                friendItem.push(friend.firstName);
                friendItem.push(friend.lastName);
                friendNames.push(friendItem)
            }
            const tempList = friendNames.filter((item: any) => {
                if (item[1].toLowerCase().includes(temp)) {
                    return item
                }
            })
            setFiltered(tempList);
        } else {
            setSearching(false)
            setFiltered(friends)
        }
    }

    const onCancel = () => {
        setFiltered(false);
        setSearching(false);
        setIconVisible(false);
        setSearchText('')
      }

    return (
        <View >
            <View style={styles.input}>
                <TextInput 
                    style={styles.textInput}
                    placeholder="Search"
                    placeholderTextColor={GigColors.Grey}
                    onChangeText={onSearch}
                />
                <TouchableWithoutFeedback onPress={onCancel}>
                    <Icon type='material' name='close' color={GigColors.Blue} style={ iconVisible ? styles.visible : styles.nonVisible} size={25}/>
                </TouchableWithoutFeedback>
            </View>
            {searching &&
            <View style={styles.subContainer}>
                {loading &&  <ActivityIndicator size="small" color="#0000ff" style={{alignItems:'center', justifyContent:'center'}}/>}
                    
                {filtered.length > 0 ?
                    filtered.map((item: any) => {
                        return (   
                            <View style={styles.itemView} key={item.id}>
                                {props.isChat ?
                                    <MessageButton title={item[1]} userId={item[0]} firstName={item[2]} lastName={item[3]} isSearchBar={true} navigation={props.navigation} onSelect={props.onSelect}/>
                                :
                                    <TouchableOpacity onPress={() => props.navigation.navigate('Profile', {userId: item[0]} )} >
                                        <Text style={styles.itemText}>{item[1]}</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        )
                    })
                :
                    <View style={styles.noResultView}>
                        <NoDataText text={`No friend was found according to your search.`}/>
                    </View>
                }
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    subContainer: {
        backgroundColor: GigColors.White,
        paddingTop: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        // marginHorizontal: 16, 
        marginTop: -5
    },
    input: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginHorizontal: 16,
        backgroundColor: GigColors.White, 
        borderRadius: 10,
    },
    visible: {
        alignItems:'flex-end',
        marginRight: 20,
      },
      nonVisible: {
        display: 'none'
      },
    itemView: {
        backgroundColor: GigColors.White,
        height: 30,
        width: '90%',
        marginBottom: 10,
        justifyContent: 'center',
        borderRadius: 4,
    },
    noResultView: {
        alignSelf: 'flex-start',
        height: 75,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    noResultText: {
        fontSize: 18,
        color: GigColors.Taupe
    },
    itemText: {
        color: GigColors.Blue,
        fontSize: 16
    },
    textInput: {
        height: 50,
        fontSize: 20,
        paddingHorizontal: 10,
        flex: 1,
        width: '100%',
        borderRadius: 5,
    }
})