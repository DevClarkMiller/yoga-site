const Months = Object.freeze({
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12
});

const monthInPast = month =>{
    const currentMonth = new Date().getMonth();
    if (Months[month] < currentMonth)
        return true;
    return false;
}

export { monthInPast };