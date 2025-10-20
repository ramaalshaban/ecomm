// This script is written as api-specific
// This script is called from the CreateCartManager

const { Cart } = require("models");

const { CartQueryCacheInvalidator } = require("./query-cache-classes");
const { HttpServerError, HttpError, BadRequestError } = require("common");

const { ElasticIndexer } = require("serviceCommon");

const { ServicePublisher } = require("serviceCommon");
const { Op } = require("sequelize");

async function raiseDbEvent(apiManager) {
  const dbEvent = apiManager.getDbEventTopic("create");

  try {
    const _publisher = new ServicePublisher(
      dbEvent,
      apiManager.cart,
      apiManager.session,
      apiManager.requestId,
    );
    _publisher.publish();
  } catch (err) {
    //**errorLog
    console.log("DbEvent cant be published", dbEvent, err);
  }
}

async function updateIfExists(dataClause) {
  const dbDoc = await Cart.findByPk(dataClause.id);
  if (dbDoc) {
    delete dataClause.id;
    dataClause.isActive = true;
    await dbDoc.update(dataClause);
    return dbDoc;
  }
  return null;
}

async function checkForUniqueIndex(dataClause) {
  const whereClause = {
    userId: dataClause.userId,

    isActive: true,
  };
  const dbDoc = await Cart.findOne({ where: whereClause });
  if (dbDoc) {
    // update existing record and continue
    delete dataClause.id;
    dataClause.isActive = true;
    await dbDoc.update(dataClause);
    return dbDoc;
  }

  return dbDoc;
}

const dbScriptCreateCart = async (apiManager) => {
  const dataClause = apiManager.getDataClause();

  try {
    let updated = false;
    let dbData = null;

    // check for upsert
    if (dataClause.id) {
      updated = await updateIfExists(dataClause);
      dbData = updated ? updated.getData() : null;
    }

    if (!updated) {
      //check for unique index
      updated = await checkForUniqueIndex(dataClause);
      dbData = updated ? updated.getData() : null;
    }

    if (!updated) {
      const dbDoc = await Cart.create(dataClause);
      dbData = dbDoc ? dbDoc.getData() : null;
    }

    apiManager.cart = dbData;

    const elasticIndexer = new ElasticIndexer(
      "cart",
      apiManager.session,
      apiManager.requestId,
    );
    await elasticIndexer.indexData(dbData);

    // invalidate the query caches that are related with this object's old and new state
    const queryCacheInvalidator = new CartQueryCacheInvalidator();
    queryCacheInvalidator.invalidateCache(dbData);

    await raiseDbEvent(apiManager, dataClause);

    return dbData;
  } catch (err) {
    if (err instanceof HttpError) throw err;
    console.log(err);
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenExecuting_dbScriptCreateCart",
      {
        whereClause: null,
        dataClause: dataClause,
        errorName: err.name,
        errorMessage: err.message,
        errorStack: err.stack,
      },
    );
  }
};

module.exports = dbScriptCreateCart;
