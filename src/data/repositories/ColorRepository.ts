import axios from 'axios';
import { Color } from '../../core/entities/Color.ts';
import { IColorRepository } from '../../core/interfaces/IColorRepository';
import { ENV } from '../../core/config/env.ts';

export class ColorRepository implements IColorRepository {
  private mockApiColorsUrl = `${ENV.VITE_MOCK_API_URL}/colors`;

  async getColors(): Promise<Color[]> {
    const response = await axios.get<Color[]>(this.mockApiColorsUrl);
    return response.data;
  }

  async getColorsByName(name: string): Promise<Color[]> {
    const response = await axios.get<Color[]>(
      `${this.mockApiColorsUrl}?name=${name}`,
    );
    return response.data;
  }

  async addColor(color: Color): Promise<void> {
    await axios.post(this.mockApiColorsUrl, color);
  }

  async deleteColor(id: string): Promise<void> {
    await axios.delete(`${this.mockApiColorsUrl}/${id}`);
  }
}
