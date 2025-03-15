import axios from 'axios';
import { ColorRepository } from '../data/repositories/ColorRepository.ts';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ColorRepository', () => {
  let repository: ColorRepository;
  const apiUrl = 'https://67d58c4e286fdac89bbfa7ca.mockapi.io/colors';

  beforeEach(() => {
    repository = new ColorRepository();
    jest.clearAllMocks();
  });

  it('should fetch colors', async () => {
    const mockResponse = [
      { id: '1', name: 'Red', hex: '#ff0000' },
      { id: '2', name: 'Green', hex: '#00ff00' },
    ];

    mockedAxios.get.mockResolvedValue({ data: mockResponse });

    const colors = await repository.getColors();

    expect(mockedAxios.get).toHaveBeenCalledWith(apiUrl);
    expect(colors).toEqual(mockResponse);
  });

  it('should fetch colors by name', async () => {
    const mockResponse = [{ id: '1', name: 'Red', hex: '#ff0000' }];
    const colorName = 'Red';

    mockedAxios.get.mockResolvedValue({ data: mockResponse });

    const colors = await repository.getColorsByName(colorName);

    expect(mockedAxios.get).toHaveBeenCalledWith(`${apiUrl}?name=${colorName}`);
    expect(colors).toEqual(mockResponse);
  });

  it('should add a color', async () => {
    const newColor = { id: '3', name: 'Blue', hex: '#0000ff' };
    mockedAxios.post.mockResolvedValue({ data: newColor });

    await repository.addColor(newColor);

    expect(mockedAxios.post).toHaveBeenCalledWith(apiUrl, newColor);
  });

  it('should delete a color', async () => {
    const colorId = '1';
    mockedAxios.delete.mockResolvedValue({});

    await repository.deleteColor(colorId);

    expect(mockedAxios.delete).toHaveBeenCalledWith(`${apiUrl}/${colorId}`);
  });

  it('should handle errors when fetching colors', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network error'));

    await expect(repository.getColors()).rejects.toThrow('Network error');
  });

  it('should handle errors when fetching colors by name', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network error'));

    await expect(repository.getColorsByName('Red')).rejects.toThrow(
      'Network error',
    );
  });
});
