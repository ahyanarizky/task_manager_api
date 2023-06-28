/**
 * Create a Sequelize instance. This can be done by passing
 * the connection parameters separately to the Sequelize constructor.
 */
import { Sequelize } from "sequelize";
export const sequelize = new Sequelize('task_manager_database', 'ahyanarizky', 'ahyanarizky', {
  host: 'localhost',
  dialect: 'mysql',
  underscored: false,
  port: 3306,
  pool: {
    max: 10,
    min: 0,
    idle: 10000,
  },
  logging: console.log, // or false to disable logging
  define: {
    underscored: true,
    timestamps: true,
    // paranoid: true,
  },
  timezone: '+04:00',
});