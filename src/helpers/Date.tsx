export const date = (dateString : any) => {
    if(dateString){
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString("en-GB");
        return formattedDate
    }else{
        return ""
    }
}