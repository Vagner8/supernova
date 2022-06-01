import 'dotenv/config'

const password = encodeURIComponent(process.env.MONGO_PASSWORD);

export const url = `mongodb+srv://vagner:${password}@supernova.1nqe9.mongodb.net/?retryWrites=true&w=majority`
