import { fakerID_ID as faker } from "@faker-js/faker";
import { User } from '../entity/user.entity';
import seederSource from '../config/seeder.config';
import logger from '../config/logger.config';
import * as argon2 from 'argon2';

seederSource.initialize().then(async () => {

    const password = await argon2.hash("123123");

    let addCount = 1;
    for (let i = 0; i < 15; i++) {
        const roleId = (i % 3) + 1; // This will cycle through 1, 2, 3

        await seederSource.getRepository(User).save({
            namaLengkap: `test${addCount}`,
            username: `test${addCount}`,
            email: `test${addCount}@mail.com`,
            password,
            is_verified: true,
            role_id: roleId
        });
    }

    logger.info("🌱 Seeding has been completed");
    process.exit(0);
}).catch((err) => {
    logger.error(err);
});
