import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { GigColors } from '../../constants/colors';
import { NoDataText } from '../Placeholder/NoDataText';
import { useQuery } from '@apollo/client';
import { GET_FRIENDS } from '../../lib/friend';
import { useSelector } from 'react-redux';
import { MessageButton } from '../Button/MessageButton';
import { GET_ALL_AVAILABLE_LANGUAGES_FOR_USER } from '../../lib/language';

export default function LanguageSearch (props: any) {

    const currentUserId = useSelector((state: any) => state.user.userId);

    const { data, loading, error, refetch } = useQuery(GET_ALL_AVAILABLE_LANGUAGES_FOR_USER, {variables: {query: {currentUserId: currentUserId } }});

    const [ languages, setLanguages ] = useState();

    const [ addedLanguage, setAddedLanguage ] = useState();
        
    const [filtered, setFiltered] = useState();

    const [searching, setSearching] = useState(false);

    useMemo(() => {
        if (data && data?.getFriendsForUser) {
            setLanguages(data?.getFriendsForUser);
        }
    }, [data]);
  
    const onSearch = (text: any) => {
        if (text) {
            setSearching(true);
            const temp = text.toLowerCase();
            let languageNames = [];
            for (const language of languages) {
                const languageItem = [];
                languageItem.push(language.id);
                languageItem.push(language.name);
                languageNames.push(languageItem)
            }
            const tempList = languageNames.filter((item: any) => {
                if (item[1].toLowerCase().includes(temp)) {
                    return item
                }
            })
            setFiltered(tempList);
        } else {
            setSearching(false)
            setFiltered(languages)
        }
    }

    const handleAdd = (item: any) => {
        setAddedLanguage(item);
        props.onSelect(item[1], item[0], true);
        setFiltered(false);
        setSearching(false);
      }

    return (
        <View>
            <TextInput 
                style={styles.textInput}
                placeholder="Search"
                placeholderTextColor={GigColors.Grey}
                onChangeText={onSearch}
            />
            {searching &&
            <View style={styles.subContainer}>
                {loading &&  <ActivityIndicator size="small" color="#0000ff" style={{alignItems:'center', justifyContent:'center'}}/>}
                    
                {filtered.length > 0 ?
                    filtered.map((item: any) => {
                        return (
                            <View style={styles.itemView} key={item.id}>
                                <TouchableOpacity onPress={() => handleAdd(item)} >
                                    <Text style={styles.itemText}>{item[1]}</Text>
                                </TouchableOpacity>
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
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'center',
        marginBottom: 20
    },
    itemView: {
        backgroundColor: GigColors.White,
        height: 30,
        width: '95%',
        marginBottom: 10,
        justifyContent: 'flex-start',
        borderRadius: 4,
    },
    noResultView: {
        alignSelf: 'flex-start',
        height: 75,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'center'
    },
    noResultText: {
        fontSize: 18,
        color: GigColors.DarkGrey
    },
    itemText: {
        color: GigColors.Black,
        fontSize: 16
    },
    textInput: {
        backgroundColor: GigColors.White,
        width: '100%',
        borderRadius: 5,
        height: 50,
        fontSize: 20,
        paddingHorizontal: 10,
    }
})