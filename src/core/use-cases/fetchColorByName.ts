import { IColorRepository } from '../interfaces/IColorRepository.ts';
import { Color } from '../entities/Color.ts';

export class FetchColorsByName {
  constructor(private repository: IColorRepository) {}

  async execute(name: string): Promise<Color[]> {
    return await this.repository.getColorsByName(name);
  }
}
