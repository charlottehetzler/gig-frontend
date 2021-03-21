import { useQuery } from "@apollo/client";
import { GET_USER } from "../lib/user";
import { GET_All_SKILLS_FOR_PRODUCER } from "../lib/skill";
import { GET_LAST_REVIEWS_FOR_USER } from "../lib/review";
import { useMemo, useState } from "react";


export default function useProfile (userId: number, skillId?: number) {

    const { data: userData, loading: userLoading, error: userError } = useQuery(GET_USER, {variables: {query: {userId: userId} }});

    const { data: skillData, loading: skillLoading, error: skillError, refetch: skillRefetch } = useQuery(GET_All_SKILLS_FOR_PRODUCER, {variables: {query: {userId: userId} }});
  
    const { data: reviewData, loading: reviewLoading, error: reviewError } = useQuery(GET_LAST_REVIEWS_FOR_USER, {variables: {query: {userId: userId, skillId: skillId} }});

    const [fullName, setFullName] = useState();
  
    const [skills, setSkills] = useState([]);
  
    const [user, setUser] = useState();
  
    const [lastReviews, setLastReviews] = useState();
    
    const [initials, setInitials] = useState();
   
    const [firstName, setFirstName] = useState();

    useMemo(() => {
        if (skillData && skillData?.getAllSkillsForProducer) {
            setSkills(skillData?.getAllSkillsForProducer)
        }
        if (userData && userData?.getUser) {
            setUser(userData?.getUser);
            setFullName(userData?.getUser.firstName + " " + userData?.getUser.lastName);
            setInitials(userData?.getUser.firstName.charAt(0).toUpperCase() + " " + userData?.getUser.lastName.charAt(0).toUpperCase());
            setFirstName(userData?.getUser.firstName + "'s");
        }
        if (reviewData && reviewData?.getLastReviewsForUser) {
            setLastReviews(reviewData?.getLastReviewsForUser);
        }
    }, [ skillData, userData, reviewData ])

    const loading = useMemo(() => {
        return userLoading || skillLoading || reviewLoading;
    }, [ userLoading, skillLoading, reviewLoading ]);
    

    const error = useMemo(() => {
        return userError || skillError || reviewError;
    }, [userError, skillError, reviewError]);


    return { user, skills, lastReviews, loading, error, fullName, initials, firstName, skillRefetch }
}