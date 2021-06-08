import React, { useState, useMemo, useEffect } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, StatusBar, Text, TouchableOpacity, ActivityIndicator, AsyncStorage } from 'react-native';
import { DefaultHeader } from '../components/Header/DefaultHeader';
import { GET_All_SKILLS } from '../lib/skill';
import { GET_ALL_DEALS_FOR_PRODUCER, GET_ALL_GIGS, GET_ALL_GIGS_FOR_CONSUMER } from '../lib/gig';
import { useQuery } from '@apollo/client';
import { ScrollView } from 'react-native-gesture-handler';
import { GigColors } from '../constants/colors';
import { useSelector } from 'react-redux';
import SearchBar from '../components/Search/SearchBar';
import { SeeAllButton } from '../components/Button/SeeAllButton';
import { NewGig } from './NewGig';

export default function HomeScreen (props: any) {

  const currentUserId = useSelector((state: any) => state.user.userId);
  const type = useSelector( (state: any) => state.user.userType);
  const isConsumer = () => { return type === 'consumer' }

  const { data, error, loading, refetch } = useQuery(GET_All_SKILLS);
  //producer's deals
  const { data: dealData, error: dealError, loading: dealLoading, refetch: dealRefetch } = useQuery(
    GET_ALL_DEALS_FOR_PRODUCER, { variables: { userId: currentUserId }}
  );
  //gigs (either hotDeals or nowWanted)
  const { data: gigData, error: gigsError, loading: gigsLoading, refetch: gigsRefetch } = useQuery(
    GET_ALL_GIGS, { variables: { isAd: isConsumer() } }
  );
  //consumer's posts
  const { data: postData, error: postError, loading: postLoading, refetch: postRefetch } = useQuery(
    GET_ALL_GIGS_FOR_CONSUMER, { variables: { userId: currentUserId }}
  );

  const [ skills, setSkills ] = useState();
  const [ deals, setDeals ] = useState();
  const [ gigs, setGigs ] = useState();
  const [ posts, setPosts ] = useState();

  const [ isAddMode, setIsAddMode ] = useState(false);
  const [ isEditMode, setIsEditMode ] = useState(false);
  
  const closeAddModal = () => setIsAddMode(false);
  const closeEditModal = () => setIsEditMode(false);

  useMemo(() => {
    if (data && data?.getAllSkills) {
      setSkills(data?.getAllSkills)
    }
    if (gigData && gigData?.getAllGigs) {
      setGigs(gigData?.getAllGigs)
    }

    if (isConsumer()) {
      if(postData && postData?.getAllGigsForConsumer) {
        setPosts(postData?.getAllGigsForConsumer);
      }
    } else {
      if (dealData && dealData?.getAllDealsForProducer) {
        setDeals(dealData?.getAllDealsForProducer);
      }
    }    
  },[ data, dealData, gigData, postData ]);

  useEffect(() => {
    fetchSkills();
  }, []);


  const fetchSkills = async () => {
    // try {
    //   const newSkills = await refetch();
    //   setSkills(newSkills.data.getAllSkills);
    // } catch (e) {
    //   console.log(e)
    // }
  }


  const renderItem = ({ item } : any ) => (
    <View>
      <TouchableOpacity 
        style={styles.item} 
        onPress={() => props.navigation.navigate('Producers', { 
          skillId: item['id'], skillName: item['name'], isConsumer: isConsumer()
        })} 
      >
        <Text style={styles.title}>{item['name']} </Text>
      </TouchableOpacity>
    </View>
  );

  const renderDeal = ({ item } : any ) => (
    <View>
      <TouchableOpacity style={styles.item} >
        <Text style={styles.title}>{item['title']} </Text>
      </TouchableOpacity>
    </View>
  );
    
  return (
    
    <SafeAreaView style={styles.container}>
      <View>
        <DefaultHeader title={'Home'} navigation={props.navigation} goBack={false} isConsumer={isConsumer()}/>
      </View>
      {loading && <ActivityIndicator size="small" color="#0000ff" style={{alignItems:'center', justifyContent:'center'}}/>}
      
      {!loading &&  <>
      <SearchBar navigation={props.navigation} isPersonal={false} refetchSkills={fetchSkills} profileMode={false}/>
      <ScrollView>
        <Text style={styles.h4Style}>{isConsumer() ? 'Hot deals' : 'Now wanted'}</Text>
        <FlatList
          data={isConsumer() ? deals : gigs}
          renderItem={renderDeal}
          keyExtractor={item => item.id.toString()}
          horizontal
          style={styles.flatListHorizontal}
        />
        <View style={styles.subHeader}>
          <Text style={styles.h4Style}>New gigs</Text>
          <SeeAllButton case={'categories'} navigation={props.navigation} isConsumer={isConsumer()}/>
        </View>
        <FlatList
          data={skills}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          horizontal
          style={styles.flatListHorizontal}
        />
        <View style={styles.subHeader}>
          <Text style={styles.h4Style}>{isConsumer() ? 'My gigs' : 'My deals'}</Text>
          <TouchableOpacity style={styles.moreButton} onPress={() => setIsAddMode(true)}>
            <Text style={styles.underline}>{isConsumer() ? 'Add gig' : 'Add deal'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.deals}>
          <FlatList
            data={isConsumer() ? posts : deals}
            renderItem={renderDeal}
            keyExtractor={item => item.id.toString()}
            horizontal
            style={styles.flatListHorizontal}
          />
        </View>
        <NewGig 
          visible={isAddMode} 
          onCancel={closeAddModal}
          data={isConsumer() ? posts : gigs}
          refetchDeals={dealRefetch} 
          refetchGigs={gigsRefetch} 
          refetchPosts={postRefetch}
        />
      </ScrollView>
      </>}
    </SafeAreaView>
  ) 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0
  },
  h4Style: {
    marginTop: 25,
    fontSize: 26,
    marginHorizontal: 16,
    color: GigColors.Blue  
  },
  flatListHorizontal: {
    height: 125
  },
  item: {
    backgroundColor: GigColors.White,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 125
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: GigColors.Blue
  },
  moreButton: {
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 5,
    justifyContent: "center",
    marginBottom: 0,
    marginRight: 16
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  }, 
  deals: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  underline: {
    color: GigColors.Blue,
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    textDecorationColor: GigColors.Blue, 
    fontSize: 16,
  }
});