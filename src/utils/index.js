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
        } catch (e) {
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
    } catch (e) {
        console.log(e);
    }
};

const changeWeekDayFromEngToLt = (day) => {
    switch (day) {
        case '1' :
            return 'Pirmadienis';
        case '2' :
            return 'Antradienis';
        case '3' :
            return 'Trečiadienis';
        case '4' :
            return 'Ketvirtadienis';
        case '5' :
            return 'Penktadienis';
        case '6' :
            return 'Šeštadienis';
        case '0' :
            return 'Sekmadienis';
        default :
            return '';
    }
};

const changeMonthFromEngToLt = (month, { v2 } = {}) => {
    switch (month) {
        case '01' :
            return v2 ? 'Sausis' : 'Sausio';
        case '02' :
            return v2 ? 'Vasaris' : 'Vasario';
        case '03' :
            return v2 ? 'Kovas' : 'Kovo';
        case '04' :
            return v2 ? 'Balandis' : 'Balandžio';
        case '05' :
            return v2 ? 'Gegužė' : 'Gegužės';
        case '06' :
            return v2 ? 'Birželis' : 'Birželio';
        case '07' :
            return v2 ? 'Liepa' : 'Liepos';
        case '08' :
            return v2 ? 'Rugpjūtis' : 'Rugpjūčio';
        case '09' :
            return v2 ? 'Rugsėjis' : 'Rugsėjo';
        case '10' :
            return v2 ? 'Spalis' : 'Spalio';
        case '11' :
            return v2 ? 'Lapkritis' : 'Lapkričio';
        case '12' :
            return v2 ? 'Gruodis' : 'Gruodžio';
        default :
            return '';
    }
};

/**
 * Capitalize String
 * @param string
 * @returns {string}
 */
const capitalizeString = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export {
    formatToDateString,
    formatToTimeString,
    getUsersFromStorage,
    saveUsersToStorage,
    formatToDateAndTimeString,
    changeWeekDayFromEngToLt,
    changeMonthFromEngToLt,
    capitalizeString,
}