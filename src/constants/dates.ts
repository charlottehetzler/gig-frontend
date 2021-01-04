export const isToday = (gig:any) => {
    if(gig) {
        const today = new Date();
        const gigDate = gig.date;
        return gigDate.split('T')[0] === today.toISOString().split('T')[0];
    }
}

export const isTomorrow = (gig:any) => {
    if (gig) {
        var day = new Date();
        var nextDay = new Date(day);
        nextDay.setDate(day.getDate() + 1);
        const gigDate = gig.date;
        return nextDay.toISOString().split('T')[0] === gigDate.split('T')[0];
    }
}