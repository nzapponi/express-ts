import express from "express";

import { goodResponse } from "../utils/utils";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(goodResponse({}));
});

export default router;
