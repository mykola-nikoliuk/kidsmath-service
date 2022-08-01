import fs from 'fs';
import path from 'path';
import { SerializedExercise } from './types';

const usersPath = path.join(__dirname, '../../users');

if (!fs.existsSync(usersPath)) {
  fs.mkdirSync(usersPath, { recursive: true });
}

interface UserStorageData {
  exercise: SerializedExercise;
}

export class UserStorage {
  constructor(private userId: number) {

  }

  write(data: UserStorageData) {
    fs.writeFileSync(this.getFileNamePath(), JSON.stringify(data), 'utf-8');
  }

  read(): Partial<UserStorageData> {
    const filePath = this.getFileNamePath();
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as UserStorageData;
    } else {
      return {};
    }
  }

  private getFileNamePath(): string {
    return path.join(usersPath, `${this.userId.toString()}.json`);
  }
}
