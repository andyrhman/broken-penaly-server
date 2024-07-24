import seederSource from '../config/seeder.config';
import logger from '../config/logger.config';
import { Tag } from "../entity/tag.entity";

seederSource.initialize().then(async () => {

    const tagNames = [
        'Kesehatan', 'Produktivitas', 'Marketing', 'Artificial Intelligence', 'Programming', 'Gaming', 'Data Science', 'Edukasi', 'Religion', 'Ekonomi', 'Marketing', 'Travel'
    ];
    
    for (let i = 0; i < 12; i++) {
        await seederSource.getRepository(Tag).save({
            nama: tagNames[i]
        });
    }

    logger.info("🌱 Seeding has been completed");
    process.exit(0);
}).catch((err) => {
    logger.error(err);
});
