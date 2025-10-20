const express = require("express");
const router = express.Router();
const { OrderDetailViewService } = require("services");

router.get("/", async (req, res) => {
  const datas = await OrderDetailViewService.getAllAggOrderDetailView();
  res.json(datas);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await OrderDetailViewService.getAggOrderDetailView(id);
  res.json(data);
});

module.exports = router;
