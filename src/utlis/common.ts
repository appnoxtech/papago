// export const toTimestamp = async (strDate) => {
//     const dt = new Date(strDate).getTime();
//     return dt / 1000;
// };
// ​
// export const strToLower = async (string) => {
//     return string.toLowerCase();
// };
// ​
// export const getSeconds = async (time) => {
//     let t1 = time.split(':');
//     return t1[0] * 3600 + t1[1] * 60;
// };
// ​
// // export const getTimeBySeconds = async (seconds) => {
// //     let dateObj = new Date(seconds * 1000);
// //     return pad(dateObj.getHours()) + ':' + pad(dateObj.getMinutes());
// // };
// ​
// export const getTimeBySeconds = async (seconds) => {
//     let d = Number(seconds);
//     var hour = Math.floor(d / 3600);
//     var minute = Math.floor((d % 3600) / 60);
//     var s = Math.floor((d % 3600) % 60);
//     return pad(hour) + ':' + pad(minute);
// };
// ​
// export const getCurrentDay = (dayNumber) => {
//     const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     return weekday[dayNumber];
// };
// export const getDayIndexByDay = (day) => {
//     const weekday = { sunday: 0, monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6 };
//     return weekday[day.toLowerCase()];
// };

import { colorPrimary } from "../../assets/styles/GlobalTheme";

// ​
// export const generateUniqueId = () => {
//     var text = '';
//     var possible = '0123456789';
// ​
//     for (var i = 0; i < 10; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
// ​
//     return text;
// };
// ​
// export const pad = (n) => {
//     return n < 10 ? '0' + n : n;
// };
// ​
// export const getDayByDate = (date) => {
//     const oneDayObj = new Date(date);
//     return getCurrentDay(oneDayObj.getDay());
// };
// ​
// //#region Get Today Timestamp
// export const getTodayTimestamp = (withouttime = true) => {
//     let start = new Date();
//     if (withouttime) start.setHours(0, 0, 0, 0);
//     return start.getTime();
// };
// //#endregion
// ​
// //#region Get Timestamp Of Day From Date Object
// export const getDateTimestampWithoutTime = (strDate) => {
//     let start = new Date(strDate);
//     start.setHours(0, 0, 0, 0);
//     return start.getTime();
// };
// //#endregion
// ​
// //#region Get Day From Timestamp
// export const getDayFromTimestamp = (timestamp) => {
//     let dateObj = new Date(timestamp);
//     return getCurrentDay(dateObj.getDay());
// };
// //#endregion
// ​
// export const getCurrentWeekFirstAndLastDayTimeStamp = () => {
//     let curr = new Date(); // get current date
//     curr.setHours(0, 0, 0, 0);
//     let first = 0 - curr.getDay(); // Sunday - current
//     let last = 6; // Saturday Day number
//     let firstdayTimestamp = new Date(curr.setDate(curr.getDate() + first)).getTime();
//     let lastdayTimestamp = new Date(curr.setDate(curr.getDate() + last)).getTime();
//     return { firstdayTimestamp, lastdayTimestamp };
// };
// ​
// export const getDatesBetweenDates = (startDate, endDate) => {
//     let dates = [];
//     let days = [];
//     let timeStamp = [];
//     //to avoid modifying the original date
//     const theDate = new Date(startDate);
//     const endDateObj = new Date(endDate);
//     while (theDate <= endDateObj) {
//         let newDate = new Date(theDate);
//         days = [...days, getCurrentDay(newDate.getDay())];
//         dates = [...dates, newDate];
//         timeStamp = [...timeStamp, newDate.getTime()];
//         theDate.setDate(theDate.getDate() + 1);
//     }
// ​
//     return { dates, days, timeStamp };
// };
// ​
// //#region Get Seconds From Timestamp
// export const getSecondsFromTimestamp = (timeStamp) => {
//     let date = new Date(timeStamp);
//     return date.getHours() * 60 * 60 + date.getMinutes() * 60;
// };
// //#endregion
// ​
// //#region Add Time To TimeStamp
// export const addTimeToTimeStamp = (dateTimeStamp, timeInSeconds) => {
//     return dateTimeStamp + timeInSeconds * 1000;
// };
// //#endregion
// ​
// //#region Get Timestamp Range Of Month
// export const getTimestampRangeOfMonth = (year, month) => {
//     let startDate = new Date(year, month - 1, 2);
//     startDate.setHours(0, 0, 0, 0);
//     let endDate = new Date(year, month, 1);
//     endDate.setHours(0, 0, 0, 0);
//     let monthRange = {
//         year: year.toString(),
//         monthString: getMonthString(month - 1),
//         monthStartTimestamp: startDate.getTime(),
//         monthEndTimestamp: endDate.getTime(),
//         monthNumber: month,
//     };
//     return monthRange;
// };
// //#endregion
// ​
// export const getCurrentMonthYear = () => {
//     var curr = new Date();
//     return { month: curr.getMonth(), year: curr.getFullYear() };
// };
// ​

