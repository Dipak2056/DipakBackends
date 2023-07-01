// all the CRUD operations close to database layer will be performed her for the user
// user can only create and delete the account

// create a new user account
import userSchema from '../schemas/user.schema.js';
import UserSchema from '../schemas/user.schema.js';

// create a new user account
export const createUser = (obj) => {
    return UserSchema(obj).save()
}
// delete that user account
export const deleteUser = (obj) => {
    return userSchema.findOneAndDelete(obj)
}
