module.exports = async function (adminId) {
  const config = await this.db.adminNotificationConfig.findOne({
    where: { adminId, isActive: true },
  });
  return !!config;
};
