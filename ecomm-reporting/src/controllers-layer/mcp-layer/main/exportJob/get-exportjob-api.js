const { GetExportJobManager } = require("apiLayer");
const { z } = require("zod");

const ReportingMcpController = require("../../ReportingServiceMcpController");

class GetExportJobMcpController extends ReportingMcpController {
  constructor(params) {
    super("getExportJob", "getexportjob", params);
    this.dataName = "exportJob";
    this.crudType = "get";
  }

  createApiManager() {
    return new GetExportJobManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        exportJob: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            exportType: z
              .enum(["orders", "products"])
              .describe("Export source: orders or products."),
            status: z
              .enum(["pending", "completed", "failed"])
              .describe("Export job status: pending, completed, failed."),
            requestedBy: z
              .string()
              .uuid()
              .describe("User/admin who requested this export job."),
            startedAt: z.string().describe("When export job was started."),
            completedAt: z
              .string()
              .optional()
              .nullable()
              .describe("When export job completed (null if not yet)."),
            downloadUrl: z
              .string()
              .max(255)
              .optional()
              .nullable()
              .describe("URL to download exported file; set on completion."),
            isActive: z
              .boolean()
              .describe(
                "The active status of the data object to manage soft delete. False when deleted.",
              ),
          })
          .describe(
            "Tracks an export operation for orders or product catalog (for CSV/JSON download by admin).",
          ),
      })
      .describe("The response object of the crud route");
  }

  static getInputScheme() {
    return {
      accessToken: z
        .string()
        .optional()
        .describe(
          "The access token which is returned from a login request or given by user. This access token will override if there is any bearer or OAuth token in the mcp client. If not given the request will be made with the system (bearer or OAuth) token. For public routes you dont need to deifne any access token.",
        ),
      exportJobId: z
        .string()
        .uuid()
        .describe(
          "This id paremeter is used to query the required data object.",
        ),
    };
  }
}

module.exports = (headers) => {
  return {
    name: "getExportJob",
    description: "Get exportJob details (admin or owner only).",
    parameters: GetExportJobMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      console.log("Mcp Request Received", mcpParams);
      mcpParams.headers = headers;
      const controller = new GetExportJobMcpController(mcpParams);
      try {
        const result = await controller.processRequest();
        //return GetExportJobMcpController.getOutputSchema().parse(result);
        console.log("Mcp Response Ready", JSON.stringify(result));
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result),
            },
          ],
        };
      } catch (err) {
        console.log("Mcp Error Occured", err.message);
        //**errorLog
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Error: ${err.message}`,
            },
          ],
        };
      }
    },
  };
};