// ​
// //#region Get Today StartTime And End Time
// export const todayStartTimeAndEndTime = () => {
//     let startTime = getTodayTimestamp();
// ​
//     let endTime = getTodayTimestamp() + 86399 * 1000;
// ​
//     let responseObject = {
//         startTimeStamp: startTime,
//         endTimeStamp: endTime,
//     };
//     return responseObject;
// };
// //#endregion
// ​
// //#region Get Date StartTime And End Time
// export const dateStartTimeAndEndTime = (dateTimeStamp) => {
//     let startTime = dateTimeStamp + 1;
// ​
//     let endTime = getTodayTimestamp() + 86399 * 1000;
// ​
//     let responseObject = {
//         startTimeStamp: startTime,
//         endTimeStamp: endTime,
//     };
//     return responseObject;
// };
// //#endregion
// ​
// //#region Get Year Timestamp
// export const getYearTimestampArray = (currentSession) => {
//     let startSessionTimestamp = currentSession.sessionStartDate;
//     let endSessionTimestamp = currentSession.sessionEndDate;
// ​
//     let currentYear = new Date(startSessionTimestamp).getFullYear();
//     let currentMonth = new Date(startSessionTimestamp).getMonth();
// ​
//     let timeStampArray = [];
// ​
//     // Get Timestamp Array
//     for (var i = 1; i <= 13; i++) {
//         // Current Range Setting
//         let currentMonthObject = currentMonth + i;
//         let currentYearObject = currentYear;
// ​
//         // Increment Year
//         if (currentMonthObject >= 13) {
//             currentYearObject += 1;
//             currentMonthObject -= 12;
//         }
// ​
//         let monthRange = getTimestampRangeOfMonth(currentYearObject, currentMonthObject);
// ​
//         // Add Start Timestamp Of Session
//         if (i === 1) {
//             monthRange.monthStartTimestamp = startSessionTimestamp;
//         }
// ​
//         // Add End Session Timestamp
//         if (i === 13) {
//             monthRange.monthEndTimestamp = endSessionTimestamp;
//         }
// ​
//         timeStampArray.push(monthRange);
//     }
//     return timeStampArray;
// };
// //#endregion
// ​
// //#region Get Today StartTime And End Time
// export const startTimeAndEndTimeOfDay = (dateStr) => {
//     let startTime = getDateTimestampWithoutTime(dateStr);
// ​
//     let endTime = getDateTimestampWithoutTime(dateStr) + 86399 * 1000;
// ​
//     let responseObject = {
//         startTimeStamp: startTime,
//         endTimeStamp: endTime,
//     };
//     return responseObject;
// };
// //#endregion
// ​
// //#region Get Current Month Timestamps
// export const getCurrentMonthTimeStamps = (currentSession) => {
//     let monthNumber = new Date().getMonth() + 1;
//     let year = new Date().getFullYear().toString();
// ​
//     let yearTimeStamp = getYearTimestampArray(currentSession);
// ​
//     let currentMonth;
//     yearTimeStamp.filter(function (x) {
//         if (x.monthNumber === monthNumber && x.year === year) {
//             currentMonth = x;
//         }
//     });
// ​
//     if (currentMonth === undefined) {
//         currentMonth = null;
//     }
// ​
//     return currentMonth;
// };
// //#endregion
// ​
// //#region get list of date of saturdays of a month
// export const getsaturdayInMonth = (m, y) => {
//     var days = new Date(y, m, 0).getDate();
//     var saturday = [7 - new Date(m + '/01/' + y).getDay()];
//     for (var i = saturday[0] + 7; i <= days; i += 7) {
//         saturday.push(i);
//     }
//     return saturday;
// };
// //#endregion
// ​
// //#calculate Age by passing dob as Timestamps then you get floor value of year
// export const getAge = (birthDateTimeStamps) => Math.floor((new Date() - birthDateTimeStamps) / 3.15576e10);
// //#endregion
// ​
// //#region Get Date string from timestamp
// export const getDateStrByTimestamp = (timestamp) => {
//     let dateObj = new Date(timestamp);
//     let month = parseInt(dateObj.getMonth()) + parseInt(1);
// ​
//     return dateObj.getFullYear() + '-' + month.toString().padStart(2, '0') + '-' + dateObj.getDate().toString().padStart(2, '0');
// };
// //#endregion
// ​
// //#region Get Today Timestamp
// export const getCurrentTodayTimestamp = () => {
//     let start = new Date();
//     return start.getTime();
// };
// //#endregion
// ​
// //#region Get Timestamp Range Of Month
// export const getTimestampRangeOfMonthNew = (year, month) => {
//     let startDate = new Date(year, month, 2);
//     startDate.setHours(0, 0, 0, 0);
//     let endDate = new Date(year, month + 1, 1);
//     endDate.setHours(0, 0, 0, 0);
//     let monthRange = {
//         year: year.toString(),
//         monthString: getMonthString(month - 1),
//         monthStartTimestamp: startDate.getTime(),
//         monthEndTimestamp: endDate.getTime(),
//         monthNumber: month,
//     };
//     return monthRange;
// };
// //#endregion
// ​
// export const getMonthStartAndEndDateTimestamp = (year, month) => {
//     const firstDay = new Date(year, month - 1, 1); // First day of given month
//     firstDay.setHours(0, 0, 0, 0);
//     const lastDay = new Date(year, month, 1); // First day of next month
//     lastDay.setDate(lastDay.getDate() - 1); // Last day of given month
//     lastDay.setHours(0, 0, 0, 0);
    
