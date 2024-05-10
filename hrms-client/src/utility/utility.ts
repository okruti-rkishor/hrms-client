import dayjs from "dayjs";

const dateFormat = (date: any) => {
    if (date.length) return date;
    else return dayjs(date).format("YYYY-MM-DD");
}

const removeUnderScore = (value: string) => {
    return value.replaceAll("_", " ");

}

const addUnderScore = (value: string) => {
    return value.replaceAll(" ", "_");

}

const firstCharUpperCase = (value: string) => {
    const stringArray = value.split(" ");
    let string:any = "";
    stringArray.forEach((item, index) => {
        if (index === 0) string = string + item.charAt(0).toUpperCase() + item.slice(1);
        else string = string + " " + item.charAt(0).toUpperCase() + item.slice(1);
    })
    return string;
}

const removeUnderScoreWithLowerCase = (value: string) =>{
    let str=removeUnderScore(value);
    const stringArray = str.split(" ");
    let string = "";
    stringArray.forEach((item, index) => {
        if (index === 0) string = string + item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
        else string = string + " " + item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
    })
    return string;

}

const pascalCase = (value: string) =>{
    const stringArray = value.includes(" ") && value.split(" ");
    let string:any = "";
    if(stringArray) {
        stringArray.forEach((item, index) => {
            if (index === 0) string = string + item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
            else string = string + " " + item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();

        })
    }else{
        string=value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
    return string;

}

export {dateFormat, removeUnderScore, firstCharUpperCase, addUnderScore,removeUnderScoreWithLowerCase,pascalCase};