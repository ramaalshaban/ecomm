const express = require("express");
const router = express.Router();
const { notificationOrderRefundProcessedViewService } = require("services");

router.get("/", async (req, res) => {
  const datas =
    await notificationOrderRefundProcessedViewService.getAllAggNotificationOrderRefundProcessedView();
  res.json(datas);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data =
    await notificationOrderRefundProcessedViewService.getAggNotificationOrderRefundProcessedView(
      id,
    );
  res.json(data);
});

module.exports = router;