//     let monthRange = {
//         year: year.toString(),
//         monthString: getMonthString(month - 1),
//         monthStartTimestamp: firstDay.getTime(),
//         monthEndTimestamp: lastDay.getTime(),
//         monthNumber: month,
//     };
//     return monthRange;
// };
// ​
// //#region Get Current Day And Week Number
// export const currentDayAndWeekNumberService = (dateTimeStamp) => {
//     let currentDate = new Date(dateTimeStamp);
//     let day1TimeStamp = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getTime();
//     let days = (dateTimeStamp - day1TimeStamp) / 86400000;
//     let weekNumber = Math.ceil(days / 7);
//     let day = currentDate.getDay();
//     let dayString = getDayFromTimestamp(dateTimeStamp);
// ​
//     // Creating Response
//     let response = {
//         weekNumber: weekNumber,
//         day: day,
//         dayString: dayString,
//     };
// ​
//     return response;
// };
// ​
// //#endregion
// ​
// //#region to get Holiday name on the basis of holidayType
// ​
// export const holidayName = async (holidayType) => {
//     try {
//         switch (holidayType) {
//             case 1:
//                 return 'National';
//                 break;
//             case 2:
//                 return 'Holiday';
//                 break;
//             case 3:
//                 return 'Vacation';
//                 break;
//             case 4:
//                 return 'Function';
//                 break;
//             case 5:
//                 return 'PTM';
//                 break;
//             case 6:
//                 return 'Working Day';
//                 break;
//             default:
//                 return false;
//                 break;
//         }
//     } catch (error) {
//         return Promise.reject(new Error('Faild to get teacher working day'));
//     }
// };
// //#endregion
// ​
// //#region add no of day with date
// export const addNoOfDaysWithDate = (days, timeStamp = undefined) => {
//     let dateTimeStamp = new Date();
//     if (timeStamp != undefined) {
//         dateTimeStamp = new Date(timeStamp);
//     }
//     dateTimeStamp.setDate(dateTimeStamp.getDate() + parseInt(days));
//     return dateTimeStamp;
// };
// //#endregion
// ​
// //#region add no of day with date
// export const addNoOfDaysWithDateTimestamp = (days, timeStamp = undefined) => {
//     let dateTimeStamp = new Date();
//     if (timeStamp != undefined) {
//         dateTimeStamp = new Date(timeStamp);
//     }
//     dateTimeStamp.setDate(dateTimeStamp.getDate() + parseInt(days));
//     return dateTimeStamp.getTime();
// };
// //#endregion
// ​
// export const timestampToLocaleDateConverterFunction = (timeStamp, format = undefined) => {
//     let d = new Date(timeStamp);
//     if (format == 'dd/mm/yyyy') {
//         return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
//     } else {
//         return `${d.getDate()} ${getMonthNameByIndex(d.getMonth())} ${d.getFullYear()}`;
//     }
// };


//#region Get Today Timestamp
export const getTodayTimestamp = (withouttime = true) => {
    let start = new Date();
    if (withouttime) start.setHours(0, 0, 0, 0);
    return start.getTime();
};
//#endregion


export const getMonthNameByIndex = (milliSeconds: number) => {
    const index = new Date(milliSeconds).getMonth();
    switch (index) {
        case 0:
            return 'Jan';
        case 1:
            return 'Feb';
        case 2:
            return 'Mar';
        case 3:
            return 'Apr';
        case 4:
            return 'May';
        case 5:
            return 'Jun';
        case 6:
            return 'Jul';
        case 7:
            return 'Aug';
        case 8:
            return 'Sep';
        case 9:
            return 'Oct';
        case 10:
            return 'Nov';
        case 11:
            return 'Dec';
        default:
            return '';
    }
};

