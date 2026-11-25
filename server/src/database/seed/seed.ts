import { User } from '../../users/entities/user.entity.js';
import { EProgram } from '../../users/enum/program.enum.js';
import { UserRole } from '../../users/enum/user-role.enum.js';
import { AppDataSource } from '../config/orm.config.js';

import * as bcrypt from 'bcryptjs';


const normalUsers = [
  'john', 'alex', 'michael', 'sarah', 'emma',
  'olivia', 'david', 'james', 'william', 'sophia',
  'isabella', 'charlotte', 'daniel', 'matthew', 'ethan',
  'lucas', 'amelia', 'mia', 'harper', 'evelyn',
  'benjamin', 'henry', 'jack', 'logan', 'ella',
  'grace', 'lily'
].map((username, index) => ({
  username,
  card_id : 100 + index,
  program : index % 2 === 1 ? EProgram.BTECH : EProgram.MTECH,
  email: `${username}@uni.edu.in`,
}));

async function seed() {
  await AppDataSource.initialize();

  try {
    const userRepository = AppDataSource.getRepository(User);

    const hashedPassword = await bcrypt.hash('User@123', 10);

    const users = [

      ...normalUsers.map((user) => ({
        ...user,
        role: UserRole.STUDENT,
      })),
    ];

    for (const userData of users) {
      const existingUser = await userRepository.findOne({
        where: { email: userData.email },
      });

      if (existingUser) {
        console.log(`${userData.email} already exists`);
        continue;
      }

      const user = userRepository.create({
        ...userData,
        hashed_password: hashedPassword,
      });

      await userRepository.save(user);
      console.log(`Created: ${userData.username}`);
    }

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Seeding failed:', error);
    throw error;
  } finally {
    await AppDataSource.destroy();
  }
}

seed().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});