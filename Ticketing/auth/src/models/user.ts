import mongoose from "mongoose";
import { Password } from "../services/password-service";

// Properties needs for to create new User
interface IUser {
    email: string
    password: string
}

// Properties that UserModel has
interface UserModel extends mongoose.Model<UserDocument> {
    build(attr: IUser): UserDocument
}

// Properties that sigle User has is like Document for Mongo
interface UserDocument extends mongoose.Document {
    email: string
    password: string
    createdAt: string
    updatedAt: string
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true
    }
}, {
    toJSON: {
        transform(document, ret) {
            ret.id = ret._id;
            delete ret.password;
            delete ret.__v;
            delete ret._id;
        }
    }
})

userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password')!)
        this.set('password', hashed)
    }
    done()
})

userSchema.statics.build = (attr: IUser) => {
    return new User(attr)
}

const User = mongoose.model<UserDocument, UserModel>('User', userSchema)

// User.build({
//     email: "ruan@gmail.com",
//     password: 'sadasd'
// })

export { User }