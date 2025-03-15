import { IColorRepository } from '../interfaces/IColorRepository';

export class DeleteColor {
  constructor(private repository: IColorRepository) {}

  async execute(id: string): Promise<void> {
    await this.repository.deleteColor(id);
  }
}
