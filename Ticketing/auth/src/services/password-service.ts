import { randomBytes, scrypt } from "crypto";
import { promisify } from "util";

const scryptSync = promisify(scrypt)

export class Password {

    static async toHash(password: string) {
        const salt = randomBytes(8).toString('hex');
        const buffer = (await scryptSync(password, salt, 64)) as Buffer

        return `${buffer.toString('hex')}.${salt}`
    }

    static async compare(stored: string, suplied: string) {
        const [hashed, salt] = stored.split('.')
        const buffer = (await scryptSync(suplied, salt, 64)) as Buffer

        return buffer.toString('hex') === hashed
    }
}