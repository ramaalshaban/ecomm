const express = require("express");
const router = express.Router();
const { AdminExportJobViewService } = require("services");

router.get("/", async (req, res) => {
  const datas = await AdminExportJobViewService.getAllAggAdminExportJobView();
  res.json(datas);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await AdminExportJobViewService.getAggAdminExportJobView(id);
  res.json(data);
});

module.exports = router;
