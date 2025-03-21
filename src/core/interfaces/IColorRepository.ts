import { Color } from '../entities/Color.ts';

export interface IColorRepository {
  getColors(): Promise<Color[]>;

  getColorsByName(name: string): Promise<Color[]>;

  addColor(color: Color): Promise<void>;

  deleteColor(id: string): Promise<void>;
}
