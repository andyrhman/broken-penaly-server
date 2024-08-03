"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionMiddleware = void 0;
const PermissionMiddleware = (access) => {
    return (req, res, next) => {
        const user = req['user'];
        const permissions = user.role.permissions;
        if (req.method === 'GET') {
            if (!permissions.some(p => (p.nama === `view_${access}`) || (p.nama === `edit_${access}`))) {
                return res.status(403).send({
                    message: 'Akses Tidak Diizinkan'
                });
            }
        }
        else {
            if (!permissions.some(p => p.nama === `edit_${access}`)) {
                return res.status(403).send({
                    message: 'Akses Tidak Diizinkan'
                });
            }
        }
        next();
    };
};
exports.PermissionMiddleware = PermissionMiddleware;
