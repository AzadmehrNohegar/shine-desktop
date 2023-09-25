"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/backend/index.ts
var backend_exports = {};
__export(backend_exports, {
  wss: () => wss
});
module.exports = __toCommonJS(backend_exports);
var import_core = require("@nestjs/core");
var import_electron2 = require("electron");
var import_nest_electron8 = require("@doubleshot/nest-electron");

// src/backend/app.module.ts
var import_path = require("path");
var import_common27 = require("@nestjs/common");
var import_config = require("@nestjs/config");
var import_nest_electron7 = require("@doubleshot/nest-electron");
var import_electron = require("electron");

// src/backend/app.service.ts
var import_common = require("@nestjs/common");
function _ts_decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate, "_ts_decorate");
function _ts_metadata(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(k, v);
}
__name(_ts_metadata, "_ts_metadata");
var AppService = /* @__PURE__ */ __name(class AppService2 {
  constructor() {
  }
}, "AppService");
AppService = _ts_decorate([
  (0, import_common.Injectable)(),
  _ts_metadata("design:type", Function),
  _ts_metadata("design:paramtypes", [])
], AppService);

// src/backend/app.controller.ts
var import_common2 = require("@nestjs/common");
function _ts_decorate2(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate2, "_ts_decorate");
function _ts_metadata2(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(k, v);
}
__name(_ts_metadata2, "_ts_metadata");
var AppController = /* @__PURE__ */ __name(class AppController2 {
  constructor() {
  }
}, "AppController");
AppController = _ts_decorate2([
  (0, import_common2.Controller)(),
  _ts_metadata2("design:type", Function),
  _ts_metadata2("design:paramtypes", [])
], AppController);

// src/backend/prisma/prisma.module.ts
var import_common4 = require("@nestjs/common");

// src/backend/prisma/prisma.service.ts
var import_common3 = require("@nestjs/common");
var import_client = require("@prisma/client");
function _ts_decorate3(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate3, "_ts_decorate");
var PrismaService = /* @__PURE__ */ __name(class PrismaService2 extends import_client.PrismaClient {
  async onModuleInit() {
    await this.$connect();
  }
}, "PrismaService");
PrismaService = _ts_decorate3([
  (0, import_common3.Injectable)()
], PrismaService);

// src/backend/prisma/prisma.module.ts
function _ts_decorate4(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate4, "_ts_decorate");
var PrismaModule = /* @__PURE__ */ __name(class PrismaModule2 {
}, "PrismaModule");
PrismaModule = _ts_decorate4([
  (0, import_common4.Global)(),
  (0, import_common4.Module)({
    providers: [
      PrismaService
    ],
    exports: [
      PrismaService
    ]
  })
], PrismaModule);

// src/backend/order/order.module.ts
var import_common8 = require("@nestjs/common");

// src/backend/utils/deepClone.ts
var cloneable = class {
  static deepCopy(source) {
    return Array.isArray(source) ? source.map((item) => this.deepCopy(item)) : source instanceof Date ? new Date(source.getTime()) : source && typeof source === "object" ? Object.getOwnPropertyNames(source).reduce((o, prop) => {
      Object.defineProperty(o, prop, Object.getOwnPropertyDescriptor(source, prop));
      o[prop] = this.deepCopy(source[prop]);
      return o;
    }, Object.create(Object.getPrototypeOf(source))) : source;
  }
};
__name(cloneable, "cloneable");

// src/backend/order/order.service.ts
var import_common6 = require("@nestjs/common");

// src/backend/utils/serializedError.ts
function serializedError(reason) {
  return {
    reason
  };
}
__name(serializedError, "serializedError");

// src/backend/constants/locale.ts
var ERROR_TYPES = {
  NO_POS_RESPONSE: "\u062C\u0648\u0627\u0628\u06CC \u0627\u0632 \u06A9\u0627\u0631\u062A\u062E\u0648\u0627\u0646 \u062F\u0631\u06CC\u0627\u0641\u062A \u0646\u0634\u062F.",
  LESS_THAN_MIN: "\u0645\u0642\u062F\u0627\u0631 \u0633\u0641\u0627\u0631\u0634 \u0627\u0632 \u062D\u062F\u0627\u0642\u0644 \u06A9\u0645\u062A\u0631 \u0627\u0633\u062A.",
  ORDER_NOT_FOUND: "\u0633\u0641\u0627\u0631\u0634 \u0645\u0648\u0631\u062F \u0646\u0638\u0631 \u06CC\u0627\u0641\u062A \u0646\u0634\u062F.",
  PRICE_NOT_FOUND: "\u0642\u06CC\u0645\u062A \u0645\u0648\u0631\u062F \u0646\u0638\u0631 \u06CC\u0627\u0641\u062A \u0646\u0634\u062F.",
  COMMON_CREATION_ERROR: "\u0645\u0634\u06A9\u0644\u06CC \u062F\u0631 \u0627\u06CC\u062C\u0627\u062F \u0641\u0631\u0627\u06CC\u0646\u062F \u0627\u06CC\u062C\u0627\u062F \u067E\u06CC\u0634 \u0622\u0645\u062F.",
  DUPLICATE_BARCODE: "\u0645\u062D\u0635\u0648\u0644\u06CC \u0628\u0627 \u0627\u06CC\u0646 \u0628\u0627\u0631\u06A9\u062F \u062B\u0628\u062A \u0634\u062F\u0647 \u0627\u0633\u062A."
};

// src/backend/printer/printer.service.ts
var import_common5 = require("@nestjs/common");

// src/backend/utils/orderTools.ts
function orderTools(order) {
  const { order_items } = order;
  const raw_total = order_items.map((item) => item.label_price * item.quantity).reduce((prev, curr) => prev + curr, 0);
  const discount_total = order_items.map((item) => item.discount_price * item.quantity).reduce((prev, curr) => prev + curr, 0);
  const order_total = order_items.map((item) => item.sell_price * item.quantity).reduce((prev, curr) => prev + curr, 0);
  return {
    raw_total,
    discount_total,
    order_total
  };
}
__name(orderTools, "orderTools");

