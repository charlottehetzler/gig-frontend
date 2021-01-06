import React, { useState, useMemo } from 'react';
import { View, Modal, TextInput, Platform, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import { StyleSheet, Text } from "react-native";
import { GigColors } from '../../constants/colors';
import { Icon } from 'react-native-elements';
import { DefaultButton, DisabledDefaultButton, WhiteDefaultButton } from '../Button/DefaultButton';
import { useQuery, useMutation } from '@apollo/client';
import { GET_All_JOBS } from '../../lib/job';
import { GET_All_CATEGORIES } from '../../lib/category';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { UPDATE_GIG } from '../../lib/gig';

const currentUserId = 4

export function NewGig ( props: any ) {

    const { data: catData, error: catError, loading: catLoading } = useQuery(GET_All_CATEGORIES);
    
    const { data: jobData, error: jobError, loading: jobLoading } = useQuery(GET_All_JOBS);
        
    const [ doSaveGig, { loading: saveGigLoading } ] = useMutation(UPDATE_GIG);
        
    const [ jobs, setJobs] = useState();
    
    const [ categories, setCategories] = useState()

    const [title, setTitle] = useState();
    const [titleIsValid, setTitleIsValid] = useState(false);

    const [date, setDate] = useState(new Date() || props.gig.date);
    const [dateIsValid, setDateIsValid] = useState(false);
    
    const [category, setCategory] = useState();
    const [categoryIsValid, setCategoryIsValid] = useState(false);
    
    const [job, setJob] = useState();
    const [jobIsValid, setJobIsValid] = useState(false);
    
    const [price, setPrice] = useState();
    const [priceIsValid, setPriceIsValid] = useState(false);
    
    const [description, setDescription] = useState();
    
    const [address, setAddress] = useState();
    
    const [mode, setMode] = useState();
    
    const [show, setShow] = useState(false);

    const [header, setHeader] = useState('Add a new Gig');
    
    const [buttonText, setButtonText] = useState('Publish Gig');
    
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
        if (price) {
            setPriceIsValid(true);
        } else {
            setPriceIsValid(false);
        }
        setPriceIsValid(price);
    }


    useMemo(() => {
        if (jobData && jobData?.getAllJobs) {
            const allJobs = (jobData.getAllJobs as any[]).map(job => {
                return {label: job.name, value: job.id};
              });
            setJobs(allJobs)
        } 
        if (catData && catData?.getAllCategories){
            const allCategories = (catData.getAllCategories as any[]).map(category => {
                return {label: category.name, value: category.id};
              });
            setCategories(allCategories);
        }
        if (props.gig) {
            setTitle(props.gig.title);
            setPrice(props.gig.price);
            setDate(props.gig.date);
            setDescription(props.gig.description);
            setJob({value: props.gig.jobId, label: props.gig.jobName});
            setCategory({value: props.gig.categoryId, label: props.gig.categoryName});
            setHeader('Modify your Gig');
            setButtonText('Modify Gig');
        }
    }, [jobData, catData]);


    const categoryChange = (item: any) => {
        categories.map((cat: any) => {
            if (item.value === cat.value) {
                setCategory(cat);
            }
        });
    }

    const jobChange = (item: any) => {
        jobs.map((j: any) => {
            if (item.value === j.value) { 
                setJob(j);
            }
        });
    }

    const isValid = () => { return titleIsValid && priceIsValid;}

    const handleSubmit = async () => {
        try {
            const { data, errors } = await doSaveGig({
                variables: { input: {
                    gigId: props.gig.gigId, title: title, price: price, userId: currentUserId, 
                    date: date, jobId: job.value, description: description
                }}
            });
            if (data.updateGig) {
                props.navigation.navigate('Gigs');
                props.onCancel();
                setTitle('');
                setCategory({value: 0, label: "SELECT"});
                setJob({value: 0, label: "SELECT"});
                setDate(new Date());
                setPrice(0);
                setDescription('');
                setAddress('');
            }
        } catch (e) {
          console.log(e);
        }
    }

    const loading = useMemo(() => {
        return catLoading || jobLoading || saveGigLoading;
    }, [jobLoading, catLoading, saveGigLoading]);
      
    const error = useMemo(() => {
        return catError || jobError ;
    }, [catError, jobError]);

    return (
        <Modal visible={props.visible} animationType='slide'>
        {loading &&  <ActivityIndicator size="small" color="#0000ff" style={{alignItems:'center', justifyContent:'center'}}/>}
            <View style={styles.inputContainer}>
                <View style={styles.headerWrapper}>
                    <TouchableWithoutFeedback onPress={props.onCancel}>
                        <Icon type='material' name='close' style={styles.icon} size={25}/>
                    </TouchableWithoutFeedback>
                    <Text style={styles.title}>{header}</Text>
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
                            onChangeItem={item => categoryChange(item)}
                            containerStyle={{height: 50}}
                            dropDownStyle={{backgroundColor: '#FFFFFF'}}
                            itemStyle={{backgroundColor: '#FFFFFF', borderBottomColor: '#C4C4C4', borderBottomWidth: 1, paddingVertical:20}}
                            zIndex={5000}
                            arrowColor={'#7F7F7F'}
                            labelStyle={{color: '#7F7F7F', textTransform:'uppercase'}}
                            activeLabelStyle={{color: '#000000'}}
                            dropDownMaxHeight={600}
                            searchable={true}
                        />
                    </View>
                    <View style={[styles.input, {zIndex: 999}]}>
                        <Text style={styles.inputLabel}>select your job</Text>
                        <DropDownPicker
                            items={jobs}
                            placeholder="Select your job"
                            onChangeItem={item => jobChange(item)}
                            containerStyle={{height: 50}}
                            dropDownStyle={{backgroundColor: '#FFFFFF'}}
                            itemStyle={{backgroundColor: '#FFFFFF', borderBottomColor: '#C4C4C4', borderBottomWidth: 1, paddingVertical:20}}
                            zIndex={4000}
                            arrowColor={'#7F7F7F'}
                            labelStyle={{color: '#7F7F7F', textTransform:'uppercase'}}
                            activeLabelStyle={{color: '#000000'}}
                            dropDownMaxHeight={600}
                            searchable={true}
                        />
                    </View>
                    <View style={styles.dateWrapper}>
                        <View style={[styles.date, {marginRight: 7}]} >
                            <Text style={styles.inputLabel}>add date</Text>
                            <TouchableWithoutFeedback onPress={showDatepicker} style={styles.datePicker}>
                                <Text>{moment(date).format('LL')}</Text>
                            </TouchableWithoutFeedback >
                            
                        </View>
                        <View style={[styles.date, {marginLeft: 7}]}>
                            <Text style={styles.inputLabel}>add time</Text>
                            <TouchableWithoutFeedback onPress={showTimepicker} style={{borderWidth: 1, borderColor:'red'}}>
                                <Text>{moment(date).format('LT')}</Text>
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
                            value={price}
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
                            <DefaultButton title={buttonText} onPress={handleSubmit} />
                        :
                            <DisabledDefaultButton title={buttonText}/>
                        }
                        {props.gig && <WhiteDefaultButton title={buttonText}/>}
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