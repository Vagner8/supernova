import express from "express";
import {
  usersCollection,
  dropListCollection,
  testCollection,
} from "../db/useCollection";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log('get users');
    const users = await (await usersCollection.find()).toArray();
    // const users = await (await testCollection.find()).toArray();
    const dropList = await (await dropListCollection.find()).toArray();
    res.json({ users, dropList });
  } catch (err) {
    console.dir(err);
  } finally {
    await usersCollection.close();
    await dropListCollection.close();
  }
});

router.get('/?:userId', async (req, res) => {
  try {
    const { userId } = req.query
    console.log(userId)
  } catch (err) {
    console.dir(err);
  } finally {
    
  }
})

// router.post('/post', (req, res) => {
//   console.log(req.body)
//   res.json('ok')
// })

// router.put('/put', (req, res) => {

// })

// router.delete('/delete', (req, res) => {
//     console.log(req.body)
// })

export default router;
