import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    user_id: string;
}

class ListAllUsersUseCase {
    constructor(private usersRepository: IUsersRepository) {}

    execute({ user_id }: IRequest): User[] {
        const user = this.usersRepository.findById(user_id);

        if (!user) {
            throw new Error(
                "Requisições de usuários só podem ser feitas por usuários validos"
            );
        }
        if (user.admin === false) {
            throw new Error(
                "Somente usuários admins podem requisitar a lista de todos os usuários"
            );
        }

        const listAllUsers = this.usersRepository.list();

        return listAllUsers;
    }
}

export { ListAllUsersUseCase };
