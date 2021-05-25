import React, { useState, useMemo } from 'react';
import { View, Modal, TextInput, ActivityIndicator, TouchableWithoutFeedback, Platform } from 'react-native';
import { StyleSheet, Text } from "react-native";
import { GigColors } from '../constants/colors';
import { DefaultButton, DisabledDefaultButton } from '../components/Button/DefaultButton';
import { CREATE_DEAL } from '../lib/deal';
import { GET_All_CATEGORIES } from '../lib/category';
import DropDownPicker from 'react-native-dropdown-picker';
import { useQuery, useMutation } from '@apollo/client';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';


export function NewDeal ( props: any ) {

    const currentUserId = useSelector((state: any) => state.user.userId);

    const { data: catData, error: catError, loading: catLoading } = useQuery(GET_All_CATEGORIES);

    const [ doSaveDeal, { loading: saveDealLoading } ] = useMutation(CREATE_DEAL);
            
    const [ categories, setCategories ] = useState()
    const [ category, setCategory ] = useState();
    const [ categoriesD, setCategoriesD ] = useState()

    const [ skill, setSkill ] = useState();
    const [ skillId, setSkillId ] = useState();
    const [ skillIsValid, setSkillIsValid ] = useState(false);
    
    const [ categorySkills, setCategorySkills ] = useState();

    
    const [ title, setTitle ] = useState();
    const [ titleIsValid, setTitleIsValid ] = useState();
    
    const [ description, setDescription ] = useState();
    const [ descriptionIsValid, setDescriptionIsValid ] = useState();
    
    const [ fromDate, setFromDate ] = useState(new Date ());
    const [ toDate, setToDate ] = useState(); 
    
    const [ modeFrom, setModeFrom ] = useState();
    const [ showFrom, setShowFrom ] = useState(false);

    const [ modeTo, setModeTo ] = useState();
    const [ showTo, setShowTo] = useState(false);
    
    useMemo(() => {
        if (catData && catData?.getAllCategories){
            const allCategories = (catData.getAllCategories as any[]).map(category => {
                return {label: category.name, value: category.id};
              });
            setCategories(allCategories);
            setCategoriesD(catData?.getAllCategories);
        }
    }, [catData]);

    const categoryChange = (item: any) => {
        categories.map((cat: any) => {
            if (item.value === cat.value) {
                setCategory(cat);
            }
        });

        categoriesD.map((cat: any) => {
            if (item.value === cat.id) {
                if (cat.categorySkills.length > 0) {
                    const skills = (cat.categorySkills as any[]).map(skill => {
                        return { label: skill.name, value: skill.id };
                    });
                    setCategorySkills(skills);
                }
            }
        });
    }

    const skillChange = (item: any) => {
        categorySkills.map((skill: any) => {
            if (item.value === skill.value) {
                setSkill(skill);
                setSkillId(skill.value);
                setSkillIsValid(true);
            }
        });
    }

    const titleChangeHandler = (title: string) => {
        if (title.trim().length < 5) {
            setTitleIsValid(false);
        } else {
            setTitleIsValid(true);
        }
        setTitle(title);
    }

    const descriptionChangeHandler = (description: string) => {
        if (description.trim().length < 25) {
            setDescriptionIsValid(false);
        } else {
            setDescriptionIsValid(true);
        }
        setDescription(description);
    }

    const fromDateChangeHandler = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || fromDate;
        setShowFrom(Platform.OS === 'ios');
        setFromDate(currentDate);
        setShowFrom(false)
    };
    const toDateChangeHandler = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || toDate;
        setShowTo(Platform.OS === 'ios');
        setToDate(currentDate);
        setShowTo(false)
    };
    
    const showMode = (currentMode: string, type: string) => {
        if (type === 'from') {
            setShowFrom(true);
            setModeFrom(currentMode);
        } else {
            setShowTo(true);
            setModeTo(currentMode);
        }
    };
    
    const showDatepickerFrom = () => showMode('date', 'from');
    const showTimepickerFrom = () => showMode('time', 'from');
    
    const showDatepickerTo = () => showMode('date', 'to');
    const showTimepickerTo = () => showMode('time', 'to');

    const isValid = () => { return skillIsValid && titleIsValid && descriptionIsValid }

    const handleSubmit = async () => {
        try {

            const { data, errors } = await doSaveDeal({
                variables: { input: {
                    userId: currentUserId, categoryId: category.value, skillId: skill.value, 
                    title: title, description: description, fromDate: fromDate, toDate: toDate
                }}
            });
            console.log(errors)
            props.onCancel();
            props.refetchDeals();
        } catch (e) {
          console.log(e);
        }
    }

    const loading = useMemo(() => {
        return catLoading || saveDealLoading;
    }, [catLoading, saveDealLoading]);
      
    const error = useMemo(() => {
        return catError;
    }, [catError]);
    

    return (
        <Modal visible={props.visible} animationType='slide'>
        {loading &&  <ActivityIndicator size="small" color="#0000ff" style={{alignItems:'center', justifyContent:'center'}}/>}
            <View style={styles.inputContainer}>
                
                <View >
                    <TouchableWithoutFeedback onPress={props.onCancel}>
                        <Icon type='material' name='close' style={styles.icon} size={25}/>
                    </TouchableWithoutFeedback>
                    <Text style={styles.title}>Add a new deal</Text>
                </View>

                <View style={styles.container}>
                    <View style={[styles.input, {zIndex: 999}]}>
                        <Text style={styles.inputLabel}>Title</Text>
                        <TextInput
                            placeholder={"Title of your deal"}
                            style={styles.textInput}
                            value={title}
                            onChangeText={titleChangeHandler}
                            keyboardType={'default'}
                        />
                    </View>
           
                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Short description</Text>
                        <TextInput
                            placeholder={"Describe your deal"}
                            style={styles.textInput}
                            value={description}
                            onChangeText={descriptionChangeHandler}
                            keyboardType={'default'}
                        />
                    </View>
                    <View style={styles.dateWrapper}>
                        <View style={[styles.date, {marginRight: 7}]} >
                            <Text style={styles.inputLabel}>Start Date</Text>
                            <TouchableWithoutFeedback onPress={showDatepickerFrom} >
                                <Text style={styles.datePicker}>{moment(fromDate).format('LL')}</Text>
                            </TouchableWithoutFeedback >
                            
                        </View>
                        <View style={[styles.date, {marginLeft: 7}]}>
                            <Text style={styles.inputLabel}>Start Time</Text>
                            <TouchableWithoutFeedback onPress={showTimepickerFrom}>
                                <Text style={styles.datePicker}>{moment(fromDate).format('LT')}</Text>
                            </TouchableWithoutFeedback >
                        </View>
                    </View>
                    {/* <View style={styles.dateWrapper}>
                        <View style={[styles.date, {marginRight: 7}]} >
                            <Text style={styles.inputLabel}>End Date</Text>
                            <TouchableWithoutFeedback onPress={showDatepickerTo} >
                                <Text style={styles.datePicker}>{moment(toDate).format('LL')}</Text>
                            </TouchableWithoutFeedback >
                            
                        </View>
                        <View style={[styles.date, {marginLeft: 7}]}>
                            <Text style={styles.inputLabel}>End Time</Text>
                            <TouchableWithoutFeedback onPress={showTimepickerTo}>
                                <Text style={styles.datePicker}>{moment(toDate).format('LT')}</Text>
                            </TouchableWithoutFeedback >
                        </View>
                    </View> */}
                    {showFrom && (
                        <DateTimePicker
                            value={fromDate}
                            testID="dateTimePicker"
                            onChange={fromDateChangeHandler}
                            mode={modeFrom}
                            display={'spinner'}
                            minimumDate={new Date()}
                        />
                    )}
                    {showTo && (
                        <DateTimePicker
                            value={toDate}
                            testID="dateTimePickerr"
                            onChange={toDateChangeHandler}
                            mode={modeTo}
                            display={'spinner'}
                            minimumDate={new Date()}
                        />
                    )}
                    {categories && 
                        <View style={[styles.input, {zIndex: 9999}]}>
                            <Text style={styles.inputLabel}>Category</Text>
                            <DropDownPicker
                                items={categories}
                                placeholder="Select a category"
                                onChangeItem={item => categoryChange(item)}
                                containerStyle={{height: 50}}
                                dropDownStyle={{backgroundColor: GigColors.White}}
                                itemStyle={{backgroundColor: GigColors.White, paddingVertical: 20}}
                                zIndex={5000}
                                arrowColor={GigColors.Blue}
                                labelStyle={{color: GigColors.Blue, textTransform:'uppercase'}}
                                activeLabelStyle={{color: GigColors.Mustard}}
                                dropDownMaxHeight={600}
                                searchable={true}
                            />
                        </View>
                    }
                    {categorySkills && 
                        <View style={[styles.input, {zIndex: 999}]}>
                            <Text style={styles.inputLabel}>Skill</Text>
                            <DropDownPicker
                                items={categorySkills}
                                placeholder="Select a skill"
                                onChangeItem={item => skillChange(item)}
                                containerStyle={{height: 50}}
                                dropDownStyle={{backgroundColor: GigColors.White}}
                                itemStyle={{backgroundColor: GigColors.White, paddingVertical: 20}}
                                zIndex={5000}
                                arrowColor={GigColors.Blue}
                                labelStyle={{color: GigColors.Blue, textTransform:'uppercase'}}
                                activeLabelStyle={{color: GigColors.Mustard}}
                                dropDownMaxHeight={600}
                                searchable={true}
                            />
                        </View>
                    }

                    <View style={styles.button}>
                        {isValid() ? 
                            <DefaultButton title={'Publish Deal'} onPress={handleSubmit} />
                        :
                            <DisabledDefaultButton title={'Publish Deal'}/>
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
        marginTop: 60,
        backgroundColor: GigColors.Greyish
    },
    icon: {
        alignItems:'flex-end',
        marginRight: 20
    },

    title: {
        fontWeight: '600',
        color: GigColors.Blue,
        fontSize: 24,
        textAlign: 'center'
    },
    container: {
        padding: 10,
    },
    input: {
        marginVertical: 10,
    },
    inputLabel:{
        textTransform: 'uppercase',
        fontWeight: '500',
        marginBottom: 5,
        fontSize: 12, 
        color: GigColors.Blue
    },
    textInput: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        color: GigColors.Blue,
        backgroundColor: GigColors.White
    },
    button: {
        marginTop: 15
    }, 
    datePicker:{
        paddingHorizontal: 10,
        paddingVertical: 15,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderRadius: 10,
        color: GigColors.Blue,
        backgroundColor: GigColors.White
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
 });