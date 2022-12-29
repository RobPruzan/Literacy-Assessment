import axios from 'axios';

export type ExcerptInfo = {
  id: number;
  excerpt: Exerpt;
  title: string;
  difficulty: number;
  diversity: number;
  category: Category;
  region: string;
  source: string;
};

export type Exerpt = {
  id: number;
  source: string;
  title: string;
};

export type Category = {
  id: number;
  title: string;
  difficulty: number;
  total_excerpts: number;
};

export class NorthStarApi {
  baseUrl?: string;

  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL;
  }

  public async getExcerptsLibrary(): Promise<ExcerptInfo[]> {
    const response = await axios.get(`${this.baseUrl}/api/excerpts_info`);

    return response.data;
  }

  public async getCategories(): Promise<Category[]> {
    const response = await axios.get(`${this.baseUrl}/api/categories`);

    return response.data;
  }

  public async getExcerptsInfoByCategory(
    category_id: number
  ): Promise<ExcerptInfo[]> {
    const response = await axios.get(
      `${this.baseUrl}/api/excerpts/${category_id}`
    );
    return response.data;
  }
}

const NorthStar = new NorthStarApi();
export default NorthStar;
