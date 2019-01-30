/**
 * Function to Convert Unix Time to Readable Date String
 * @param unixTime
 * @returns String
 */
const formatToDateString = (unixTime) => {
    const date = new Date(unixTime);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

/**
 * Function to Convert Unix Time to Readable Date String
 * @param unixTime
 * @returns String
 */
const formatToTimeString = (unixTime) => {
    const date = new Date(unixTime);
    return `${date.getHours()} : ${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
};

/**
 * Function to Convert Unix Time to Readable Date and Time String
 * @param unixTime
 * @returns String
 */
const formatToDateAndTimeString = (unixTime) => {
    const date = new Date(unixTime);
    return `${date.getMonth() + 1}/${date.getDate()} ${date.getFullYear()} ${date.getHours()} : ${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
};

/**
 * Get cached User from Session Storage
 * @param id -> String
 * @returns {User}
 */
const getUsersFromStorage = () => {
    const local = sessionStorage.getItem('postsUsers');
    if (local) {
        try {
            return JSON.parse(local);
        }catch(e) {
            console.log(e);
            return {};
        }
    } else {
        return {};
    }
};

/**
 * Cache User object to Session Storage
 * @param data
 */
const saveUsersToStorage = (data) => {
      try {
          sessionStorage.setItem('postsUsers', JSON.stringify(data));
      }catch (e) {
          console.log(e);
      }
};

const changeWeekDayFromEngToLt = (day) => {
    switch (day) {
        case 'Mon' :
            return 'Pirmadienis';
        case 'Tue' :
            return 'Antradienis';
        case 'Wed' :
            return 'Trečiadienis';
        case 'Thu' :
            return 'Ketvirtadienis';
        case 'Fri' :
            return 'Penktadienis';
        case 'Sat' :
            return 'Šeštadienis';
        case 'Sun' :
            return 'Sekmadienis';
        default :
            return '';
    }
};

const changeMonthFromEngToLt = (month) => {
    switch (month) {
        case 'Jan' :
            return 'Sausio';
        case 'Feb' :
            return 'Vasario';
        case 'Mar' :
            return 'Kovo';
        case 'Apr' :
            return 'Balandžio';
        case 'May' :
            return 'Gegužės';
        case 'Jun' :
            return 'Birželio';
        case 'Jul' :
            return 'Liepos';
        case 'Aug' :
            return 'Rugpjūčio';
        case 'Sep' :
            return 'Rugsėjo';
        case 'Oct' :
            return 'Spalio';
        case 'Nov' :
            return 'Lapkričio';
        case 'Dec' :
            return 'Gruodžio';
        default :
            return '';
    }
};

export {
    formatToDateString,
    formatToTimeString,
    getUsersFromStorage,
    saveUsersToStorage,
    formatToDateAndTimeString,
    changeWeekDayFromEngToLt,
    changeMonthFromEngToLt,
}