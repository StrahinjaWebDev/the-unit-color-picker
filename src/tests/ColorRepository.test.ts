import axios from 'axios';
import { ColorRepository } from '../data/repositories/ColorRepository.ts';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ColorRepository', () => {
  it('should fetch colors', async () => {
    const mockResponse = [
      { id: '1', name: 'Red', hex: '#ff0000' },
      { id: '2', name: 'Green', hex: '#00ff00' },
    ];

    mockedAxios.get.mockResolvedValue({ data: mockResponse });

    const repository = new ColorRepository();
    const colors = await repository.getColors();

    expect(colors).toEqual(mockResponse);
  });

  it('should add a color', async () => {
    const newColor = { id: '3', name: 'Blue', hex: '#0000ff' };
    mockedAxios.post.mockResolvedValue({ data: newColor });

    const repository = new ColorRepository();
    await repository.addColor(newColor);

    expect(mockedAxios.post).toHaveBeenCalledWith(expect.any(String), newColor);
  });

  it('should delete a color', async () => {
    const colorId = '1';
    mockedAxios.delete.mockResolvedValue({});

    const repository = new ColorRepository();
    await repository.deleteColor(colorId);

    expect(mockedAxios.delete).toHaveBeenCalledWith(expect.any(String));
  });
});
