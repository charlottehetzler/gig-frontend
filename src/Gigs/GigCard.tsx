import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon, Badge } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GigColors } from '../constants/colors';
import moment from 'moment';
import { useQuery } from '@apollo/client';
import { GET_ONE_SKILL } from '../lib/skill';
import { Gig } from './Gig';

export function GigCard (props: any) {

    const skillId = props.gig.skill.id
    const { data, error, loading } = useQuery(GET_ONE_SKILL, { variables: { query : { skillId: skillId }} });
    const [ skill, setSkill ] = useState();

    const [ isViewMode, setIsViewMode ] = useState(false);
    const closeViewModal = () => setIsViewMode(false);
    
    useMemo(() => {
        if (data && data?.getOneSkill) {
            setSkill(data.getOneSkill.name)
        }
    }, [ data ])


    return (
        <View >
            <TouchableOpacity 
                style={[styles.gig, {width: props.isList ? '95%' : 300, marginBottom: props.isList ? 10 : 0}]} 
                onPress={() => setIsViewMode(true)}
            >
                {!props.isMine && 
                    <View style={styles.badges}>
                        {skill && 
                            <Badge 
                                value={skill} 
                                badgeStyle={{backgroundColor: GigColors.Mustard, paddingHorizontal: 5}}
                                textStyle={{fontSize: 14}}
                            />                    
                        }
                        {props.gig.isClosed && 
                            <Badge 
                                value={'Closed'}
                                badgeStyle={{backgroundColor: GigColors.Sky, paddingHorizontal: 5, marginLeft: 5}}
                                textStyle={{fontSize: 14}}
                            />
                        }
                    </View>
                }
                <View style={styles.header}>
                    {props.isMine && 
                        <View style={[styles.icon, {backgroundColor: props.isConsumer ? GigColors.Sky : GigColors.Mustard}]}>
                            <Icon type='material' name={props.isConsumer ? 'alarm' : 'local-offer'} color={GigColors.White}/>
                        </View>
                    }
                    {!props.isMine && 
                        <View style={[styles.icon, {backgroundColor: props.isConsumer ? GigColors.Mustard : GigColors.Sky}]}>
                            <Icon type='material' name={props.isConsumer ? 'local-offer' : 'alarm'} color={GigColors.White}/>
                        </View>
                    }
                    <View style={{maxWidth: props.isList ? 270 : 210, width: props.isList ? 270 : 200}}>
                        <Text numberOfLines={1} style={styles.title}>{props.gig['title']}</Text>
                        <View style={styles.dates}>
                            <Text style={styles.date}>{moment(props.gig['fromDate']).format('LL')} </Text>
                            <Text style={styles.date}>{moment(props.gig['fromDate']).format('LT')} </Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.description} numberOfLines={2}>{props.gig['description']}</Text>
                <Text style={styles.location} numberOfLines={1}>Location</Text>
            </TouchableOpacity>
            <Gig gig={props.gig} visible={isViewMode} onCancel={closeViewModal} navigation={props.navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    gig: {
        width: 300, 
        backgroundColor: GigColors.White,
        borderRadius: 10,
        paddingTop: 25, 
        paddingBottom: 10,
        paddingHorizontal: 20, 
        marginHorizontal: 16,
        marginTop: 8,
    },
    header: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row', 
    },
    icon: {
        backgroundColor: GigColors.Blue,
        borderRadius: 10,
        padding: 10
    },
    badges: {
        justifyContent: 'flex-end',
        flexDirection: 'row', 
        marginTop: -15, 
        marginBottom: 10
    },
    title: {
        fontSize: 20,
        textAlign: 'left',
        textTransform: 'uppercase',
        color: GigColors.Blue
    },
    dates: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    date: {
        fontSize: 15,
        textAlign: 'center',
        color: GigColors.Blue,
        fontWeight: '300'
    }, 
    description: {
        fontSize: 16,
        color: GigColors.Blue, 
        marginVertical: 12
    },
    location: {
        fontSize: 16,
        color: GigColors.Blue, 
        textAlign: 'right',
        fontWeight: '500'
    }
});