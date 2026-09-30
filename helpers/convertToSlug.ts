import unidecode from "unidecode"
export const convertToString = (text : string) : string => {
    const unidecodeText = unidecode(text.trim())
    const slug : string = unidecodeText.replace(/\s+/g, "-").toLocaleLowerCase();
    
    return slug;
}