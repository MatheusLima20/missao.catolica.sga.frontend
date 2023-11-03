export const StringFomatter = {
    removeSpecialCharacters: (stringToReplace: string) => {
        const desired = stringToReplace.replace(/[^\w\s]/gi, '');
        return desired;
    }
};
