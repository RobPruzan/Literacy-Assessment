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

// export type InterpretableOutput = {
//   original: string;
//   interpretation: (string | number)[];
// };

// export type DiversityOutput = {
//   heatmap: InterpretableOutput[];
//   diversity_score: number;
// };
// shape is array of objects
// first object contains interpreation which is an array of strings and numbers and "original" which holds a string
// second object contains "diversity_score" which holds a number

export type InterpretableOutput = {
  interpretation: [string, number][];
  original: string;
};

export type DiversityOutput = {
  diversity_score: number;
};

export type WindowDifficultyOutput = InterpretableOutput & {
  shaded_areas: [number, number][];
  raw_scores: number[];
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

  public async calculateDiversityScore(
    excerpt: string
  ): Promise<[InterpretableOutput, DiversityOutput]> {
    const response = await axios.post(`${this.baseUrl}/api/diversity`, {
      excerpt,
    });
    console.log('response diversity', response.data);
    return response.data;
  }
  public async calculateDifficultyScore(excerpt: string): Promise<number> {
    const response = await axios.post(`${this.baseUrl}/api/difficulty`, {
      excerpt,
    });
    return response.data;
  }
  public async calculateWindowDifficultyScore(
    excerpt: string
  ): Promise<WindowDifficultyOutput> {
    const response = await axios.post(`${this.baseUrl}/api/window_difficulty`, {
      excerpt,
    });
    return response.data;
  }

  public async compareExcerpts(excerpts: ExcerptInfo[]): Promise<any> {
    const response = await axios.post(`${this.baseUrl}/api/compare`, {
      excerpts,
    });
    return response.data;
  }
}

const NorthStar = new NorthStarApi();
export default NorthStar;
