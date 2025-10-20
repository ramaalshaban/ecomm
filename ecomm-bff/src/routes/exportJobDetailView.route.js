const express = require("express");
const router = express.Router();
const { exportJobDetailViewService } = require("services");

router.get("/", async (req, res) => {
  const datas = await exportJobDetailViewService.getAllAggExportJobDetailView();
  res.json(datas);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await exportJobDetailViewService.getAggExportJobDetailView(id);
  res.json(data);
});

module.exports = router;
