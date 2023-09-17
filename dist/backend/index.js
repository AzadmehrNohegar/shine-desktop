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
var import_nest_electron6 = require("@doubleshot/nest-electron");

// src/backend/app.module.ts
var import_path = require("path");
var import_common17 = require("@nestjs/common");
var import_config = require("@nestjs/config");
var import_nest_electron5 = require("@doubleshot/nest-electron");
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
var import_common7 = require("@nestjs/common");

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
var import_common5 = require("@nestjs/common");
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
function _ts_metadata3(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(k, v);
}
__name(_ts_metadata3, "_ts_metadata");
var OrderService = /* @__PURE__ */ __name(class OrderService2 {
  constructor(prisma) {
    __publicField(this, "prisma");
    __publicField(this, "prismaExtended");
    this.prisma = prisma;
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
    const result = await this.prisma.order.create({});
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
  async findAllPaginated(payload) {
    const { params } = payload;
    const { page, page_size, id, status } = params;
    const [count, items] = await this.prisma.$transaction([
      this.prismaExtended.order.count({
        where: {
          ...id ? {
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
          ...id ? {
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
  update(id, updateOrderDto) {
    console.log(updateOrderDto);
    return `This action updates a #${id} order`;
  }
  async remove(id) {
    const result = await this.prisma.order.delete({
      where: {
        id
      }
    });
    return result;
  }
}, "OrderService");
OrderService = _ts_decorate5([
  (0, import_common5.Injectable)(),
  _ts_metadata3("design:type", Function),
  _ts_metadata3("design:paramtypes", [
    typeof PrismaService === "undefined" ? Object : PrismaService
  ])
], OrderService);

// src/backend/order/order.controller.ts
var import_common6 = require("@nestjs/common");
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
  // @IpcHandle("updateOrder")
  // update(@Payload() updateOrderDto: UpdateOrderDto) {
  //   return this.orderService.update(updateOrderDto.id, updateOrderDto);
  // }
  remove({ id }) {
    return this.orderService.remove(id);
  }
}, "OrderController");
_ts_decorate6([
  (0, import_nest_electron.IpcHandle)("createOrder"),
  _ts_metadata4("design:type", Function),
  _ts_metadata4("design:paramtypes", [])
], OrderController.prototype, "create", null);
_ts_decorate6([
  (0, import_nest_electron.IpcHandle)("findAllOrder"),
  _ts_param(0, (0, import_microservices.Payload)()),
  _ts_metadata4("design:type", Function),
  _ts_metadata4("design:paramtypes", [
    typeof general_exports === "undefined" || typeof void 0 === "undefined" ? Object : void 0
  ])
], OrderController.prototype, "findAll", null);
_ts_decorate6([
  (0, import_nest_electron.IpcHandle)("findAllOrderPaginated"),
  _ts_param(0, (0, import_microservices.Payload)()),
  _ts_metadata4("design:type", Function),
  _ts_metadata4("design:paramtypes", [
    typeof general_exports === "undefined" || typeof void 0 === "undefined" ? Object : void 0
  ])
], OrderController.prototype, "findAllPaginated", null);
_ts_decorate6([
  (0, import_nest_electron.IpcHandle)("findOneOrder"),
  _ts_param(0, (0, import_microservices.Payload)()),
  _ts_metadata4("design:type", Function),
  _ts_metadata4("design:paramtypes", [
    typeof general_exports === "undefined" || typeof void 0 === "undefined" ? Object : void 0
  ])
], OrderController.prototype, "findOne", null);
_ts_decorate6([
  (0, import_nest_electron.IpcHandle)("removeOrder"),
  _ts_param(0, (0, import_microservices.Payload)()),
  _ts_metadata4("design:type", Function),
  _ts_metadata4("design:paramtypes", [
    typeof general_exports === "undefined" || typeof void 0 === "undefined" ? Object : void 0
  ])
], OrderController.prototype, "remove", null);
OrderController = _ts_decorate6([
  (0, import_common6.Controller)(),
  _ts_metadata4("design:type", Function),
  _ts_metadata4("design:paramtypes", [
    typeof OrderService === "undefined" ? Object : OrderService
  ])
], OrderController);

// src/backend/order/order.module.ts
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
var OrderModule = /* @__PURE__ */ __name(class OrderModule2 {
}, "OrderModule");
OrderModule = _ts_decorate7([
  (0, import_common7.Module)({
    controllers: [
      OrderController
    ],
    providers: [
      OrderService
    ]
  })
], OrderModule);

// src/backend/order-item/order-item.module.ts
var import_common10 = require("@nestjs/common");

// src/backend/order-item/order-item.service.ts
var import_common8 = require("@nestjs/common");
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
      return null;
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
            discount_price: price.base_discount,
            label_price: price.base_price,
            sell_price: price.base_price - price.base_discount,
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
      }
    });
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
        discount_price: price.base_discount,
        label_price: price.base_price,
        sell_price: price.base_price - price.base_discount,
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
OrderItemService = _ts_decorate8([
  (0, import_common8.Injectable)(),
  _ts_metadata5("design:type", Function),
  _ts_metadata5("design:paramtypes", [
    typeof PrismaService === "undefined" ? Object : PrismaService
  ])
], OrderItemService);

// src/backend/order-item/order-item.controller.ts
var import_common9 = require("@nestjs/common");
var import_microservices2 = require("@nestjs/microservices");
var import_nest_electron2 = require("@doubleshot/nest-electron");
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
_ts_decorate9([
  (0, import_nest_electron2.IpcHandle)("createOrderItem"),
  _ts_param2(0, (0, import_microservices2.Payload)()),
  _ts_metadata6("design:type", Function),
  _ts_metadata6("design:paramtypes", [
    typeof general_exports === "undefined" || typeof void 0 === "undefined" ? Object : void 0
  ])
], OrderItemController.prototype, "create", null);
_ts_decorate9([
  (0, import_nest_electron2.IpcHandle)("updateOrderItem"),
  _ts_param2(0, (0, import_microservices2.Payload)()),
  _ts_metadata6("design:type", Function),
  _ts_metadata6("design:paramtypes", [
    typeof general_exports === "undefined" || typeof void 0 === "undefined" ? Object : void 0
  ])
], OrderItemController.prototype, "update", null);
_ts_decorate9([
  (0, import_nest_electron2.IpcHandle)("removeOrderItem"),
  _ts_param2(0, (0, import_microservices2.Payload)()),
  _ts_metadata6("design:type", Function),
  _ts_metadata6("design:paramtypes", [
    typeof general_exports === "undefined" || typeof void 0 === "undefined" ? Object : void 0
  ])
], OrderItemController.prototype, "remove", null);
OrderItemController = _ts_decorate9([
  (0, import_common9.Controller)(),
  _ts_metadata6("design:type", Function),
  _ts_metadata6("design:paramtypes", [
    typeof OrderItemService === "undefined" ? Object : OrderItemService
  ])
], OrderItemController);

// src/backend/order-item/order-item.module.ts
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
var OrderItemModule = /* @__PURE__ */ __name(class OrderItemModule2 {
}, "OrderItemModule");
OrderItemModule = _ts_decorate10([
  (0, import_common10.Module)({
    controllers: [
      OrderItemController
    ],
    providers: [
      OrderItemService
    ]
  })
], OrderItemModule);

// src/backend/product/product.module.ts
var import_common13 = require("@nestjs/common");

// src/backend/product/product.service.ts
var import_common11 = require("@nestjs/common");
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
  create(createProductDto) {
    console.log(createProductDto);
    return "This action adds a new product";
  }
  async findAll(payload) {
    const { params } = payload;
    const { search } = params;
    const result = await this.prisma.product.findMany({
      take: 10,
      where: {
        name: {
          contains: search
        }
      },
      include: {
        barcode: true,
        price: true
      }
    });
    return result;
  }
  async findOne(payload) {
    const { id } = payload;
    const result = await this.prisma.product.findUnique({
      where: {
        id
      },
      include: {
        price: true
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
  update(id, updateProductDto) {
    console.log(updateProductDto);
    return `This action updates a #${id} product`;
  }
  remove(id) {
    return `This action removes a #${id} product`;
  }
}, "ProductService");
ProductService = _ts_decorate11([
  (0, import_common11.Injectable)(),
  _ts_metadata7("design:type", Function),
  _ts_metadata7("design:paramtypes", [
    typeof PrismaService === "undefined" ? Object : PrismaService
  ])
], ProductService);

// src/backend/product/product.controller.ts
var import_common12 = require("@nestjs/common");
var import_microservices3 = require("@nestjs/microservices");
var import_nest_electron3 = require("@doubleshot/nest-electron");
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
  create(createProductDto) {
    return this.productService.create(createProductDto);
  }
  findAll(payload) {
    return this.productService.findAll(payload);
  }
  findOne(payload) {
    return this.productService.findOne(payload);
  }
  findOneByBarcode(payload) {
    return this.productService.findOneByBarcode(payload);
  }
  update(updateProductDto) {
    return this.productService.update(2, updateProductDto);
  }
  remove(id) {
    return this.productService.remove(id);
  }
}, "ProductController");
_ts_decorate12([
  (0, import_nest_electron3.IpcHandle)("createProduct"),
  _ts_param3(0, (0, import_microservices3.Payload)()),
  _ts_metadata8("design:type", Function),
  _ts_metadata8("design:paramtypes", [
    Object
  ])
], ProductController.prototype, "create", null);
_ts_decorate12([
  (0, import_nest_electron3.IpcHandle)("findAllProduct"),
  _ts_param3(0, (0, import_microservices3.Payload)()),
  _ts_metadata8("design:type", Function),
  _ts_metadata8("design:paramtypes", [
    typeof general_exports === "undefined" || typeof void 0 === "undefined" ? Object : void 0
  ])
], ProductController.prototype, "findAll", null);
_ts_decorate12([
  (0, import_nest_electron3.IpcHandle)("findOneProduct"),
  _ts_param3(0, (0, import_microservices3.Payload)()),
  _ts_metadata8("design:type", Function),
  _ts_metadata8("design:paramtypes", [
    typeof general_exports === "undefined" || typeof void 0 === "undefined" ? Object : void 0
  ])
], ProductController.prototype, "findOne", null);
_ts_decorate12([
  (0, import_nest_electron3.IpcHandle)("findOneProductByBarcode"),
  _ts_param3(0, (0, import_microservices3.Payload)()),
  _ts_metadata8("design:type", Function),
  _ts_metadata8("design:paramtypes", [
    typeof general_exports === "undefined" || typeof void 0 === "undefined" ? Object : void 0
  ])
], ProductController.prototype, "findOneByBarcode", null);
_ts_decorate12([
  (0, import_nest_electron3.IpcHandle)("updateProduct"),
  _ts_param3(0, (0, import_microservices3.Payload)()),
  _ts_metadata8("design:type", Function),
  _ts_metadata8("design:paramtypes", [
    Object
  ])
], ProductController.prototype, "update", null);
_ts_decorate12([
  (0, import_nest_electron3.IpcHandle)("removeProduct"),
  _ts_param3(0, (0, import_microservices3.Payload)()),
  _ts_metadata8("design:type", Function),
  _ts_metadata8("design:paramtypes", [
    Number
  ])
], ProductController.prototype, "remove", null);
ProductController = _ts_decorate12([
  (0, import_common12.Controller)(),
  _ts_metadata8("design:type", Function),
  _ts_metadata8("design:paramtypes", [
    typeof ProductService === "undefined" ? Object : ProductService
  ])
], ProductController);

// src/backend/product/product.module.ts
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
var ProductModule = /* @__PURE__ */ __name(class ProductModule2 {
}, "ProductModule");
ProductModule = _ts_decorate13([
  (0, import_common13.Module)({
    controllers: [
      ProductController
    ],
    providers: [
      ProductService
    ]
  })
], ProductModule);

// src/backend/refund/refund.module.ts
var import_common16 = require("@nestjs/common");

// src/backend/refund/refund.service.ts
var import_common14 = require("@nestjs/common");
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
    const result = await this.prisma.refund.create({
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
    });
    await this.prisma.order.update({
      where: {
        id: order_id
      },
      data: {
        is_refunded: true,
        status: "refunded"
      }
    });
    return result;
  }
  findAll() {
    return `This action returns all refund`;
  }
  findOne(id) {
    return `This action returns a #${id} refund`;
  }
  update(id) {
    return `This action updates a #${id} refund`;
  }
  remove(id) {
    return `This action removes a #${id} refund`;
  }
}, "RefundService");
RefundService = _ts_decorate14([
  (0, import_common14.Injectable)(),
  _ts_metadata9("design:type", Function),
  _ts_metadata9("design:paramtypes", [
    typeof PrismaService === "undefined" ? Object : PrismaService
  ])
], RefundService);

// src/backend/refund/refund.controller.ts
var import_common15 = require("@nestjs/common");
var import_microservices4 = require("@nestjs/microservices");
var import_nest_electron4 = require("@doubleshot/nest-electron");
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
  findAll() {
    return this.refundService.findAll();
  }
  findOne(id) {
    return this.refundService.findOne(id);
  }
  // @IpcHandle("updateRefund")
  // update(@Payload() updateRefundDto: unknown) {
  //   return this.refundService.update(updateRefundDto.id, updateRefundDto);
  // }
  remove(id) {
    return this.refundService.remove(id);
  }
}, "RefundController");
_ts_decorate15([
  (0, import_nest_electron4.IpcHandle)("createRefund"),
  _ts_param4(0, (0, import_microservices4.Payload)()),
  _ts_metadata10("design:type", Function),
  _ts_metadata10("design:paramtypes", [
    typeof general_exports === "undefined" || typeof void 0 === "undefined" ? Object : void 0
  ])
], RefundController.prototype, "create", null);
_ts_decorate15([
  (0, import_nest_electron4.IpcHandle)("findAllRefund"),
  _ts_metadata10("design:type", Function),
  _ts_metadata10("design:paramtypes", [])
], RefundController.prototype, "findAll", null);
_ts_decorate15([
  (0, import_nest_electron4.IpcHandle)("findOneRefund"),
  _ts_param4(0, (0, import_microservices4.Payload)()),
  _ts_metadata10("design:type", Function),
  _ts_metadata10("design:paramtypes", [
    Number
  ])
], RefundController.prototype, "findOne", null);
_ts_decorate15([
  (0, import_nest_electron4.IpcHandle)("removeRefund"),
  _ts_param4(0, (0, import_microservices4.Payload)()),
  _ts_metadata10("design:type", Function),
  _ts_metadata10("design:paramtypes", [
    Number
  ])
], RefundController.prototype, "remove", null);
RefundController = _ts_decorate15([
  (0, import_common15.Controller)(),
  _ts_metadata10("design:type", Function),
  _ts_metadata10("design:paramtypes", [
    typeof RefundService === "undefined" ? Object : RefundService
  ])
], RefundController);

// src/backend/refund/refund.module.ts
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
var RefundModule = /* @__PURE__ */ __name(class RefundModule2 {
}, "RefundModule");
RefundModule = _ts_decorate16([
  (0, import_common16.Module)({
    controllers: [
      RefundController
    ],
    providers: [
      RefundService
    ]
  })
], RefundModule);

// src/backend/app.module.ts
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
var AppModule = /* @__PURE__ */ __name(class AppModule2 {
}, "AppModule");
AppModule = _ts_decorate17([
  (0, import_common17.Module)({
    imports: [
      PrismaModule,
      import_config.ConfigModule.forRoot(),
      import_nest_electron5.ElectronModule.registerAsync({
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
          const URL = isDev ? "http://[::1]:5173" : `file://${(0, import_path.join)(import_electron.app.getAppPath(), "dist/frontend/index.html")}`;
          win.loadURL(URL);
          return {
            win
          };
        }
      }),
      OrderModule,
      OrderItemModule,
      ProductModule,
      RefundModule
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
      strategy: new import_nest_electron6.ElectronIpcTransport("IpcTransport")
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