//#region Get Day From Timestamp
export const getDayFromTimestamp = (milliSeconds: number) => {
    let dateObj = new Date(milliSeconds);
    return dateObj.getDate();
};

//get Year from Timestamp
export const getYearFromTimeStamp = (milliSeconds: number) => {
    let dateObj = new Date(milliSeconds);
    return dateObj.getFullYear();
}

export const getTwelveHourTimeBySeconds = (seconds: number) => {
    let d = Number(seconds);
    let hours: string | number = Math.floor(d / 3600);
    let minutes: string | number = Math.floor((d % 3600) / 60);
    let s = Math.floor((d % 3600) % 60);
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
};

//#region Get Date StartTime And End Time
export const dateStartTimeAndEndTime = (dateTimeStamp: number) => {
    let startTime = dateTimeStamp + 1;

    let endTime = getTodayTimestamp(true) + 86399 * 1000;

    let responseObject = {
        startTimeStamp: startTime,
        endTimeStamp: endTime,
    };
    return responseObject;
};
//#endregion

export function parseMillisecondsIntoReadableTime(timeStamp: number){
    const date = new Date(timeStamp);
    const h = date.getHours();
    const m = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const hours = (h % 12) || 12;
    const state = h > 12 ? 'PM' : 'AM';
    return `${hours}:${m} ${state}`;
  }

//#region Get Month Name From Number
export const getMonthString = (timestamp: number) => {
    const monthNumber = new Date(timestamp).getMonth();
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthNumber];
};
//#endregion

export const getTimeFormat = (timer: number) => {
    var d = new Date(1000 * Math.round(timer / 1000)); // round to nearest second
    function pad(i: number) {
      return ('0' + i).slice(-2);
    }
    if (d.getUTCHours() === 0) {
      var str = pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds());
      return str;
    } else {
      var str =
        d.getUTCHours() +
        ':' +
        pad(d.getUTCMinutes()) +
        ':' +
        pad(d.getUTCSeconds());
      return str;
    }
  };

//#region Get Month Name From Number
export const getMonthStringList = () => {
    const length = new Date().getMonth() + 1;
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months.splice(0, length);
};
//#endregion

export const timestampToLocaleDateConverterFunction = (timeStamp: number, format?: string) => {
    let d = new Date(timeStamp);
    const date = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    const month = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;

    if (format == 'dd/mm/yyyy') {
        return `${date}/${month}/${d.getFullYear()}`;
    } else if (format == 'yyyy-mm-dd') {
        return `${d.getFullYear()}-${month}-${date}`;
    } else {
        return `${date} ${getMonthNameByIndex(d.getMonth())} ${d.getFullYear()}`;
    }
};

export const getWeekDatesArray = (timeStamp: number) => {
    const week = new Date(timeStamp).getDay();
    let weekList = [];
    const oneDay = 86400000;

    weekList[0] = timeStamp - oneDay * week; 
    
    for(var i = 1; i < 7; i++) {
        weekList[i] = weekList[i-1] + oneDay;
    }
    const weekListInFormat = weekList.map(day => timestampToLocaleDateConverterFunction(day, 'yyyy-mm-dd'));
    return weekListInFormat;
}

export const getCalenderSelectedDaysFormat = (list: Array<string>) => {
    let obj: {[key: string]: {selected: boolean, selectedColor: string}}  = {};
    list.map(item => {
        obj[item] = {selected: true, selectedColor: colorPrimary}
    });
    return obj;
}

export const getMonthName = (index: number) => {
    switch (index) {
        case 0:
            return 'Jan';
        case 1:
            return 'Feb';
        case 2:
            return 'Mar';
        case 3:
            return 'Apr';
        case 4:
            return 'May';
        case 5:
            return 'Jun';
        case 6:
            return 'Jul';
        case 7:
            return 'Aug';
        case 8:
            return 'Sep';
        case 9:
            return 'Oct';
        case 10:
            return 'Nov';
        case 11:
            return 'Dec';
        default:
            return '';
    }
};

export const getDateRefrenceByTimeStamp = (timestamp: number) => {
    const currDate = new Date().getDate();
    const givenDate = new Date(timestamp).getDate();

    if(currDate - 1 === givenDate) {
        return 'Yesterday'
    } else if (currDate === givenDate) {
        return 'Today'
    } else {
        return `${new Date(timestamp).getDate()} ${getMonthNameByIndex(timestamp)}`
    }
}