import dayjs from 'dayjs';

export const StringFomatter = {
    removeSpecialCharacters: (stringToReplace: string) => {
        const desired = stringToReplace.replace(/[^\w\s]/gi, '');
        return desired;
    },
    removeSpecialString: (value: string) => {
        const newString = value.normalize('NFD').replace(/\p{Mn}/gu, '');

        return newString;
    },
    formatDate: (date: string) => {
        const dateDayjs = dayjs(date).locale('pt-br').format('DD MMMM YYYY');

        return dateDayjs;
    }
};
