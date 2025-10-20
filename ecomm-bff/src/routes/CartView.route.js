const express = require("express");
const router = express.Router();
const { CartViewService } = require("services");

router.get("/", async (req, res) => {
  const datas = await CartViewService.getAllAggCartView();
  res.json(datas);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await CartViewService.getAggCartView(id);
  res.json(data);
});

module.exports = router;
