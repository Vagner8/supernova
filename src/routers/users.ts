import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  // try {
  //   const users = await useSuperAdmin.find(Collections.Users)
  //   res.json(await users.toArray())
  // } catch (error) {
  //   console.dir(error);
  //   res.status(500).json({ error, message: error.message });
  // } finally {
  //   await useSuperAdmin.close();
  // }
});

export default router;
