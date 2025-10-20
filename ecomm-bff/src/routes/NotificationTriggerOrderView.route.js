const express = require("express");
const router = express.Router();
const { NotificationTriggerOrderViewService } = require("services");

router.get("/", async (req, res) => {
  const datas =
    await NotificationTriggerOrderViewService.getAllAggNotificationTriggerOrderView();
  res.json(datas);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data =
    await NotificationTriggerOrderViewService.getAggNotificationTriggerOrderView(
      id,
    );
  res.json(data);
});

module.exports = router;
