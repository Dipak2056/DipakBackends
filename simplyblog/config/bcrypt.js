import bcrypt from 'bcrypt';
// this function  encrypts the password
const saltRounds = 10;
export const encryptPassword = (password) => {
    return bcrypt.hashSync(password,saltRounds);
    
}
// this function  compare and retur true if matches the password
export const verifyPassword = (plainPassword, dbPassword) => {
    return bcrypt.compareSync(plainPassword,dbPassword);
}