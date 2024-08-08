import dayjs from "dayjs";

const dateFormat = (date: any) => {
    if (date.length) return date;
    else return dayjs(date).format("YYYY-MM-DD");
}

const removeUnderScore = (value: string) => {
    return value.replaceAll("_", " ");

}

const addUnderScoreWithUpperCase = (value: string) => {
    const stringArray = value.split(" ");
    let string:any = "";
    stringArray.forEach((item, index) => {
        if (index === 0) string = string + item.charAt(0).toUpperCase() + item.slice(1);
        else string = string + " " + item.charAt(0).toUpperCase() + item.slice(1);
    })
    return string.replaceAll(" ", "_");

}

const addUnderScoreWithUpper = (value: string) => {
    const stringArray = value.split(" ");
    let string:any = "";
    stringArray.forEach((item, index) => {
        if (index === 0) string = item.toUpperCase();
        else string = string + " " + item.toUpperCase();
    })
    return string.replaceAll(" ", "_");

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
const checkUserRole=(newUser:any)=>{
    return newUser.roles.includes("ADMIN") || newUser.roles.includes("HR");
}
const getIdfromApi=(response:any)=>{
    return response.substring(response.lastIndexOf("/")+1);
}
export {dateFormat, removeUnderScore, firstCharUpperCase, addUnderScoreWithUpperCase,removeUnderScoreWithLowerCase,checkUserRole,pascalCase,addUnderScoreWithUpper,getIdfromApi};