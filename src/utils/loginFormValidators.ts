export function isLoginInputsValids(email: string, password: string): boolean {

    console.log(email, password);

    if (email === "" || password === "") {
        return false;
    }

    if (!email.includes("@") || !email.includes(".")) {
        return false;
    }

    if (password.length < 8) {
        return false;
    }

    return true;

}