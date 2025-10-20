const express = require("express");
const router = express.Router();
const { NotificationExportJobViewService } = require("services");

router.get("/", async (req, res) => {
  const datas =
    await NotificationExportJobViewService.getAllAggNotificationExportJobView();
  res.json(datas);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data =
    await NotificationExportJobViewService.getAggNotificationExportJobView(id);
  res.json(data);
});

module.exports = router;
