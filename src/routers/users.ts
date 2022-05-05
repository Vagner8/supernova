import express from "express";
import { Collections } from "./../db/types";
import { useSuperAdmin } from "./../db/useDataBase";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await useSuperAdmin.find(Collections.Users)
    res.json(await users.toArray())
  } catch (error) {
    console.dir(error);
    res.status(500).json({ error, message: error.message });
  } finally {
    await useSuperAdmin.close();
  }
});

// router.get("/profile", async (req: ProfileRequest, res) => {
//   try {
//     if (req.query.userId === "new") {
//       await useUsersDB.createDB();
//       res.json('useUsersDB has been created')
//     }
//   } catch (err) {
//     console.dir(err);
//   } finally {
//     await useUsersDB.close();
//   }
// });

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
