export const checkValidData = (email, password, name) => {


    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    if (name && !/^[A-Za-z ]{2,50}$/.test(name)) {
        return "Name is not Valid";
    }
    if (!isEmailValid) return "Email is not Valid";
    if (!isPasswordValid) return "Password is not Valid";

    return null;
}