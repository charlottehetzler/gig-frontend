import React, { useState, useMemo } from 'react';
import { View, Modal, TextInput, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import { StyleSheet, Text } from "react-native";
import { GigColors } from '../constants/colors';
import { DefaultButton, DisabledDefaultButton } from '../components/Button/DefaultButton';
import { ADD_REVIEW } from '../lib/review';
import { useMutation, useQuery } from '@apollo/client';
import { Icon, AirbnbRating } from 'react-native-elements';
import { useSelector } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import { GET_All_CATEGORIES } from '../lib/category';

export function NewReview ( props: any ) {
    
    const userId = props.userId
    
    const currentUserId = useSelector((state: any) => state.user.userId);
    
    const currentUserState = useSelector((state: any) => state.user.userType);

    const [ doSaveReview, { loading: saveReviewLoading } ] = useMutation(ADD_REVIEW);

    const { data: catData, error: catError, loading: catLoading } = useQuery(GET_All_CATEGORIES);
    
    const [ rating, setRating ] = useState();
    
    const [ comment, setComment ] = useState();
    
    const [ commentIsValid, setCommentIsValid ] = useState(false);

    const [ categories, setCategories ] = useState()
    
    const [ categoriesD, setCategoriesD ] = useState()
    
    const [ category, setCategory ] = useState();
    
    const [ skill, setSkill ] = useState();
    
    const [ skillId, setSkillId ] = useState();

    const [ skillIsValid, setSkillIsValid ] = useState(false);
        
    const [ categorySkills, setCategorySkills ] = useState();

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
    
    const completeRating = (rating: number) => {
        setRating(rating.toString());
    }

    const commentChangeHandler = (comment: string) => {
        if (comment.trim().length < 5) {
            setCommentIsValid(false);
        } else {
            setCommentIsValid(true);
        }
        setComment(comment);
    }

    const handleSubmit = async () => {
        try {
            await doSaveReview({
                variables: { input: {
                    userId: userId, fromUserId: currentUserId, rating: rating, comment: comment, skillId: skillId
                }}
            });
            props.disable()
            props.onCancel();
        } catch (e) {
          console.log(e);
        }
    }

    const isConsumer = () => currentUserState === 'consumer' ? true : false;

    const isValidReview = () => {
        if (currentUserState === 'consumer') {
            return skillIsValid && commentIsValid;
        } else {
            return commentIsValid;
        }
    }

    const loading = useMemo(() => {
        return saveReviewLoading;
    }, [saveReviewLoading]);
    
    return (
        <Modal visible={props.visible} animationType='slide'>
        {loading &&  <ActivityIndicator size="small" color="#0000ff" style={{alignItems:'center', justifyContent:'center'}}/>}
            
            <View style={styles.inputContainer}>
                
                <View style={styles.headerWrapper}>
                    <View></View>
                    <Text style={styles.title}>Review {props.firstName}</Text>
                    <TouchableWithoutFeedback onPress={props.onCancel}>
                        <Icon type='material' name='close' style={styles.icon} color={GigColors.Mustard} size={25}/>
                    </TouchableWithoutFeedback>
                </View>

                <View style={styles.container}>
                    <View style={[styles.input, {zIndex: 9999}]}>
                        <Text style={styles.inputLabel}>your rating</Text>
                        <AirbnbRating
                            count={5}
                            selectedColor={GigColors.Mustard}
                            defaultRating={3}
                            size={30}
                            onFinishRating={completeRating}
                            showRating={false}
                        />
                    </View>
           
                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>your review</Text>
                        <TextInput
                            placeholder={"Type here..."}
                            style={styles.textInput}
                            value={comment}
                            onChangeText={commentChangeHandler}
                            keyboardType={'default'}
                        />
                    </View>
                    {isConsumer() && categories && <>
                        <View style={[styles.input, {zIndex: 9999}]}>
                            <Text style={styles.inputLabel}>category</Text>
                            <DropDownPicker
                                items={categories}
                                placeholder="Select a category"
                                onChangeItem={item => categoryChange(item)}
                                containerStyle={{height: 50}}
                                dropDownStyle={{backgroundColor: GigColors.White}}
                                itemStyle={{backgroundColor: GigColors.White, paddingVertical:20}}
                                zIndex={5000}
                                arrowColor={GigColors.Blue}
                                labelStyle={{color: GigColors.Mustard, textTransform:'uppercase'}}
                                activeLabelStyle={{color: GigColors.Blue}}
                                dropDownMaxHeight={600}
                                searchable={true}
                            />
                        </View>
                        {categorySkills && 
                            <View style={[styles.input, {zIndex: 999}]}>
                                <Text style={styles.inputLabel}>skill</Text>
                                <DropDownPicker
                                    items={categorySkills}
                                    placeholder="Select a skill"
                                    onChangeItem={item => skillChange(item)}
                                    containerStyle={{height: 50}}
                                    dropDownStyle={{backgroundColor: GigColors.White}}
                                    itemStyle={{backgroundColor: GigColors.White, paddingVertical:20}}
                                    zIndex={5000}
                                    arrowColor={GigColors.Blue}
                                    labelStyle={{color: GigColors.Mustard, textTransform:'uppercase'}}
                                    activeLabelStyle={{color: GigColors.Blue}}
                                    dropDownMaxHeight={600}
                                    searchable={true}
                                />
                            </View>
                        }
                    </>}

                    <View style={styles.button}>
                        {isValidReview() ? 
                            <DefaultButton title='REVIEW' onPress={handleSubmit} />
                        :
                            <DisabledDefaultButton title='REVIEW'/>
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
    headerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 25
    },
    title: {
        fontWeight: '600',
        color: GigColors.Blue,
        fontSize: 24,
        textAlign: 'center'
    },
    container: {
        marginHorizontal: 16
    },
    input: {
        marginVertical: 20,
    },
    textInputBig: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderBottomColor: GigColors.Blue,
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