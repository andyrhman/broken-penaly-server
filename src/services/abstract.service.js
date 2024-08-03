"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractService = void 0;
class AbstractService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async all(relations = []) {
        return await this.repository.find({ relations });
    }
    async create(data) {
        return this.repository.save(data);
    }
    async update(id, data) {
        return this.repository.update(id, data);
    }
    async delete(id) {
        return this.repository.delete(id);
    }
    async findOne(options, relations = []) {
        return this.repository.findOne({ where: options, relations });
    }
    async total(options, relations = []) {
        const entities = await this.repository.find({ where: options, relations });
        return {
            total: entities.length
        };
    }
    async findByEmail(email) {
        return this.repository.findOne({ where: { email } });
    }
    async findByUsername(username) {
        return this.repository.findOne({ where: { username } });
    }
    async findByUsernameOrEmail(username, email) {
        return this.repository
            .createQueryBuilder('user')
            .where('user.username = :username', { username })
            .orWhere('user.email = :email', { email })
            .getOne();
    }
    // ? https://www.phind.com/search?cache=i2helomupthybetydx4fgtvt
    async paginate(options, page, take, relations = []) {
        const [data, total] = await this.repository.findAndCount({
            ...options,
            take,
            skip: (page - 1) * take,
            relations
        });
        return {
            data,
            meta: {
                total,
                page,
                last_page: Math.ceil(total / take),
            },
        };
    }
}
exports.AbstractService = AbstractService;
