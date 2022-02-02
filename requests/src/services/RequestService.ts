import { Request } from "@prisma/client";
import prisma from "../config/db";
import {
  CronRequest,
  CronResponse,
  ExecOption,
  RequestWithFilter,
} from "../typings/app";
import DateHelper from "../utils/DateHelper";

class RequestService {
  addRequest = (request: CronRequest, userId: string) =>
    prisma.request.create({
      data: {
        ...request,
        userId,
        execOptions: { create: request.execOptions },
      },
    });

  getRequests = (filterOption: Partial<RequestWithFilter>) => {
    return prisma.request.findMany({
      where: filterOption,
      include: {
        execOptions: {
          select: {
            date: true,
            day: true,
            hour: true,
          },
        },
      },
    });
  };

  getRequest = (
    requestId: string,
    query?: { responseCount?: string; responseOrder?: "asc" | "desc" }
  ) => {
    return prisma.request.findFirst({
      where: { id: requestId },
      include: {
        execOptions: {
          select: {
            date: true,
            day: true,
            hour: true,
          },
        },
        lastResponses: {
          take: query?.responseCount ? Number(query?.responseCount) : 1,
          orderBy: { createdAt: query?.responseOrder },
        },
      },
    });
  };

  removeRequest = (requestId: string) => {
    return prisma.request.delete({ where: { id: requestId } });
  };

  addResponseToRequest = (response: CronResponse) => {
    return prisma.request.update({
      where: {
        id: response.id,
      },
      data: {
        lastResponses: {
          create: {
            data: response.data,
            status: response.status,
          },
        },
      },
    });
  };

  finishOnceRequests = async (requestsId: string[]) => {
    try {
      await Promise.allSettled(
        requestsId.map((id) =>
          prisma.request.updateMany({
            where: { id, type: "once" },
            data: { finished: true },
          })
        )
      );
    } catch (e: any) {
      throw new Error(e.message);
    }
  };

  updateRequest = async (id: string, request: CronRequest) => {
    try {
      await this.updateRequestDataAndRemoveExecOptions(id, request);
      await this.addNewExecOptionsToRequest(id, request.execOptions);
    } catch (e: any) {
      throw new Error(e.message);
    }
  };

  getRequestsToPerform = async () => {
    try {
      const requests = await Promise.allSettled([
        this.getOnceRequestsToPerform(),
        this.getDailyRequestsToPerform(),
        this.getWeeklyRequestsToPerform(),
        this.getMonthlyRequestsToPerform(),
      ]);

      return requests.reduce((acc, current) => {
        return current.status === "fulfilled"
          ? [...acc, ...current.value]
          : acc;
      }, [] as Request[]);
    } catch (e: any) {
      throw new Error(e.message);
    }
  };

  private getUnfinishedRequests = () => {
    return prisma.request.findMany({
      where: { AND: [{ finished: false, type: "once" }] },
      include: {
        execOptions: {},
      },
    });
  };

  private getOnceRequestsToPerform = async () => {
    try {
      const unfinishedRequests = await this.getUnfinishedRequests();

      const requestsToPerform = unfinishedRequests.filter((request) => {
        if (!request.execOptions[0].date) return false;

        return DateHelper.isDateSameWithCurrent(request.execOptions[0].date);
      });

      return requestsToPerform;
    } catch (e: any) {
      throw new Error(e.message);
    }
  };

  private updateRequestDataAndRemoveExecOptions = (
    id: string,
    requestData: CronRequest
  ) => {
    return prisma.request.update({
      where: { id },
      data: {
        ...requestData,
        execOptions: {
          deleteMany: {},
        },
      },
    });
  };

  private addNewExecOptionsToRequest = (
    id: string,
    execOptions: ExecOption[]
  ) => {
    return prisma.request.update({
      where: { id },
      data: {
        execOptions: {
          create: execOptions,
        },
      },
    });
  };

  private getDailyRequestsToPerform = () => {
    const currentTime = DateHelper.getCurrentTime();

    return prisma.request.findMany({
      where: {
        AND: [
          {
            type: "daily",
          },
          {
            execOptions: {
              some: {
                hour: currentTime,
              },
            },
          },
        ],
      },
    });
  };

  private getWeeklyRequestsToPerform = () => {
    const currentTime = DateHelper.getCurrentTime();

    return prisma.request.findMany({
      where: {
        AND: [
          { type: "weekly" },
          {
            execOptions: {
              some: {
                hour: currentTime,
                day: new Date().getDay(),
              },
            },
          },
        ],
      },
    });
  };

  private getMonthlyRequestsToPerform = () => {
    const currentTime = DateHelper.getCurrentTime();

    return prisma.request.findMany({
      where: {
        AND: [
          { type: "monthly" },
          {
            execOptions: {
              some: {
                hour: currentTime,
                day: new Date().getDate() + 1,
              },
            },
          },
        ],
      },
    });
  };
}

export default new RequestService();
