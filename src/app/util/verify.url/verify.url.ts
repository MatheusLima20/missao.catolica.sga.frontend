export const verifyUrl = {
    isYoutubeVideo(url: any) {
        if (!url) {
            return;
        }
        const v =
            /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        const isYoutube = url.match(v) ? true : false;
        return isYoutube;
    }
};
