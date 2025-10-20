const kafka = require("../utils/kafka.client.js");
const { getDocument } = require("../utils/elasticsearch.js");
const { notificationService } = require("../services");
const consumer = kafka.consumer({
  groupId: `ecomm-notification-service-orderShippedCustomer-group`,
});

const orderShippedCustomerListener = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: "orderManagement.order.statusChanged",
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
          template: "orderShippedCustomerTemplate",
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

        if (!(this.dataSource.status === "shipped")) {
          console.log(
            "condition not met",
            "this.dataSource.status===&#39;shipped&#39;",
          );
          return;
        }

        const targetcustomer = mappedData.metadata.dataSource["user.email"];
        mappedData.to = targetcustomer;
        await notificationService.sendNotification(mappedData);
      } catch (error) {
        //**errorLog
        console.error("orderManagement.order.statusChanged ", error);
      }
    },
  });
};

module.exports = orderShippedCustomerListener;
