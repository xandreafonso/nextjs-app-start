import bcrypt from 'bcryptjs'

const SALT_ROUNDS = 10;

async function hashPassword(password: string): Promise<string> {
    try {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        throw new Error('Error hashing password');
    }
}

async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        throw new Error('Error comparing passwords');
    }
}

export const cryptpass = {
    hash: hashPassword,
    verify: verifyPassword
}

async function main() {
    console.log(await hashPassword(process.argv[2]))
}

// main().catch(console.error)