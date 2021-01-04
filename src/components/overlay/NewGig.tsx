import React, { useState, useMemo, isValidElement } from 'react';
import { View, Modal, TextInput, Platform, Button, TouchableOpacity } from 'react-native';
import { StyleSheet, Text } from "react-native";
import { GigColors } from '../../constants/colors';
import { Icon } from 'react-native-elements';
import { DefaultButton, DisabledDefaultButton } from '../Button/DefaultButton';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useQuery, useMutation } from '@apollo/client';
import { GET_All_JOBS } from '../../lib/job';
import { GET_All_CATEGORIES } from '../../lib/category';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { CREATE_GIG } from '../../lib/gig';

const currentUserId = 4

export function NewGig (props:any) {

    const { data: catData, error: catError, loading: catLoading } = useQuery(GET_All_CATEGORIES);
    
    const { data: jobData, error: jobError, loading: jobLoading } = useQuery(GET_All_JOBS);

    const [ doSaveGig, { loading: saveGigLoading } ] = useMutation(CREATE_GIG);
    const [ newGig, setNewGig] = useState();

    const [title, setTitle] = useState();
    const [titleIsValid, setTitleIsValid] = useState(false);

    const [date, setDate] = useState(new Date());
    const [dateIsValid, setDateIsValid] = useState(false);
    
    const [time, setTime] = useState();
    const [timeIsValid, setTimeIsValid] = useState(false);
    
    const [category, setCategory] = useState();
    const [categoryIsValid, setCategoryIsValid] = useState(false);
    
    const [job, setJob] = useState();
    const [jobIsValid, setJobIsValid] = useState(false);
    
    const [price, setPrice] = useState(0);
    const [priceIsValid, setPriceIsValid] = useState(false);
    
    const [description, setDescription] = useState();
    
    const [address, setAddress] = useState();
    
    const [mode, setMode] = useState();

    const [show, setShow] = useState(false);


    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setShow(false)
    };
    
    const showMode = (currentMode: string ) => {
        setShow(true);
        setMode(currentMode);
    };
    
    const showDatepicker = () => {
        showMode('date');
    };
    
    const showTimepicker = () => {
        showMode('time');
    };
    
    const titleChangeHandler = (title: string) => {
        if (title.trim().length < 5) {
            setTitleIsValid(false);
        } else {
            setTitleIsValid(true);
        }
        setTitle(title);
    }

    const priceChangeHandler = (price: any) => {
        if (price === 0) {
            setPriceIsValid(false);
        } else {
            setPriceIsValid(true);
        }
        setPriceIsValid(price);
    }

    const categories = useMemo(() => {
        if (catData?.getAllCategories) {
          const allCategories = (catData.getAllCategories as any[]).map(category => {
            return {label: category.name, value: category.id};
          });
        return allCategories;
        } else {
          return [];
        }
    }, [catData]);

    const jobs = useMemo(() => {
        if (jobData?.getAllJobs) {
          const allJobs = (jobData.getAllJobs as any[]).map(job => {
            return {label: job.name, value: job.id};
          });
        return allJobs;
        } else {
          return [];
        }
    }, [jobData]);

    const categoryChange = (item: any) => {
        categories.map((cat) => {
            if (item.value === cat.value) {
                setCategory(cat);
            }
        });
    }
    
    const jobChange = (item: any) => {
        jobs.map((j) => {
            if (item.value === j.value) { 
                setJob(j);
            }
        });
    }

    const isValid = () => {
        return titleIsValid && priceIsValid;
    }

    const handleSubmit = async () => {
        try {
            const { data, errors } = await doSaveGig({
                variables: { input: {
                    title: title, price: price, userId: currentUserId, 
                    date: date, jobId: job.value, description: description
                }}
            });
            if (data.createGig) {
                props.navigation.navigate('Gigs');
                props.onCancel();
                setTitle('');
                setCategory('Select');
                setJob('Select');
                setDate(new Date(1598051730000));
                setPrice(0);
                setDescription('');
                setAddress('');
            }
        } catch (e) {
          console.log(e);
        }
    }

    const onNavigate = () => {
        
        () => props.navigation.navigate('Gigs')
    }

    return (
        <Modal visible={props.visible} animationType='slide'>
            <View style={styles.inputContainer}>
                <View style={styles.headerWrapper}>
                    <TouchableWithoutFeedback onPress={props.onCancel}>
                        <Icon type='material' name='close' style={styles.icon} size={25}/>
                    </TouchableWithoutFeedback>
                    <Text style={styles.title}>Add a new gig</Text>
                </View>
                <View style={styles.container}>
                    <TextInput
                        placeholder={"Title of your gig"}
                        style={styles.textInputBig}
                        value={title}
                        onChangeText={titleChangeHandler}
                        keyboardType={'default'}
                    />
                    <View style={[styles.input, {zIndex: 9999}]}>
                        <Text style={styles.inputLabel}>select area of your job</Text>
                        <DropDownPicker
                            items={categories}
                            placeholder="Select an area"
                            containerStyle={{height: 50}}
                            onChangeItem={item => categoryChange(item)}
                            dropDownStyle={{backgroundColor: '#FFFFFF'}}
                            itemStyle={{backgroundColor: '#FFFFFF', borderBottomColor: '#C4C4C4', borderBottomWidth: 1, paddingVertical:20}}
                            zIndex={5000}
                            arrowColor={'#7F7F7F'}
                            labelStyle={{color: '#7F7F7F', textTransform:'uppercase'}}
                            activeLabelStyle={{color: '#000000'}}
                            dropDownMaxHeight={600}
                        />
                    </View>
                    <View style={[styles.input, {zIndex: 999}]}>
                        <Text style={styles.inputLabel}>select your job</Text>
                        <DropDownPicker
                            items={jobs}
                            placeholder="Select you job"
                            containerStyle={{height: 50}}
                            onChangeItem={item => jobChange(item)}
                            dropDownStyle={{backgroundColor: '#FFFFFF'}}
                            itemStyle={{backgroundColor: '#FFFFFF', borderBottomColor: '#C4C4C4', borderBottomWidth: 1, paddingVertical:20}}
                            zIndex={4000}
                            arrowColor={'#7F7F7F'}
                            labelStyle={{color: '#7F7F7F', textTransform:'uppercase'}}
                            activeLabelStyle={{color: '#000000'}}
                            dropDownMaxHeight={600}
                        />
                    </View>
                    <View style={styles.dateWrapper}>
                        <View style={[styles.date, {marginRight: 7}]} >
                            <Text style={styles.inputLabel}>add date</Text>
                            <TouchableWithoutFeedback onPress={showDatepicker} style={styles.datePicker}>
                                <View>
                                    <Text>{moment(date).format('LL')}</Text>
                                </View>
                            </TouchableWithoutFeedback >
                            
                        </View>
                        <View style={[styles.date, {marginLeft: 7}]}>
                            <Text style={styles.inputLabel}>add time</Text>
                            <TouchableWithoutFeedback onPress={showTimepicker} style={styles.datePicker}>
                                <View>
                                    <Text>{moment(date).format('LT')}</Text>
                                </View>
                            </TouchableWithoutFeedback >
                        </View>
                    </View>
                    {show && (
                        <DateTimePicker
                            value={date}
                            testID="dateTimePicker"
                            onChange={onChange}
                            mode={mode}
                            display={'spinner'}
                            minimumDate={new Date()}
                        />
                    )}
                    <View style={[styles.input, {zIndex: 888}]}>
                        <Text style={styles.inputLabel}>Price of your gig</Text>
                        <TextInput
                            placeholder={"add your price"}
                            style={styles.textInput}
                            value={address}
                            onChangeText={priceChangeHandler}
                            keyboardType={'decimal-pad'}
                        />
                    </View>
                    <View style={[styles.input, {zIndex: 888}]}>
                        <Text style={styles.inputLabel}>Address of your gig</Text>
                        <TextInput
                            placeholder={"SELECT"}
                            style={styles.textInput}
                            value={address}
                            onChangeText={setAddress}
                            keyboardType={'default'}
                        />
                    </View>
                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Description</Text>
                        <TextInput
                            placeholder={"SELECT"}
                            style={styles.textInput}
                            value={description}
                            onChangeText={setDescription}
                            keyboardType={'default'}
                        />
                    </View>
                    <View style={styles.button}>
                        {isValid() ? 
                            <DefaultButton title={'publish gig'} onPress={handleSubmit} />
                        :
                            <DisabledDefaultButton title={'publish gig'}/>
                        }
                    </View>
                </View>
            </View>

        </Modal>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        marginTop: 60
    },
    icon: {
        alignItems:'flex-end',
        marginRight: 20
    },
    headerWrapper: {
    },
    title: {
        fontWeight: '600',
        color: GigColors.Black,
        fontSize: 24,
        textAlign: 'center'
    },
    container: {
        padding: 10,
    },
    input: {
        marginVertical: 10,
    },
    textInputBig: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderBottomColor: GigColors.DarkGrey,
        marginVertical: 15,
        fontSize: 18, 
        color: GigColors.Black
    },
    inputLabel:{
        textTransform: 'uppercase',
        fontWeight: '500',
        marginBottom: 5
    },
    textInput: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: GigColors.Grey,
        borderRadius: 5,
        color: GigColors.Black
    },
    dateWrapper: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginVertical: 15,

    },
    date: {
        flex: 1
    }, 
    button: {
        marginTop: 15
    },
    dateInput: {
        color: GigColors.Black
    },
    datePicker:{
        paddingHorizontal: 10,
        paddingVertical: 15,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderColor: GigColors.Grey,
        borderRadius: 5,
        color: GigColors.Black
    }
 });