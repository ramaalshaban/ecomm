const SalesReportManager = require("./SalesReportManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const { SalesreportCreatedPublisher } = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptCreateSalesreport } = require("dbLayer");

class CreateSalesReportManager extends SalesReportManager {
  constructor(request, controllerType) {
    super(request, {
      name: "createSalesReport",
      controllerType: controllerType,
      pagination: false,
      crudType: "create",
      loginRequired: true,
    });

    this.dataName = "salesReport";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.salesReportId = this.salesReportId;
    jsonObj.dateRange = this.dateRange;
    jsonObj.totalRevenue = this.totalRevenue;
    jsonObj.orderCount = this.orderCount;
    jsonObj.productCount = this.productCount;
    jsonObj.bestsellers = this.bestsellers;
    jsonObj.refundsTotal = this.refundsTotal;
    jsonObj.exportJobId = this.exportJobId;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.salesReportId = request.body?.salesReportId;
    this.dateRange = request.body?.dateRange;
    this.totalRevenue = request.body?.totalRevenue;
    this.orderCount = request.body?.orderCount;
    this.productCount = request.body?.productCount;
    this.bestsellers = request.body?.bestsellers;
    this.refundsTotal = request.body?.refundsTotal;
    this.exportJobId = request.body?.exportJobId;
    this.id = request.body?.id ?? request.query?.id ?? request.id;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.salesReportId = request.mcpParams.salesReportId;
    this.dateRange = request.mcpParams.dateRange;
    this.totalRevenue = request.mcpParams.totalRevenue;
    this.orderCount = request.mcpParams.orderCount;
    this.productCount = request.mcpParams.productCount;
    this.bestsellers = request.mcpParams.bestsellers;
    this.refundsTotal = request.mcpParams.refundsTotal;
    this.exportJobId = request.mcpParams.exportJobId;
    this.id = request.mcpParams?.id;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // data clause methods

  async buildDataClause() {
    const { newUUID } = require("common");

    const { hashString } = require("common");

    if (this.id) this.salesReportId = this.id;
    if (!this.salesReportId) this.salesReportId = newUUID(false);

    const dataClause = {
      id: this.salesReportId,
      dateRange: this.dateRange
        ? typeof this.dateRange == "string"
          ? JSON.parse(this.dateRange)
          : this.dateRange
        : null,
      totalRevenue: this.totalRevenue,
      orderCount: this.orderCount,
      productCount: this.productCount,
      bestsellers: this.bestsellers
        ? typeof this.bestsellers == "string"
          ? JSON.parse(this.bestsellers)
          : this.bestsellers
        : null,
      refundsTotal: this.refundsTotal,
      exportJobId: this.exportJobId,
    };

    return dataClause;
  }

  checkParameterType_salesReportId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_salesReportId() {
    if (this.salesReportId == null) return;

    if (Array.isArray(this.salesReportId)) {
      throw new BadRequestError("errMsg_salesReportIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_salesReportId(this.salesReportId)) {
      throw new BadRequestError("errMsg_salesReportIdTypeIsNotValid");
    }
  }

  checkParameterType_dateRange(paramValue) {
    if (typeof paramValue !== "object") {
      return false;
    }

    return true;
  }

  checkParameter_dateRange() {
    if (this.dateRange == null) {
      throw new BadRequestError("errMsg_dateRangeisRequired");
    }

    if (Array.isArray(this.dateRange)) {
      throw new BadRequestError("errMsg_dateRangeMustNotBeAnArray");
    }

    // Parameter Type: Object

    if (!this.checkParameterType_dateRange(this.dateRange)) {
      throw new BadRequestError("errMsg_dateRangeTypeIsNotValid");
    }
  }

  checkParameterType_totalRevenue(paramValue) {
    if (isNaN(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_totalRevenue() {
    if (this.totalRevenue == null) {
      throw new BadRequestError("errMsg_totalRevenueisRequired");
    }

    if (Array.isArray(this.totalRevenue)) {
      throw new BadRequestError("errMsg_totalRevenueMustNotBeAnArray");
    }

    // Parameter Type: Double

    if (!this.checkParameterType_totalRevenue(this.totalRevenue)) {
      throw new BadRequestError("errMsg_totalRevenueTypeIsNotValid");
    }
  }

  checkParameterType_orderCount(paramValue) {
    if (isNaN(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_orderCount() {
    if (this.orderCount == null) {
      throw new BadRequestError("errMsg_orderCountisRequired");
    }

    if (Array.isArray(this.orderCount)) {
      throw new BadRequestError("errMsg_orderCountMustNotBeAnArray");
    }

    // Parameter Type: Integer

    if (!this.checkParameterType_orderCount(this.orderCount)) {
      throw new BadRequestError("errMsg_orderCountTypeIsNotValid");
    }
  }

  checkParameterType_productCount(paramValue) {
    if (isNaN(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_productCount() {
    if (this.productCount == null) {
      throw new BadRequestError("errMsg_productCountisRequired");
    }

    if (Array.isArray(this.productCount)) {
      throw new BadRequestError("errMsg_productCountMustNotBeAnArray");
    }

    // Parameter Type: Integer

    if (!this.checkParameterType_productCount(this.productCount)) {
      throw new BadRequestError("errMsg_productCountTypeIsNotValid");
    }
  }

  checkParameterType_bestsellers(paramValue) {
    if (typeof paramValue !== "object") {
      return false;
    }

    return true;
  }

  checkParameter_bestsellers() {
    if (this.bestsellers == null) {
      throw new BadRequestError("errMsg_bestsellersisRequired");
    }

    if (!Array.isArray(this.bestsellers)) {
      throw new BadRequestError("errMsg_bestsellersMustBeAnArray");
    }

    // Parameter Type: Object

    this.bestsellers.forEach((item) => {
      if (!this.checkParameterType_bestsellers(item)) {
        throw new BadRequestError("errMsg_bestsellersArrayHasAnInvalidItem");
      }
    });
  }

  checkParameterType_refundsTotal(paramValue) {
    if (isNaN(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_refundsTotal() {
    if (this.refundsTotal == null) {
      throw new BadRequestError("errMsg_refundsTotalisRequired");
    }

    if (Array.isArray(this.refundsTotal)) {
      throw new BadRequestError("errMsg_refundsTotalMustNotBeAnArray");
    }

    // Parameter Type: Double

    if (!this.checkParameterType_refundsTotal(this.refundsTotal)) {
      throw new BadRequestError("errMsg_refundsTotalTypeIsNotValid");
    }
  }

  checkParameterType_exportJobId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_exportJobId() {
    if (this.exportJobId == null) return;

    if (Array.isArray(this.exportJobId)) {
      throw new BadRequestError("errMsg_exportJobIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_exportJobId(this.exportJobId)) {
      throw new BadRequestError("errMsg_exportJobIdTypeIsNotValid");
    }
  }

  checkParameters() {
    if (this.salesReportId) this.checkParameter_salesReportId();

    if (this.dateRange) this.checkParameter_dateRange();

    if (this.totalRevenue) this.checkParameter_totalRevenue();

    if (this.orderCount) this.checkParameter_orderCount();

    if (this.productCount) this.checkParameter_productCount();

    if (this.bestsellers) this.checkParameter_bestsellers();

    if (this.refundsTotal) this.checkParameter_refundsTotal();

    if (this.exportJobId) this.checkParameter_exportJobId();
  }

  async doBusiness() {
    const salesreport = await dbScriptCreateSalesreport(this);
    return salesreport;
  }

  async addToOutput() {}

  async raiseEvent() {
    SalesreportCreatedPublisher.Publish(this.output, this.session).catch(
      (err) => {
        console.log("Publisher Error in Rest Controller:", err);
        //**errorLog
      },
    );
  }

  // Work Flow

  // Action Store
}

module.exports = CreateSalesReportManager;
