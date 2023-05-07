import { UserDocument } from '../models/User';

class UserDto {
	login: string;
	id: string;

	constructor(model: UserDocument) {
		this.login = model.login;
		this.id = model._id.toString();
	}
}

export default UserDto;