// src/backend/printer/printer.service.ts
function _ts_decorate5(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate5, "_ts_decorate");
var PrinterService = /* @__PURE__ */ __name(class PrinterService2 {
  async printOrder(result) {
    const { id, order_items, created_date } = result;
    const { discount_total, raw_total } = orderTools(result);
    wss.clients.forEach(/* @__PURE__ */ __name(function each(client) {
      const json = {
        vendor_name: "\u063A\u0631\u0641\u0647 \u067E\u06CC\u0631\u0648\u0632\u06CC",
        vendor_address: "\u0645\u06CC\u062F\u0627\u0646 \u0645\u06CC\u0648\u0647 \u0648 \u062A\u0631\u0647 \u0628\u0627\u0631 \u067E\u06CC\u0631\u0648\u0632\u06CC",
        date: new Intl.DateTimeFormat("fa-IR", {
          month: "long",
          day: "numeric",
          year: "numeric",
          numberingSystem: "latn"
        }).format(new Date(created_date)),
        time: new Intl.DateTimeFormat("fa-IR", {
          timeStyle: "short",
          numberingSystem: "latn"
        }).format(new Date(created_date)),
        number: id,
        total_discount: discount_total,
        total_amount: raw_total,
        total_payable_amount: raw_total - discount_total,
        order_items: order_items.map((item) => ({
          name: item.product.name,
          quantity: item.quantity,
          discount: item.discount_price * item.quantity,
          total_amount: item.quantity * item.sell_price,
          unit_price: item.label_price
        }))
      };
      client.send(JSON.stringify(json));
    }, "each"));
  }
}, "PrinterService");
PrinterService = _ts_decorate5([
  (0, import_common5.Injectable)()
], PrinterService);

// src/backend/order/order.service.ts
function _ts_decorate6(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate6, "_ts_decorate");
function _ts_metadata3(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(k, v);
}
__name(_ts_metadata3, "_ts_metadata");
var OrderService = /* @__PURE__ */ __name(class OrderService2 {
  constructor(prisma, printer) {
    __publicField(this, "prisma");
    __publicField(this, "printer");
    __publicField(this, "prismaExtended");
    this.prisma = prisma;
    this.printer = printer;
    this.prismaExtended = this.prisma.$extends({
      result: {
        orderItem: {
          sub_total: {
            needs: {
              quantity: true,
              label_price: true,
              discount_price: true
            },
            compute(orderItem) {
              return orderItem.quantity * (orderItem.label_price - orderItem.discount_price);
            }
          },
          discount_total: {
            needs: {
              quantity: true,
              discount_price: true
            },
            compute(orderItem) {
              return orderItem.quantity * orderItem.discount_price;
            }
          }
        }
      }
    });
  }
  async create() {
    const result = await this.prisma.order.create({
      data: {}
    });
    return result;
  }
  async findAll(payload) {
    const { params } = payload;
    const { status } = params;
    const result = await this.prismaExtended.order.findMany({
      where: {
        ...status ? {
          status: {
            equals: status
          }
        } : {}
      },
      include: {
        order_items: {
          orderBy: {
            id: "desc"
          },
          select: {
            id: true,
            discount_price: true,
            discount_total: true,
            label_price: true,
            product: true,
            quantity: true,
            sell_price: true,
            sub_total: true
          }
        }
      }
    });
    return cloneable.deepCopy(result);
  }
  async findAllPaginated(payload) {
    const { params } = payload;
    const { page, page_size, id, status } = params;
    const [count, items] = await this.prisma.$transaction([
      this.prismaExtended.order.count({
        where: {
          ...id && !isNaN(id) ? {
            id: {
              equals: id
            }
          } : {},
          ...status ? {
            status: {
              equals: status
            }
          } : {}
        }
      }),
      this.prismaExtended.order.findMany({
        take: page_size,
        skip: (page - 1) * page_size,
        where: {
          ...id && !isNaN(id) ? {
            id: {
              equals: id
            }
          } : {},
          ...status ? {
            status: {
              equals: status
            }
          } : {}
        },
        orderBy: {
          id: "desc"
        },
        include: {
          order_items: true
        }
      })
    ]);
    return {
      count,
      results: cloneable.deepCopy(items)
    };
  }
  async findOne(payload) {
    const { id } = payload;
    const result = await this.prismaExtended.order.findUnique({
      where: {
        id
      },
      include: {
        order_items: {
          orderBy: {
            id: "desc"
          },
          select: {
            id: true,
            discount_price: true,
            discount_total: true,
            label_price: true,
            order: true,
            product: true,
            quantity: true,
            sell_price: true,
            sub_total: true
          }
        }
      }
    });
    return cloneable.deepCopy(result);
  }
  async remove(payload) {
    const { id } = payload;
    const result = await this.prisma.order.delete({
      where: {
        id
      }
    });
    return result;
  }
  async invoice(payload) {
    const { id } = payload;
    const order = await this.prismaExtended.order.findUnique({
      where: {
        id
      },
      include: {
        order_items: {
          include: {
            product: true
          }
        }
      }
    });
    if (!order)
      return serializedError(ERROR_TYPES.ORDER_NOT_FOUND);
    await this.printer.printOrder(order);
    return "success";
  }
}, "OrderService");
OrderService = _ts_decorate6([
  (0, import_common6.Injectable)(),
  _ts_metadata3("design:type", Function),
  _ts_metadata3("design:paramtypes", [
    typeof PrismaService === "undefined" ? Object : PrismaService,
    typeof PrinterService === "undefined" ? Object : PrinterService
  ])
], OrderService);

// src/backend/order/order.controller.ts
var import_common7 = require("@nestjs/common");
var import_microservices = require("@nestjs/microservices");
var import_nest_electron = require("@doubleshot/nest-electron");

// src/model/general/index.ts
var general_exports = {};
__export(general_exports, {
  ORDER_TYPES: () => ORDER_TYPES
});
var ORDER_TYPES = {
  temp: "temp",
  completed: "completed",
  refunded: "refunded"
};

