import mongoose from 'mongoose'

export const connect = async():Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGODB_URL!);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Could not connect to MongoDB', error);
    }
}
