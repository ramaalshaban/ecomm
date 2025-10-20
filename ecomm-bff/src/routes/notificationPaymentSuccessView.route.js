const express = require("express");
const router = express.Router();
const { notificationPaymentSuccessViewService } = require("services");

router.get("/", async (req, res) => {
  const datas =
    await notificationPaymentSuccessViewService.getAllAggNotificationPaymentSuccessView();
  res.json(datas);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data =
    await notificationPaymentSuccessViewService.getAggNotificationPaymentSuccessView(
      id,
    );
  res.json(data);
});

module.exports = router;
