const express = require("express");
const router = express.Router();
const { notificationOrderPlacedViewService } = require("services");

router.get("/", async (req, res) => {
  const datas =
    await notificationOrderPlacedViewService.getAllAggNotificationOrderPlacedView();
  res.json(datas);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data =
    await notificationOrderPlacedViewService.getAggNotificationOrderPlacedView(
      id,
    );
  res.json(data);
});

module.exports = router;
