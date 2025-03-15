import { IColorRepository } from '../interfaces/IColorRepository';
import { Color } from '../entities/Color.ts';

export class AddColor {
  constructor(private repository: IColorRepository) {}

  async execute(color: Color): Promise<void> {
    await this.repository.addColor(color);
  }
}
