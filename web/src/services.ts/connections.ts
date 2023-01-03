import axios from 'axios';
import { Data } from '../components/Chart/Chart';

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
export type CalculationStats = {
  difficulty: number | null;
  diversity: DiversityOutput | null;
  grammar: number | null;
  plot_data: Data | null;
  readability_measures: ReadabilityMeasures | null;
  sliding_window_stats: WindowDifficultyOutput | null;
};

export type ReadabilityMeasures = {
  ['readability grades']: Grades;
  ['sentence beginnings']: Beginnings;
  ['sentence info']: SentenceInfo;
  ['word usage']: WordUsage;
};

export type Grades = {
  Kincaid: number;
  ARI: number;
  ['Coleman-Liau']: number;
  FleschReadingEase: number;
  GunningFogIndex: number;
  LIX: number;
  RIX: number;
  SMOGIndex: number;
};

export type Beginnings = {
  article: number;
  conjunction: number;
  interrogative: number;
  preposition: number;
  pronoun: number;
  subordination: number;
};

export type SentenceInfo = {
  characters: number;
  characters_per_word: number;
  complex_words: number;
  long_words: number;
  paragraphs: number;
  sentences: number;
  sentences_per_paragraph: number;
  syll_per_word: number;
  syllables: number;
  type_token_ratio: number;
  words: number;
  words_per_sentence: number;
  wordtypes: number;
};

export type WordUsage = {
  tobeverb: number;
  auxverb: number;
  conjunction: number;
  pronoun: number;
  preposition: number;
};

export type InterpretableOutput = {
  interpretation: [string, number][];
  original: string;
};

export type DiversityOutput = {
  original: string;
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

  public async compareExcerpts(
    excerpts: ExcerptInfo[]
  ): Promise<CalculationStats[]> {
    const response = await axios.post(`${this.baseUrl}/api/compare`, {
      excerpts,
    });
    return response.data;
  }
}

const NorthStar = new NorthStarApi();
export default NorthStar;
