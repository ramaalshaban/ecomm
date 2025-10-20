const express = require("express");
const router = express.Router();
const { notificationOrderStatusShippedViewService } = require("services");

router.get("/", async (req, res) => {
  const datas =
    await notificationOrderStatusShippedViewService.getAllAggNotificationOrderStatusShippedView();
  res.json(datas);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data =
    await notificationOrderStatusShippedViewService.getAggNotificationOrderStatusShippedView(
      id,
    );
  res.json(data);
});

module.exports = router;
