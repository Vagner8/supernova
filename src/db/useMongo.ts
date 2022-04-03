import { MongoClient } from 'mongodb'
import { Clusters, Collections } from './types'

class UseMongo {
    public client = new MongoClient(
        'mongodb+srv://vagner:knedlik110507@server-super-admin.wmlhf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    )

    constructor(
        public cluster: Clusters,
        public collection: Collections
    ) {}

    public async connection() {
        try {
            await this.client.connect()
            console.log("Mongo connected correctly to server")
            const db = this.client.db(this.cluster)
            return db.collection(this.collection)
        } catch (err) {
            console.log(err.stack)
        }
    }

    public async find() {
        const col = await this.connection()
        return col.find()
    }

    public async findOne() {
        const col = await this.connection()
        return col.findOne()
    }

    public async close() {
        await this.client.close()
    }
}

export const usersDB = new UseMongo(Clusters.ServerSuperAdmin, Collections.Users)
export const settingsDB = new UseMongo(Clusters.ServerSuperAdmin, Collections.Settings)