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
    console.log(
      'response data',
      response.data,
      'background: #222; color: #bada55'
    );
    return response.data;
  }

  public async getCategories(): Promise<Category[]> {
    const response = await axios.get(`${this.baseUrl}/api/categories`);
    console.log('does it break before this', response.data);
    return response.data;
  }

  public async getExcerptsInfoByCategory(
    category_id: number
  ): Promise<ExcerptInfo[]> {
    console.log('what should be here', category_id);
    if (!category_id) {
      console.log('what the fuck', category_id);
    }
    const response = await axios.get(
      `${this.baseUrl}/api/excerpts/${category_id}`
    );
    return response.data;
  }
}

const NorthStar = new NorthStarApi();
export default NorthStar;
