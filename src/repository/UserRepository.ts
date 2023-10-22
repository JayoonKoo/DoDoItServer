import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

const userRepository = AppDataSource.getRepository(User);

export default userRepository;
