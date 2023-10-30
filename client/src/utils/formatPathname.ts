export const formatPathname = (pathname: string, exclude: string[] = []) => {
    let result, arrayPath;
    arrayPath = pathname.split("/");

    if (!arrayPath[1]) {
        result = "Home";
    }
    else if (arrayPath[1] === "post") {
        const [firstLetter, ...other] = arrayPath[1].split("");

        result = firstLetter.toUpperCase() + other.join("");
    }
    else if (exclude.includes(arrayPath[1])) {
        const [firstLetter, ...other] = arrayPath[1].split("");
        const login = arrayPath[2];

        result = firstLetter.toUpperCase() + other.join("") + ": " + `@${login}`;
    } else {
        result = arrayPath
            .map(item => {
                if (item) {
                    const [firstLetter, ...other] = item.split("");
    
                    if (item === "profile") {
                        item = firstLetter.toUpperCase() + other.join("") + ":";
                    } else {
                        item = firstLetter.toUpperCase() + other.join("");
                    }
                }
                return item;
            })
            .join(" ");
    }

    return result;
}