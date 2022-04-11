import { MongoClient, ObjectId } from 'mongodb'
import { Clusters, Collections, User } from './types'

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
            const db = this.client.db(this.cluster)
            const collection = db.collection(this.collection)
            return collection
        } catch (err) {
            console.error(err.stack)
        }
    }

    public async find() {
        const col = await this.connection()
        return col.find()
    }

    public async findOne<T>(query?: string) {
        const col = await this.connection()
        return col.findOne<T>({_id: new ObjectId(query)})
    }

    public async close() {
        await this.client.close()
    }
}

export const usersDB = new UseMongo(Clusters.ServerSuperAdmin, Collections.Users)
export const settingsDB = new UseMongo(Clusters.ServerSuperAdmin, Collections.Settings)