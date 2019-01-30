
exports.up = function(knex, Promise) {
  return knex.schema.createTable('patients', table => {
    table.increments();
    table.text('patientuid').notNullable();
    table.text('patientmedicalrecordno');
    table.text('name');
    table.text('dob');
    table.text('healthplan');
    table.text('provider');
    table.text('usergroup');
    // table.text('usergroup').references('usergroup.id').unsigned().onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('patients');
};