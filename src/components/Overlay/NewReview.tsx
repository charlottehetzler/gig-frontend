import React, { useState, useMemo } from 'react';
import { View, Modal, TextInput, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import { StyleSheet, Text } from "react-native";
import { GigColors } from '../../constants/colors';
import { DefaultButton, DisabledDefaultButton, WhiteDefaultButton } from '../Button/DefaultButton';
import { ADD_REVIEW } from '../../lib/review';
import { useMutation } from '@apollo/client';
import { Icon, AirbnbRating } from 'react-native-elements';

const currentUserId = 3

export function NewReview ( props: any ) {
    const userId = props.userId

    const [ doSaveReview, { loading: saveReviewLoading } ] = useMutation(ADD_REVIEW);
    
    const [rating, setRating] = useState();
    
    const [comment, setComment] = useState();
    const [commentIsValid, setCommentIsValid] = useState(false);

    const [isVisible, setIsVisible] = useState(props.visible)
    
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
            const { data, errors } = await doSaveReview({
                variables: { input: {
                    userId: userId, fromUserId: currentUserId, rating: rating, comment: comment
                }}
            });
            props.onCancel()
        } catch (e) {
          console.log(e);
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
                    <TouchableWithoutFeedback onPress={props.onCancel}>
                        <Icon type='material' name='close' style={styles.icon} size={25}/>
                    </TouchableWithoutFeedback>
                    <Text style={styles.title}>Review {props.firstName}</Text>
                </View>

                <View style={styles.container}>
                    <View style={[styles.input, {zIndex: 9999}]}>
                        <Text style={styles.inputLabel}>add your rating</Text>
                        <AirbnbRating
                            count={5}
                            selectedColor={GigColors.Black}
                            defaultRating={3}
                            size={30}
                            onFinishRating={completeRating}
                            showRating={false}
                        />
                    </View>
           
                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>add your review</Text>
                        <TextInput
                            placeholder={"Type here..."}
                            style={styles.textInput}
                            value={comment}
                            onChangeText={commentChangeHandler}
                            keyboardType={'default'}
                        />
                    </View>

                    <View style={styles.button}>
                        {commentIsValid ? 
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