const kafka = require("../utils/kafka.client.js");
const { getDocument } = require("../utils/elasticsearch.js");
const { notificationService } = require("../services");
const consumer = kafka.consumer({
  groupId: `ecomm-notification-service-exportJobCompletedAdmin-group`,
});

const exportJobCompletedAdminListener = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: "reporting.exportJob.statusChanged",
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
          template: "exportJobCompletedAdminTemplate",
          metadata: {
            ...notice,
            actionDeepLink: "",
            actionText: "",
          },
        };

        const dataViewId = notice.id;
        const dataSource = await getDocument(
          "ecomm_NotificationExportJobView",
          dataViewId,
        );

        this.dataSource = dataSource.source;
        mappedData.metadata = {
          ...mappedData.metadata,
          dataSource: dataSource.source,
        };

        if (
          !(
            this.dataSource.status === "completed" ||
            this.dataSource.status === "failed"
          )
        ) {
          console.log(
            "condition not met",
            "this.dataSource.status===&#39;completed&#39;||this.dataSource.status===&#39;failed&#39;",
          );
          return;
        }

        const targetadmin = mappedData.metadata.dataSource["admin.email"];
        mappedData.to = targetadmin;
        await notificationService.sendNotification(mappedData);
      } catch (error) {
        //**errorLog
        console.error("reporting.exportJob.statusChanged ", error);
      }
    },
  });
};

module.exports = exportJobCompletedAdminListener;
