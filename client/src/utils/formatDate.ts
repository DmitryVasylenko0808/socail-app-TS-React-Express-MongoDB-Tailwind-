export const formatDate = (date: string) => {
    let result = date.split(/-|:|T/);
    let formatedDate = `${result[2]}-${result[1]}-${result[0]} ${result[3]}:${result[4]}`;

    return formatedDate;
}