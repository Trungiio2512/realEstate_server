const db = require("../models");
const { Op, Sequelize } = require("sequelize");
const { ErrorResponse, Unauthorized, ServerErorr } = require("../helpers/errorResponse");
class PropertyTypeService {
  static create = async (payload) => {
    const { name, description, images } = payload;
    const [data, created] = await db.PropertyType.findOrCreate({
      where: { name },
      defaults: {
        ...payload,
      },
    });
    if (!created) {
      throw new ErrorResponse("Property type has existing");
    }
    return { data, created };
  };
  static gets = async (payload) => {
    const { limit, page, fields, type, order, name, description, ...queries } = payload;

    const options = {};
    if (name)
      queries.name = Sequelize.where(
        Sequelize.fn("LOWER", Sequelize.col("name")),
        "LIKE",
        `%${name.toLocaleLowerCase()}%`
      );
    if (description) queries.description = { [Op.substring]: description };
    if (limit) options.limit = limit;
    if (fields) {
      const attributes = fields.split(",");
      const isExclude = attributes.some((field) => field?.startsWith("-"));
      if (isExclude) {
        options.attributes = { exclude: attributes.map((field) => field.replace("-", "")) };
      }
      options.attributes = attributes;
    }
    if (order) options.order = order;

    const data = await db.PropertyType.findAll({
      where: { ...queries },
      ...options,
    });
    if (!data) {
      throw new ErrorResponse("Property type has not found");
    }
    return { data };
  };
}

module.exports = PropertyTypeService;
