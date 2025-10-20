module.exports = async function (userId) {
  const prefs = await this.db.userNotificationPreferences.findOne({
    where: { userId, isActive: true },
  });
  return !!prefs;
};
