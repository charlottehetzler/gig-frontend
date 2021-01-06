import { useQuery } from "@apollo/client";
import { GET_USER } from "../lib/user";
import { GET_All_JOBS_FOR_PRODUCER } from "../lib/job";
import { GET_LAST_REVIEW_FOR_USER } from "../lib/review";
import { useMemo, useState } from "react";


export default function useProfile (userId: number) {

    const { data: userData, loading: userLoading, error: userError } = useQuery(GET_USER, {variables: {query: {userId: userId} } });

    const { data: jobData, loading: jobLoading, error: jobError } = useQuery(GET_All_JOBS_FOR_PRODUCER, {variables: {query: {userId: userId} } });
  
    const { data: reviewData, loading: reviewLoading, error: reviewError } = useQuery(GET_LAST_REVIEW_FOR_USER, {variables: {query: {userId: userId}}});

    const [fullName, setFullName] = useState();
  
    const [jobs, setJobs] = useState([]);
  
    const [user, setUser] = useState();
  
    const [lastReview, setLastReview] = useState();
    
    const [initials, setInitials] = useState();
   
    const [firstName, setFirstName] = useState();


    useMemo(() => {
        if (jobData && jobData.getAllJobsForProducer) {
            setJobs(jobData.getAllJobsForProducer)
        }
        if (userData && userData.getUser) {
            setUser(userData.getUser)
            setFullName(userData.getUser.firstName + " " + userData.getUser.lastName);
            setInitials(userData.getUser.firstName.charAt(0).toUpperCase() + " " + userData.getUser.lastName.charAt(0).toUpperCase());
            setFirstName(userData.getUser.firstName + "'s")
        } 
        if (reviewData && reviewData.getLastReviewForUser) {
            setLastReview(reviewData.getLastReviewForUser)
        }
    }, [ jobData, userData, reviewData ])


    const loading = useMemo(() => {

        return userLoading || jobLoading || reviewLoading;

    }, [ userLoading, jobLoading, reviewLoading ]);
    

    const error = useMemo(() => {

        return userError || jobError || reviewError;

    }, [userError, jobError, reviewError]);


    return { user, jobs, lastReview, loading, error, fullName, initials, firstName }
}