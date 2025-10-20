const kafka = require("../utils/kafka.client.js");
const { getDocument } = require("../utils/elasticsearch.js");
const { notificationService } = require("../services");
const consumer = kafka.consumer({
  groupId: `ecomm-notification-service-orderRefundedAdmin-group`,
});

const orderRefundedAdminListener = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: "orderManagement.order.refundProcessed",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        console.log(
          `Received message on ${topic}: ${message.value.toString()}`,
        );

        const notice = JSON.parse(message.value.toString());

        const mappedData = {
          types: ["email"],
          isStored: false,
          template: "orderRefundedAdminTemplate",
          metadata: {
            ...notice,
            actionDeepLink: "",
            actionText: "",
          },
        };

        const dataViewId = notice.id;
        const dataSource = await getDocument(
          "ecomm_NotificationTriggerOrderView",
          dataViewId,
        );

        this.dataSource = dataSource.source;
        mappedData.metadata = {
          ...mappedData.metadata,
          dataSource: dataSource.source,
        };

        if (!(this.dataSource.paymentStatus === "refunded")) {
          console.log(
            "condition not met",
            "this.dataSource.paymentStatus===&#39;refunded&#39;",
          );
          return;
        }

        const targetadmin = mappedData.metadata.dataSource["user.email"];
        mappedData.to = targetadmin;
        await notificationService.sendNotification(mappedData);
      } catch (error) {
        //**errorLog
        console.error("orderManagement.order.refundProcessed ", error);
      }
    },
  });
};

module.exports = orderRefundedAdminListener;
