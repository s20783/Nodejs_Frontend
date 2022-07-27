export function checkIfBefore(value) {
    if (!value) {
        return false;
    }
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    const dateValue = new Date(value);
    if (!pattern.test(value)) {
        return false;
    }

    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + (nowDate.getDate()),
        year = nowDate.getFullYear();

    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }

    const stringDate = [year, month, day].join('-');
    const date2 = new Date(stringDate);

    if (date2.getTime() < dateValue.getTime()) {
        return false;
    }

    return true;
}