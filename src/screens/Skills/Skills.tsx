import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, StatusBar, Text, TouchableOpacity } from 'react-native';
import { GigColors } from '../../constants/colors';
import { DefaultHeader } from '../../components/Header/DefaultHeader';
import { NoDataText } from '../../components/Placeholder/NoDataText';

export default function SkillsScreen(props: any) {

    const skills = props.route.params.skills;
    const categoryName = props.route.params.categoryName;

    const renderItem = ({ item } : any ) => (
        <View >
          <TouchableOpacity style={styles.item} onPress={() => props.navigation.navigate('Producers', {skillId: item['id'], skillName: item['name']})} >
            <Text style={styles.title}>{item['name']} </Text>
          </TouchableOpacity>
        </View>
      );    

    return (
        <SafeAreaView style={styles.container}>
        <View>
            <DefaultHeader title={categoryName} navigation={props.navigation} goBack={true}/>
        </View> 
        {skills && skills.length > 0 && <>
            <FlatList
            data={skills}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            />
        </>}
        {skills && skills.length === 0 &&
            <View style={{marginLeft: 10}}>
                <NoDataText text={`We couldn\'t find any skills for ${categoryName}.`}/>
          </View>
        }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight || 0
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        textTransform: 'uppercase',
        color: GigColors.Black
    },
    item: {
        backgroundColor: GigColors.White,
        borderColor: GigColors.Black,
        borderWidth: 1,
        borderRadius: 4,
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
