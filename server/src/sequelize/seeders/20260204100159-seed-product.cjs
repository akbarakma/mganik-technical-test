'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [{
      name: 'Makanan',
      is_deleted: false,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      name: 'Minuman',
      is_deleted: false,
      created_at: new Date(),
      updated_at: new Date(),
    }], {});

    await queryInterface.bulkInsert('products', [{
      name: 'Susu',
      stock: 2,
      category_id: 2,
      is_deleted: false,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      name: 'Mie Goreng',
      stock: 2,
      category_id: 1,
      is_deleted: false,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      name: 'Aqua',
      stock: 2,
      category_id: 2,
      is_deleted: false,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      name: 'Keripik',
      stock: 2,
      category_id: 1,
      is_deleted: false,
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
