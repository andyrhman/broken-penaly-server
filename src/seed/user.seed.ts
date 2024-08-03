import { fakerID_ID as faker } from "@faker-js/faker";
import { User } from '../entity/user.entity';
import seederSource from "../config/seeder.config";
import logger from '../config/logger.config';
import * as argon2 from 'argon2';

seederSource.initialize().then(async () => {

    const password = await argon2.hash("123123");

    for (let i = 0; i < 30; i++) {
        await seederSource.getRepository(User).save({
            namaLengkap: faker.person.fullName(),
            username: faker.internet.userName().toLowerCase(),
            email: faker.internet.email().toLowerCase(),
            password,
            role_id: 3
        });
    }

    logger.info("🌱 Seeding has been completed");
    process.exit(0);
}).catch((err) => {
    logger.error(err);
});
