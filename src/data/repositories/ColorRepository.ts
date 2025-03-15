import axios from 'axios';
import { Color } from '../../core/entities/Color.ts';
import { IColorRepository } from '../../core/interfaces/IColorRepository';

export class ColorRepository implements IColorRepository {
  private API_URL = 'https://67d58c4e286fdac89bbfa7ca.mockapi.io/colors';

  async getColors(): Promise<Color[]> {
    const response = await axios.get<Color[]>(this.API_URL);
    return response.data;
  }

  async getColorsByName(name: string): Promise<Color[]> {
    const response = await axios.get<Color[]>(`${this.API_URL}?name=${name}`);
    return response.data;
  }

  async addColor(color: Color): Promise<void> {
    await axios.post(this.API_URL, color);
  }

  async deleteColor(id: string): Promise<void> {
    await axios.delete(`${this.API_URL}/${id}`);
  }
}
