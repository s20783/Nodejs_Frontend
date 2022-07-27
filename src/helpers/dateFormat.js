export function getFormattedDate(dateSource){
    const dateObject = new Date(dateSource)
    return ('0' + dateObject.getDate()).slice(-2) + "-" + ('0' + (dateObject.getMonth()+1)).slice(-2) + '-' + dateObject.getFullYear()
}