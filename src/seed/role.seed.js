"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const permission_entity_1 = require("../entity/permission.entity");
const role_entity_1 = require("../entity/role.entity");
const seeder_config_1 = __importDefault(require("../config/seeder.config"));
seeder_config_1.default.initialize().then(async () => {
    const permissionRepository = seeder_config_1.default.getRepository(permission_entity_1.Permission);
    const perms = ['view_users', 'edit_users', 'view_roles', 'edit_roles', 'view_articles', 'edit_articles', 'view_comments', 'edit_comments', 'view_categories', 'edit_categories'];
    let permissions = [];
    for (let i = 0; i < perms.length; i++) {
        permissions.push(await permissionRepository.save({
            nama: perms[i]
        }));
    }
    const roleRepository = seeder_config_1.default.getRepository(role_entity_1.Role);
    await roleRepository.save({
        nama: 'Admin',
        permissions
    });
    delete permissions[1];
    delete permissions[2];
    delete permissions[3];
    delete permissions[8];
    delete permissions[9];
    await roleRepository.save({
        nama: 'Editor',
        permissions
    });
    delete permissions[1];
    delete permissions[2];
    delete permissions[3];
    delete permissions[5];
    delete permissions[7];
    delete permissions[9];
    await roleRepository.save({
        nama: 'Viewer',
        permissions
    });
    console.log('Seeding complete!');
    process.exit(0);
}).catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
