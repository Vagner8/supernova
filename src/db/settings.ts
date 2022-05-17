import 'dotenv/config'

const userName = encodeURIComponent(process.env.MONGO_USER);
const password = encodeURIComponent(process.env.MONGO_PASSWORD);

export const url = `mongodb+srv://${userName}:${password}@server-super-admin.wmlhf.mongodb.net/super-admin?retryWrites=true&w=majority`;
