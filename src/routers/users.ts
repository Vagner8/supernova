import express, { Request } from "express";
import { newUser } from "./../db/data/usersData";
import { useUsersDB } from "./../db/useDataBase";
import { ProfileRequest, UsersCollections } from "./../db/usersTypes";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // const users = await useUsersDB.find(UsersCollections.Personal)
    // res.json(await users.toArray())
    res.json({
      photo: 'D:/Open Server 5.3.5/OSPanel/domains/server-super-admin/src/img/terminator.jpg'
    })
  } catch (err) {
    console.dir(err);
  } finally {
    await useUsersDB.close();
  }
});

router.get("/profile", async (req: ProfileRequest, res) => {
  try {
    if (req.query.userId === "new") {
      await useUsersDB.createDB();
    }
  } catch (err) {
    console.dir(err);
  } finally {
    await useUsersDB.close();
  }
});

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