// src/backend/order/order.controller.ts
function _ts_decorate7(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate7, "_ts_decorate");
function _ts_metadata4(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(k, v);
}
__name(_ts_metadata4, "_ts_metadata");
function _ts_param(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
__name(_ts_param, "_ts_param");
var OrderController = /* @__PURE__ */ __name(class OrderController2 {
  constructor(orderService) {
    __publicField(this, "orderService");
    this.orderService = orderService;
  }
  create() {
    return this.orderService.create();
  }
  findAll(payload) {
    return this.orderService.findAll(payload);
  }
  findAllPaginated(payload) {
    return this.orderService.findAllPaginated(payload);
  }
  findOne(payload) {
    return this.orderService.findOne(payload);
  }
  remove(payload) {
    return this.orderService.remove(payload);
  }
  invoice(payload) {
    return this.orderService.invoice(payload);
  }
}, "OrderController");
_ts_decorate7([
  (0, import_nest_electron.IpcHandle)("createOrder"),
  _ts_metadata4("design:type", Function),
  _ts_metadata4("design:paramtypes", [])
], OrderController.prototype, "create", null);
_ts_decorate7([
  (0, import_nest_electron.IpcHandle)("findAllOrder"),
  _ts_param(0, (0, import_microservices.Payload)()),
  _ts_metadata4("design:type", Function),
  _ts_metadata4("design:paramtypes", [
    typeof general_exports === "undefined" || typeof void 0 === "undefined" ? Object : void 0
  ])
], OrderController.prototype, "findAll", null);
_ts_decorate7([
  (0, import_nest_electron.IpcHandle)("findAllOrderPaginated"),
  _ts_param(0, (0, import_microservices.Payload)()),
  _ts_metadata4("design:type", Function),
  _ts_metadata4("design:paramtypes", [
    typeof general_exports === "undefined" || typeof void 0 === "undefined" ? Object : void 0
  ])
], OrderController.prototype, "findAllPaginated", null);
_ts_decorate7([
  (0, import_nest_electron.IpcHandle)("findOneOrder"),
  _ts_param(0, (0, import_microservices.Payload)()),
  _ts_metadata4("design:type", Function),
  _ts_metadata4("design:paramtypes", [
    typeof general_exports === "undefined" || typeof void 0 === "undefined" ? Object : void 0
  ])
], OrderController.prototype, "findOne", null);
_ts_decorate7([
  (0, import_nest_electron.IpcHandle)("removeOrder"),
  _ts_param(0, (0, import_microservices.Payload)()),
  _ts_metadata4("design:type", Function),
  _ts_metadata4("design:paramtypes", [
    typeof general_exports === "undefined" || typeof void 0 === "undefined" ? Object : void 0
  ])
], OrderController.prototype, "remove", null);
_ts_decorate7([
  (0, import_nest_electron.IpcHandle)("invoiceOrder"),
  _ts_param(0, (0, import_microservices.Payload)()),
  _ts_metadata4("design:type", Function),
  _ts_metadata4("design:paramtypes", [
    typeof general_exports === "undefined" || typeof void 0 === "undefined" ? Object : void 0
  ])
], OrderController.prototype, "invoice", null);
OrderController = _ts_decorate7([
  (0, import_common7.Controller)(),
  _ts_metadata4("design:type", Function),
  _ts_metadata4("design:paramtypes", [
    typeof OrderService === "undefined" ? Object : OrderService
  ])
], OrderController);

// src/backend/order/order.module.ts
function _ts_decorate8(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate8, "_ts_decorate");
var OrderModule = /* @__PURE__ */ __name(class OrderModule2 {
}, "OrderModule");
OrderModule = _ts_decorate8([
  (0, import_common8.Module)({
    controllers: [
      OrderController
    ],
    providers: [
      OrderService
    ]
  })
], OrderModule);

// src/backend/order-item/order-item.module.ts
var import_common11 = require("@nestjs/common");

// src/backend/order-item/order-item.service.ts
var import_common9 = require("@nestjs/common");
function _ts_decorate9(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate9, "_ts_decorate");
function _ts_metadata5(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(k, v);
}
__name(_ts_metadata5, "_ts_metadata");
var OrderItemService = /* @__PURE__ */ __name(class OrderItemService2 {
  constructor(prisma) {
    __publicField(this, "prisma");
    this.prisma = prisma;
  }
  async create(payload) {
    const { body } = payload;
    const { price_id, order_id } = body;
    const price = await this.prisma.price.findUnique({
      where: {
        id: price_id
      },
      include: {
        product: true
      }
    });
    if (!price)
      return serializedError(ERROR_TYPES.PRICE_NOT_FOUND);
    if (order_id) {
      const order_item = await this.prisma.orderItem.findFirst({
        where: {
          order_id,
          product_id: price.product_id,
          label_price: price.base_price
        }
      });
      if (!order_item)
        return await this.prisma.orderItem.create({
          include: {
            order: true,
            product: {
              include: {
                barcode: true,
                price: true
              }
            }
          },
          data: {
            order_id,
            product_id: price.product_id,
            discount_price: price.base_price * (price.base_discount_percentage || 0) / 100,
            label_price: price.base_price,
            sell_price: price.base_price - price.base_price * ((price.base_discount_percentage || 0) / 100),
            quantity: 1
          }
        });
      return await this.prisma.orderItem.update({
        where: {
          id: order_item.id
        },
        data: {
          quantity: {
            increment: 1
          }
        }
      });
    }
    const order = await this.prisma.order.create({
      select: {
        id: true,
        order_items: true
      },
      data: {}
    });
    if (!order)
      return serializedError(ERROR_TYPES.COMMON_CREATION_ERROR);
    const result = await this.prisma.orderItem.create({
      include: {
        order: true,
        product: {
          include: {
            barcode: true,
            price: true
          }
        }
      },
      data: {
        order_id: order.id,
        product_id: price.product_id,
        discount_price: price.base_price * (price.base_discount_percentage || 0) / 100,
        label_price: price.base_price,
        sell_price: price.base_price - price.base_price * ((price.base_discount_percentage || 0) / 100),
        quantity: 1
      }
    });
    return result;
  }
  async update(payload) {
    const { id, body } = payload;
    const { quantity, label_price } = body;
    if (quantity === 0 || isNaN(quantity)) {
      return await this.prisma.orderItem.delete({
        where: {
          id: +id
        }
      });
    }
    return await this.prisma.orderItem.update({
      where: {
        id: +id
      },
      data: {
        ...quantity ? {
          quantity
        } : {},
        ...label_price ? {
          label_price
        } : {}
      }
    });
  }
  async remove(id) {
    const result = await this.prisma.orderItem.delete({
      where: {
        id
      }
    });
    return result;
  }
}, "OrderItemService");
OrderItemService = _ts_decorate9([
  (0, import_common9.Injectable)(),
  _ts_metadata5("design:type", Function),
  _ts_metadata5("design:paramtypes", [
    typeof PrismaService === "undefined" ? Object : PrismaService
  ])
], OrderItemService);

// src/backend/order-item/order-item.controller.ts
var import_common10 = require("@nestjs/common");
var import_microservices2 = require("@nestjs/microservices");
var import_nest_electron2 = require("@doubleshot/nest-electron");
function _ts_decorate10(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate10, "_ts_decorate");
function _ts_metadata6(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(k, v);
}
__name(_ts_metadata6, "_ts_metadata");
function _ts_param2(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
__name(_ts_param2, "_ts_param");
var OrderItemController = /* @__PURE__ */ __name(class OrderItemController2 {
  constructor(orderItemService) {
    __publicField(this, "orderItemService");
    this.orderItemService = orderItemService;
  }
  create(payload) {
    return this.orderItemService.create(payload);
  }
  update(payload) {
    return this.orderItemService.update(payload);
  }
  remove({ id }) {
    return this.orderItemService.remove(id);
  }
}, "OrderItemController");
_ts_decorate10([
  (0, import_nest_electron2.IpcHandle)("createOrderItem"),
  _ts_param2(0, (0, import_microservices2.Payload)()),
  _ts_metadata6("design:type", Function),
  _ts_metadata6("design:paramtypes", [
    typeof general_exports === "undefined" || typeof void 0 === "undefined" ? Object : void 0
  ])
], OrderItemController.prototype, "create", null);
_ts_decorate10([
  (0, import_nest_electron2.IpcHandle)("updateOrderItem"),
  _ts_param2(0, (0, import_microservices2.Payload)()),
  _ts_metadata6("design:type", Function),
  _ts_metadata6("design:paramtypes", [
    typeof general_exports === "undefined" || typeof void 0 === "undefined" ? Object : void 0
  ])
], OrderItemController.prototype, "update", null);
_ts_decorate10([
  (0, import_nest_electron2.IpcHandle)("removeOrderItem"),
  _ts_param2(0, (0, import_microservices2.Payload)()),
  _ts_metadata6("design:type", Function),
  _ts_metadata6("design:paramtypes", [
    typeof general_exports === "undefined" || typeof void 0 === "undefined" ? Object : void 0
  ])
], OrderItemController.prototype, "remove", null);
OrderItemController = _ts_decorate10([
  (0, import_common10.Controller)(),
  _ts_metadata6("design:type", Function),
  _ts_metadata6("design:paramtypes", [
    typeof OrderItemService === "undefined" ? Object : OrderItemService
  ])
], OrderItemController);

// src/backend/order-item/order-item.module.ts
function _ts_decorate11(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate11, "_ts_decorate");
var OrderItemModule = /* @__PURE__ */ __name(class OrderItemModule2 {
}, "OrderItemModule");
OrderItemModule = _ts_decorate11([
  (0, import_common11.Module)({
    controllers: [
      OrderItemController
    ],
    providers: [
      OrderItemService
    ]
  })
], OrderItemModule);

// src/backend/product/product.module.ts
var import_common14 = require("@nestjs/common");

// src/backend/product/product.service.ts
var import_common12 = require("@nestjs/common");
var import_uuid = require("uuid");
function _ts_decorate12(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate12, "_ts_decorate");
function _ts_metadata7(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(k, v);
}
__name(_ts_metadata7, "_ts_metadata");
var ProductService = /* @__PURE__ */ __name(class ProductService2 {
  constructor(prisma) {
    __publicField(this, "prisma");
    this.prisma = prisma;
  }
  async create(payload) {
    const { body } = payload;
    const { name, price, barcode } = body;
    try {
      const result = await this.prisma.product.create({
        data: {
          internal_code: (0, import_uuid.v4)(),
          name,
          price: {
            create: price.map((item) => ({
              inventory: item.inventory,
              base_price: item.base_price,
              base_discount_percentage: item.base_discount_percentage
            }))
          },
          barcode: {
            create: barcode.map((item) => ({
              code: item.code
            }))
          }
        }
      });
      return result;
    } catch (e) {
      return serializedError(ERROR_TYPES.DUPLICATE_BARCODE);
    }
  }
  async findAll(payload) {
    const { params } = payload;
    const { search } = params;
    const result = await this.prisma.product.findMany({
      take: 10,
      where: {
        name: {
          contains: search
        },
        is_active: true
      },
      include: {
        barcode: true,
        price: true
      }
    });
    return result;
  }
  async findAllPaginated(payload) {
    const { params } = payload;
    const { page, page_size, search } = params;
    const [count, items] = await this.prisma.$transaction([
      this.prisma.product.count({
        where: {
          OR: [
            {
              barcode: {
                some: {
                  code: {
                    contains: search
                  }
                }
              }
            },
            {
              name: {
                contains: search
              }
            }
          ]
        }
      }),
      this.prisma.product.findMany({
        take: page_size,
        skip: (page - 1) * page_size,
        where: {
          OR: [
            {
              barcode: {
                some: {
                  code: {
                    contains: search
                  }
                }
              }
            },
            {
              name: {
                contains: search
              }
            }
          ]
        },
        include: {
          barcode: true,
          price: true
        }
      })
    ]);
    return {
      count,
      results: cloneable.deepCopy(items)
    };
  }
  async findOne(payload) {
    const { id } = payload;
    const result = await this.prisma.product.findUnique({
      where: {
        id
      },
      include: {
        price: true,
        barcode: true
      }
    });
    return result;
  }
  async findOneByBarcode(payload) {
    const { body } = payload;
    const { barcode } = body;
    const result = await this.prisma.product.findFirst({
      where: {
        barcode: {
          some: {
            code: barcode
          }
        }
      },
      include: {
        price: true
      }
    });
    return result;
  }
  async update(payload) {
    const { id, body } = payload;
    const result = await this.prisma.product.update({
      where: {
        id
      },
      include: {
        price: true,
        barcode: true
      },
      data: {
        name: body.name,
        barcode: {
          deleteMany: {
            code: {
              notIn: body.barcode.map((item) => item.code)
            }
          },
          connectOrCreate: body.barcode.map((item) => ({
            where: {
              code: item.code
            },
            create: {
              code: item.code
            }
          }))
        },
        price: {
          deleteMany: {
            base_price: {
              notIn: body.price.map((item) => item.base_price)
            }
          },
          updateMany: body.price.map((item) => ({
            where: {
              base_price: item.base_price
            },
            data: {
              base_price: item.base_price,
              base_discount_percentage: item.base_discount_percentage,
              inventory: item.inventory
            }
          })),
          connectOrCreate: body.price.map((item) => ({
            create: {
              inventory: item.inventory,
              base_discount_percentage: item.base_discount_percentage,
              base_price: item.base_price
            },
            where: {
              product_id_base_price: {
                base_price: item.base_price,
                product_id: id
              }
            }
          }))
        }
      }
    });
    return result;
  }
  async updateProductActivation(payload) {
    const { id, body } = payload;
    const { is_active } = body;
    const result = await this.prisma.product.update({
      where: {
        id
      },
      data: {
        is_active
      }
    });
    return result;
  }
}, "ProductService");
ProductService = _ts_decorate12([
  (0, import_common12.Injectable)(),
  _ts_metadata7("design:type", Function),
  _ts_metadata7("design:paramtypes", [
    typeof PrismaService === "undefined" ? Object : PrismaService
  ])
], ProductService);

// src/backend/product/product.controller.ts
var import_common13 = require("@nestjs/common");
var import_microservices3 = require("@nestjs/microservices");
var import_nest_electron3 = require("@doubleshot/nest-electron");
function _ts_decorate13(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate13, "_ts_decorate");
function _ts_metadata8(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(k, v);
}
__name(_ts_metadata8, "_ts_metadata");
function _ts_param3(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
__name(_ts_param3, "_ts_param");
var ProductController = /* @__PURE__ */ __name(class ProductController2 {
  constructor(productService) {
    __publicField(this, "productService");
    this.productService = productService;
  }
  create(payload) {
    return this.productService.create(payload);
  }
  findAll(payload) {
    return this.productService.findAll(payload);
  }
  findAllPaginated(payload) {
    return this.productService.findAllPaginated(payload);
  }
  findOne(payload) {
    return this.productService.findOne(payload);
  }
  findOneByBarcode(payload) {
    return this.productService.findOneByBarcode(payload);
  }
  update(payload) {
    return this.productService.update(payload);
  }
  updateActivation(payload) {
    return this.productService.updateProductActivation(payload);
  }
}, "ProductController");
_ts_decorate13([
  (0, import_nest_electron3.IpcHandle)("createProduct"),
  _ts_param3(0, (0, import_microservices3.Payload)()),
  _ts_metadata8("design:type", Function),
  _ts_metadata8("design:paramtypes", [
    typeof general_exports === "undefined" || typeof void 0 === "undefined" ? Object : void 0
  ])
], ProductController.prototype, "create", null);
_ts_decorate13([
  (0, import_nest_electron3.IpcHandle)("findAllProduct"),
  _ts_param3(0, (0, import_microservices3.Payload)()),
  _ts_metadata8("design:type", Function),
  _ts_metadata8("design:paramtypes", [
    typeof general_exports === "undefined" || typeof void 0 === "undefined" ? Object : void 0
  ])
], ProductController.prototype, "findAll", null);
_ts_decorate13([
  (0, import_nest_electron3.IpcHandle)("findAllProductPaginated"),
  _ts_param3(0, (0, import_microservices3.Payload)()),
  _ts_metadata8("design:type", Function),
  _ts_metadata8("design:paramtypes", [
    typeof general_exports === "undefined" || typeof void 0 === "undefined" ? Object : void 0
  ])
], ProductController.prototype, "findAllPaginated", null);
_ts_decorate13([
  (0, import_nest_electron3.IpcHandle)("findOneProduct"),
  _ts_param3(0, (0, import_microservices3.Payload)()),
  _ts_metadata8("design:type", Function),
  _ts_metadata8("design:paramtypes", [
    typeof general_exports === "undefined" || typeof void 0 === "undefined" ? Object : void 0
  ])
], ProductController.prototype, "findOne", null);
_ts_decorate13([
  (0, import_nest_electron3.IpcHandle)("findOneProductByBarcode"),
  _ts_param3(0, (0, import_microservices3.Payload)()),
  _ts_metadata8("design:type", Function),
  _ts_metadata8("design:paramtypes", [
    typeof general_exports === "undefined" || typeof void 0 === "undefined" ? Object : void 0
  ])
], ProductController.prototype, "findOneByBarcode", null);
_ts_decorate13([
  (0, import_nest_electron3.IpcHandle)("updateProduct"),
  _ts_param3(0, (0, import_microservices3.Payload)()),
  _ts_metadata8("design:type", Function),
  _ts_metadata8("design:paramtypes", [
    typeof general_exports === "undefined" || typeof void 0 === "undefined" ? Object : void 0
  ])
], ProductController.prototype, "update", null);
_ts_decorate13([
  (0, import_nest_electron3.IpcHandle)("updateProductActivation"),
  _ts_param3(0, (0, import_microservices3.Payload)()),
  _ts_metadata8("design:type", Function),
  _ts_metadata8("design:paramtypes", [
    typeof general_exports === "undefined" || typeof void 0 === "undefined" ? Object : void 0
  ])
], ProductController.prototype, "updateActivation", null);
ProductController = _ts_decorate13([
  (0, import_common13.Controller)(),
  _ts_metadata8("design:type", Function),
  _ts_metadata8("design:paramtypes", [
    typeof ProductService === "undefined" ? Object : ProductService
  ])
], ProductController);

// src/backend/product/product.module.ts
function _ts_decorate14(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate14, "_ts_decorate");
var ProductModule = /* @__PURE__ */ __name(class ProductModule2 {
}, "ProductModule");
ProductModule = _ts_decorate14([
  (0, import_common14.Module)({
    controllers: [
      ProductController
    ],
    providers: [
      ProductService
    ]
  })
], ProductModule);

// src/backend/refund/refund.module.ts
var import_common17 = require("@nestjs/common");

// src/backend/refund/refund.service.ts
var import_common15 = require("@nestjs/common");
function _ts_decorate15(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate15, "_ts_decorate");
function _ts_metadata9(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(k, v);
}
__name(_ts_metadata9, "_ts_metadata");
var RefundService = /* @__PURE__ */ __name(class RefundService2 {
  constructor(prisma) {
    __publicField(this, "prisma");
    this.prisma = prisma;
  }
  async create(payload) {
    const { body } = payload;
    const { order_id, items, description } = body;
    const result = await this.prisma.$transaction([
      this.prisma.refund.create({
        data: {
          order_id,
          description,
          RefundItem: {
            create: items.map((item) => ({
              order_item_id: item.order_item,
              order_item_quantity: item.quantity
            }))
          }
        }
      }),
      this.prisma.order.update({
        where: {
          id: order_id
        },
        data: {
          is_refunded: true,
          status: "refunded"
        }
      })
    ]);
    return result;
  }
}, "RefundService");
RefundService = _ts_decorate15([
  (0, import_common15.Injectable)(),
  _ts_metadata9("design:type", Function),
  _ts_metadata9("design:paramtypes", [
    typeof PrismaService === "undefined" ? Object : PrismaService
  ])
], RefundService);

// src/backend/refund/refund.controller.ts
var import_common16 = require("@nestjs/common");
var import_microservices4 = require("@nestjs/microservices");
var import_nest_electron4 = require("@doubleshot/nest-electron");
function _ts_decorate16(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate16, "_ts_decorate");
function _ts_metadata10(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(k, v);
}
__name(_ts_metadata10, "_ts_metadata");
function _ts_param4(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
__name(_ts_param4, "_ts_param");
var RefundController = /* @__PURE__ */ __name(class RefundController2 {
  constructor(refundService) {
    __publicField(this, "refundService");
    this.refundService = refundService;
  }
  create(payload) {
    return this.refundService.create(payload);
  }
}, "RefundController");
_ts_decorate16([
  (0, import_nest_electron4.IpcHandle)("createRefund"),
  _ts_param4(0, (0, import_microservices4.Payload)()),
  _ts_metadata10("design:type", Function),
  _ts_metadata10("design:paramtypes", [
    typeof general_exports === "undefined" || typeof void 0 === "undefined" ? Object : void 0
  ])
], RefundController.prototype, "create", null);
RefundController = _ts_decorate16([
  (0, import_common16.Controller)(),
  _ts_metadata10("design:type", Function),
  _ts_metadata10("design:paramtypes", [
    typeof RefundService === "undefined" ? Object : RefundService
  ])
], RefundController);

// src/backend/refund/refund.module.ts
function _ts_decorate17(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate17, "_ts_decorate");
var RefundModule = /* @__PURE__ */ __name(class RefundModule2 {
}, "RefundModule");
RefundModule = _ts_decorate17([
  (0, import_common17.Module)({
    controllers: [
      RefundController
    ],
    providers: [
      RefundService
    ]
  })
], RefundModule);

// src/backend/payment/payment.module.ts
var import_common22 = require("@nestjs/common");

// src/backend/api/api.service.ts
var import_axios = require("@nestjs/axios");
var import_common18 = require("@nestjs/common");
function _ts_decorate18(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate18, "_ts_decorate");
function _ts_metadata11(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(k, v);
}
__name(_ts_metadata11, "_ts_metadata");
var ApiService = /* @__PURE__ */ __name(class ApiService2 {
  constructor(http) {
    __publicField(this, "http");
    this.http = http;
  }
  async postPos(payload) {
    const { body } = payload;
    console.log(body);
    return {};
  }
}, "ApiService");
ApiService = _ts_decorate18([
  (0, import_common18.Injectable)(),
  _ts_metadata11("design:type", Function),
  _ts_metadata11("design:paramtypes", [
    typeof import_axios.HttpService === "undefined" ? Object : import_axios.HttpService
  ])
], ApiService);

// src/backend/pos/pos.service.ts
var import_common19 = require("@nestjs/common");
function _ts_decorate19(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate19, "_ts_decorate");
function _ts_metadata12(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(k, v);
}
__name(_ts_metadata12, "_ts_metadata");
var PosService = /* @__PURE__ */ __name(class PosService2 {
  constructor(prisma, api) {
    __publicField(this, "prisma");
    __publicField(this, "api");
    this.prisma = prisma;
    this.api = api;
  }
  async createPosTransaction(payload) {
    const { Amount, PayerId, PcID, PosId, ServiceCode } = payload;
    const pos = await this.prisma.pos.findUnique({
      where: {
        id: PosId
      }
    });
    if (!pos)
      return null;
    const posRequest = await this.api.postPos({
      body: {
        Url: `http://${pos.ip}:${pos.port}/bpmpospc/service`,
        Amount,
        PayerId,
        PcID,
        PosId,
        ServiceCode
      }
    });
    if (!posRequest)
      return null;
    const result = await this.prisma.posTransaction.create({
      data: {
        amount: Amount,
        pos_id: PosId,
        pan: "125125",
        terminal_number: "125125",
        status_code: 100
      }
    });
    return result;
  }
  async findAllPos() {
    const result = await this.prisma.pos.findMany();
    return result;
  }
}, "PosService");
PosService = _ts_decorate19([
  (0, import_common19.Injectable)(),
  _ts_metadata12("design:type", Function),
  _ts_metadata12("design:paramtypes", [
    typeof PrismaService === "undefined" ? Object : PrismaService,
    typeof ApiService === "undefined" ? Object : ApiService
  ])
], PosService);

// src/backend/utils/persianConvert.ts
var PersianConvert = class {
};
__name(PersianConvert, "PersianConvert");
__publicField(PersianConvert, "convertPersian2English", /* @__PURE__ */ __name((string) => {
  if (!string)
    return null;
  if (string.length === 0)
    return "";
  return string.replace(/[\u0660-\u0669\u06f0-\u06f9]/g, (c) => {
    return (c.charCodeAt(0) & 15).toString();
  });
}, "convertPersian2English"));

// src/backend/payment/payment.service.ts
var import_common20 = require("@nestjs/common");
function _ts_decorate20(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate20, "_ts_decorate");
function _ts_metadata13(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(k, v);
}
__name(_ts_metadata13, "_ts_metadata");
var PaymentService = /* @__PURE__ */ __name(class PaymentService2 {
  constructor(prisma, pos, printer) {
    __publicField(this, "prisma");
    __publicField(this, "pos");
    __publicField(this, "printer");
    this.prisma = prisma;
    this.pos = pos;
    this.printer = printer;
  }
  async create(payload) {
    const { body } = payload;
    const { order_id, cash_amount, user_phone, pos_id } = body;
    const order = await this.prisma.order.findUnique({
      where: {
        id: order_id
      },
      include: {
        order_items: {
          include: {
            product: true
          }
        }
      }
    });
    if (!order)
      return serializedError(ERROR_TYPES.ORDER_NOT_FOUND);
    const { order_total } = orderTools(order);
    const pos_amount = order_total - (cash_amount || 0);
    if (pos_amount > 1 && pos_amount < 1e4)
      return serializedError(ERROR_TYPES.LESS_THAN_MIN);
    if (pos_amount > 1e4) {
      const posResponse = await this.pos.createPosTransaction({
        ServiceCode: "1",
        Amount: pos_amount,
        PayerId: user_phone || "2",
        PcID: "1234",
        PosId: pos_id
      });
      if (!posResponse)
        return serializedError(ERROR_TYPES.NO_POS_RESPONSE);
      if (posResponse.status_code === 100)
        await this.prisma.order.update({
          where: {
            id: order_id
          },
          data: {
            user_phone: PersianConvert.convertPersian2English(user_phone),
            status: "completed"
          }
        });
      const [result2] = await this.prisma.$transaction([
        this.prisma.payment.create({
          data: {
            amount: order_total,
            order_id,
            is_resolved: true
          }
        }),
        ...order.order_items.map((item) => this.prisma.price.update({
          where: {
            product_id_base_price: {
              base_price: item.label_price,
              product_id: item.product_id
            }
          },
          data: {
            inventory: {
              decrement: item.quantity
            }
          }
        }))
      ]);
      await this.printer.printOrder(order);
      return result2;
    }
    const [, result] = await this.prisma.$transaction([
      this.prisma.order.update({
        where: {
          id: order_id
        },
        data: {
          user_phone: PersianConvert.convertPersian2English(user_phone),
          status: "completed"
        }
      }),
      this.prisma.payment.create({
        data: {
          amount: order_total,
          order_id,
          is_resolved: true
        }
      }),
      ...order.order_items.map((item) => this.prisma.price.update({
        where: {
          product_id_base_price: {
            base_price: item.label_price,
            product_id: item.product_id
          }
        },
        data: {
          inventory: {
            decrement: item.quantity
          }
        }
      }))
    ]);
    await this.printer.printOrder(order);
    return result;
  }
}, "PaymentService");
PaymentService = _ts_decorate20([
  (0, import_common20.Injectable)(),
  _ts_metadata13("design:type", Function),
  _ts_metadata13("design:paramtypes", [
    typeof PrismaService === "undefined" ? Object : PrismaService,
    typeof PosService === "undefined" ? Object : PosService,
    typeof PrinterService === "undefined" ? Object : PrinterService
  ])
], PaymentService);

// src/backend/payment/payment.controller.ts
var import_common21 = require("@nestjs/common");
var import_microservices5 = require("@nestjs/microservices");
var import_nest_electron5 = require("@doubleshot/nest-electron");
function _ts_decorate21(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate21, "_ts_decorate");
function _ts_metadata14(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(k, v);
}
__name(_ts_metadata14, "_ts_metadata");
function _ts_param5(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
__name(_ts_param5, "_ts_param");
var PaymentController = /* @__PURE__ */ __name(class PaymentController2 {
  constructor(paymentService) {
    __publicField(this, "paymentService");
    this.paymentService = paymentService;
  }
  create(payload) {
    return this.paymentService.create(payload);
  }
}, "PaymentController");
_ts_decorate21([
  (0, import_nest_electron5.IpcHandle)("createPayment"),
  _ts_param5(0, (0, import_microservices5.Payload)()),
  _ts_metadata14("design:type", Function),
  _ts_metadata14("design:paramtypes", [
    typeof general_exports === "undefined" || typeof void 0 === "undefined" ? Object : void 0
  ])
], PaymentController.prototype, "create", null);
PaymentController = _ts_decorate21([
  (0, import_common21.Controller)(),
  _ts_metadata14("design:type", Function),
  _ts_metadata14("design:paramtypes", [
    typeof PaymentService === "undefined" ? Object : PaymentService
  ])
], PaymentController);

// src/backend/payment/payment.module.ts
function _ts_decorate22(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate22, "_ts_decorate");
var PaymentModule = /* @__PURE__ */ __name(class PaymentModule2 {
}, "PaymentModule");
PaymentModule = _ts_decorate22([
  (0, import_common22.Module)({
    controllers: [
      PaymentController
    ],
    providers: [
      PaymentService
    ]
  })
], PaymentModule);

// src/backend/api/api.module.ts
var import_common23 = require("@nestjs/common");
var import_axios2 = require("@nestjs/axios");
function _ts_decorate23(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate23, "_ts_decorate");
var ApiModule = /* @__PURE__ */ __name(class ApiModule2 {
}, "ApiModule");
ApiModule = _ts_decorate23([
  (0, import_common23.Global)(),
  (0, import_common23.Module)({
    imports: [
      import_axios2.HttpModule
    ],
    providers: [
      ApiService
    ],
    exports: [
      ApiService
    ]
  })
], ApiModule);

// src/backend/pos/pos.module.ts
var import_common25 = require("@nestjs/common");

// src/backend/pos/pos.controller.ts
var import_common24 = require("@nestjs/common");
var import_nest_electron6 = require("@doubleshot/nest-electron");
var import_microservices6 = require("@nestjs/microservices");
function _ts_decorate24(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate24, "_ts_decorate");
function _ts_metadata15(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(k, v);
}
__name(_ts_metadata15, "_ts_metadata");
function _ts_param6(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
__name(_ts_param6, "_ts_param");
var PosController = /* @__PURE__ */ __name(class PosController2 {
  constructor(posService) {
    __publicField(this, "posService");
    this.posService = posService;
  }
  findAll() {
    return this.posService.findAllPos();
  }
  createPosTransaction(payload) {
    return this.posService.createPosTransaction(payload);
  }
}, "PosController");
_ts_decorate24([
  (0, import_nest_electron6.IpcHandle)("findAllPos"),
  _ts_metadata15("design:type", Function),
  _ts_metadata15("design:paramtypes", [])
], PosController.prototype, "findAll", null);
_ts_decorate24([
  (0, import_nest_electron6.IpcHandle)("createPosTransaction"),
  _ts_param6(0, (0, import_microservices6.Payload)()),
  _ts_metadata15("design:type", Function),
  _ts_metadata15("design:paramtypes", [
    typeof general_exports === "undefined" || typeof void 0 === "undefined" ? Object : void 0
  ])
], PosController.prototype, "createPosTransaction", null);
PosController = _ts_decorate24([
  (0, import_common24.Controller)(),
  _ts_metadata15("design:type", Function),
  _ts_metadata15("design:paramtypes", [
    typeof PosService === "undefined" ? Object : PosService
  ])
], PosController);

// src/backend/pos/pos.module.ts
function _ts_decorate25(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate25, "_ts_decorate");
var PosModule = /* @__PURE__ */ __name(class PosModule2 {
}, "PosModule");
PosModule = _ts_decorate25([
  (0, import_common25.Global)(),
  (0, import_common25.Module)({
    providers: [
      PosService
    ],
    controllers: [
      PosController
    ],
    exports: [
      PosService
    ]
  })
], PosModule);

// src/backend/printer/printer.module.ts
var import_common26 = require("@nestjs/common");
function _ts_decorate26(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate26, "_ts_decorate");
var PrinterModule = /* @__PURE__ */ __name(class PrinterModule2 {
}, "PrinterModule");
PrinterModule = _ts_decorate26([
  (0, import_common26.Global)(),
  (0, import_common26.Module)({
    providers: [
      PrinterService
    ],
    exports: [
      PrinterService
    ]
  })
], PrinterModule);

// src/backend/app.module.ts
function _ts_decorate27(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate27, "_ts_decorate");
var AppModule = /* @__PURE__ */ __name(class AppModule2 {
}, "AppModule");
AppModule = _ts_decorate27([
  (0, import_common27.Module)({
    imports: [
      PrismaModule,
      ApiModule,
      import_config.ConfigModule.forRoot(),
      import_nest_electron7.ElectronModule.registerAsync({
        useFactory: async () => {
          const isDev = !import_electron.app.isPackaged;
          const win = new import_electron.BrowserWindow({
            width: 1024,
            height: 768,
            autoHideMenuBar: true,
            webPreferences: {
              contextIsolation: true,
              preload: (0, import_path.join)(__dirname, "../preload/index.js")
            }
          });
          win.on("closed", () => {
            win.destroy();
          });
          const URL = isDev ? process.env.DS_RENDERER_URL : `file://${(0, import_path.join)(import_electron.app.getAppPath(), "dist/frontend/index.html")}`;
          win.loadURL(URL);
          return {
            win
          };
        }
      }),
      OrderModule,
      OrderItemModule,
      ProductModule,
      RefundModule,
      PaymentModule,
      PosModule,
      PrinterModule
    ],
    controllers: [
      AppController
    ],
    providers: [
      AppService
    ]
  })
], AppModule);

// src/backend/index.ts
var import_ws = __toESM(require("ws"));
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";
async function electronAppInit() {
  const isDev = !import_electron2.app.isPackaged;
  import_electron2.app.on("window-all-closed", () => {
    if (process.platform !== "darwin")
      import_electron2.app.quit();
  });
  if (isDev) {
    if (process.platform === "win32") {
      process.on("message", (data) => {
        if (data === "graceful-exit")
          import_electron2.app.quit();
      });
    } else {
      process.on("SIGTERM", () => {
        import_electron2.app.quit();
      });
    }
  }
  await import_electron2.app.whenReady();
}
__name(electronAppInit, "electronAppInit");
async function bootstrap() {
  try {
    await electronAppInit();
    const nestApp = await import_core.NestFactory.createMicroservice(AppModule, {
      strategy: new import_nest_electron8.ElectronIpcTransport("IpcTransport")
    });
    await nestApp.listen();
  } catch (error) {
    console.log(error);
    import_electron2.app.quit();
  }
}
__name(bootstrap, "bootstrap");
var wss = new import_ws.default.Server({
  port: 8e3
});
wss.on("connection", (ws) => {
  console.log("New client connected");
  ws.on("message", (data) => {
    console.log("data received \n " + data);
    wss.clients.forEach(function(client) {
      console.log("here");
      client.send(data);
    });
  });
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
bootstrap();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  wss
});
