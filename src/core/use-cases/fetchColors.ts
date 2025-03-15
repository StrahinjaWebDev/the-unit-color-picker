import { IColorRepository } from '../interfaces/IColorRepository';
import { Color } from '../entities/Color.ts';

export class FetchColors {
  constructor(private repository: IColorRepository) {}

  async execute(): Promise<Color[]> {
    return await this.repository.getColors();
  }
}
