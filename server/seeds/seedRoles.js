const Role = require("../models/role.model");

async function seedRoles() {
  const roles = [
    {
      name: "Admin",
      description: "Administrator",
    },
    {
      name: "User",
      description: "Regular user",
    },
  ];

  for (let role of roles) {
    const existingRole = await Role.findOne({ name: role.name });
    if (!existingRole) {
      await Role.create(role);
    }
  }
}

module.exports = seedRoles;