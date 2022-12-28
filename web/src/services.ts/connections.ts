import axios from 'axios';

export type ExcerptInfo = {
  id: number;
  excerpt: Exerpt;
  title: string;
  difficulty: number;
  diversity: number;
  topic: string;
  region: string;
  source: string;
};

export type Exerpt = {
  id: number;
  source: string;
  title: string;
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
}

const NorthStar = new NorthStarApi();
export default NorthStar;
