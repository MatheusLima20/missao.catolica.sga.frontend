export const StringFomatter = {
    removeSpecialCharacters: (stringToReplace: string) => {
        const desired = stringToReplace.replace(/[^\w\s]/gi, '');
        return desired;
    },
    removeSpecialString: (value: string) => {
        const newString = value.normalize('NFD').replace(/\p{Mn}/gu, '');

        return newString;
    }
};
