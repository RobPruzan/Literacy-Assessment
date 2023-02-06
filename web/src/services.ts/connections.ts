import axios from 'axios';
import { z } from 'zod';
import {
  collectionSchema,
  excerptSchema,
  excerptInfoSchema,
  excerptCreateSchema,
  collectionCreateInfoSchema,
  inputCollectionCreateSchema,
  difficultyCalculationSchema,
  grammarCalculationSchema,
  gradesSchema,
  beginningsSchema,
  sentenceInfoSchema,
  wordUsageSchema,
  readabilityMeasuresSchema,
  diversityOriginalSchema,
  diversityScoreSchema,
  interpretableOutputSchema,
  diversityOutputSchema,
  windowDifficultyOutputSchema,
  diversityCalculationSchema,
  ReadabilityMeasuresCalculation,
} from './zodSchemas';

export type Collection = z.infer<typeof collectionSchema>;

export type Excerpt = z.infer<typeof excerptSchema>;

export type ExcerptInfo = z.infer<typeof excerptInfoSchema>;

// export type ExcerptCreate = {
//   text: string;
//   title: string;
//   source_user: number | null;
// };

export type ExcerptCreate = z.infer<typeof excerptCreateSchema>;

// export type CollectionCreateInfo = {
//   collection: ExcerptCreate[];
//   title: string;
// };

export type CollectionCreateInfo = z.infer<typeof collectionCreateInfoSchema>;

// export type InputCollectionCreate = {
//   collectionInfo: ExcerptCreate;
//   collectionTitle: string;
// };

export type InputCollectionCreate = z.infer<typeof inputCollectionCreateSchema>;

// export type DifficultyCalculation = number[] | null;

export type DifficultyCalculation = z.infer<typeof difficultyCalculationSchema>;

// export type GrammarCalculation = number[] | null;

export type GrammarCalculation = z.infer<typeof grammarCalculationSchema>;

// export type ReadabilityMeasuresCalculation = ReadabilityMeasures[] | null;

export type ReadabilityMeasuresCalculation = z.infer<
  typeof ReadabilityMeasuresCalculation
>;

export type SlidingWindowStatsCalculation = WindowDifficultyOutput[] | null;

export type CalculationStats = {
  difficulty: DifficultyCalculation;
  diversity: DiversityCalculation;
  grammar: GrammarCalculation;
  readability_measures: ReadabilityMeasuresCalculation;
  sliding_window_stats: SlidingWindowStatsCalculation;
};

// export type ReadabilityMeasures = {
//   ['readability grades']: Grades;
//   ['sentence beginnings']: Beginnings;
//   ['sentence info']: SentenceInfo;
//   ['word usage']: WordUsage;
// };

// export type Grades = {
//   Kincaid: number;
//   ARI: number;
//   ['Coleman-Liau']: number;
//   FleschReadingEase: number;
//   GunningFogIndex: number;
//   LIX: number;
//   RIX: number;
//   SMOGIndex: number;
// };

export type Grades = z.infer<typeof gradesSchema>;

// export type Beginnings = {
//   article: number;
//   conjunction: number;
//   interrogative: number;
//   preposition: number;
//   pronoun: number;
//   subordination: number;
// };

export type Beginnings = z.infer<typeof beginningsSchema>;

// export type SentenceInfo = {
//   characters: number;
//   characters_per_word: number;
//   complex_words: number;
//   long_words: number;
//   paragraphs: number;
//   sentences: number;
//   sentences_per_paragraph: number;
//   syll_per_word: number;
//   syllables: number;
//   type_token_ratio: number;
//   words: number;
//   words_per_sentence: number;
//   wordtypes: number;
// };

export type SentenceInfo = z.infer<typeof sentenceInfoSchema>;

// export type WordUsage = {
//   tobeverb: number;
//   auxverb: number;
//   conjunction: number;
//   pronoun: number;
//   preposition: number;
// };

export type WordUsage = z.infer<typeof wordUsageSchema>;

export type ReadabilityMeasures = z.infer<typeof readabilityMeasuresSchema>;
// export type InterpretableOutput = {
//   interpretation: [string, number][];
//   original: string;
// };

export type DiversityOriginal = z.infer<typeof diversityOriginalSchema>;

// export type DiversityScore = {
//   diversity_score: number;
// };

export type DiversityScore = z.infer<typeof diversityScoreSchema>;

export type InterpretableOutput = z.infer<typeof interpretableOutputSchema>;
// export type DiversityCalculation =
//   | [InterpretableOutput, DiversityOutput][]
//   | null;

export type DiversityOutput = z.infer<typeof diversityOutputSchema>;
export type DiversityCalculation = z.infer<typeof diversityCalculationSchema>;

// export type DiversityOriginal = {
//   original: string;
// };

// export type DiversityOutput = [DiversityOriginal, DiversityScore];

// export type WindowDifficultyOutput = InterpretableOutput & {
//   shaded_areas: [number, number][];
//   raw_scores: number[];
// };

export type WindowDifficultyOutput = z.infer<
  typeof windowDifficultyOutputSchema
>;

export class NorthStarApi {
  baseUrl?: string;

  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL;
  }

  public async getExcerptsLibrary(): Promise<ExcerptInfo[]> {
    const response = await axios.get(`${this.baseUrl}/api/excerpts_info`);

    return response.data;
  }

  public async getCollections(): Promise<Collection[]> {
    const response = await axios.get(`${this.baseUrl}/api/collections`);
    const arrayCollectionSchema = z.array(collectionSchema);
    const collections = arrayCollectionSchema.safeParse(response.data);
    console.log('zod collections result', collections);
    return collections.success ? collections.data : [];
  }

  public async getExcerptsInfoByCollection(
    collectionId: number
  ): Promise<ExcerptInfo[]> {
    const response = await axios.get(
      `${this.baseUrl}/api/excerpts/${collectionId}`
    );
    const arrayExcerptSchema = z.array(excerptInfoSchema);
    try {
      const excerpts = arrayExcerptSchema.parse(response.data);
      return excerpts;
    } catch (e) {
      console.error('zod error');
      console.error(e);
      console.error(response.data);
    }
    const excerpts = arrayExcerptSchema.parse(response.data);

    return excerpts;
  }
  // here
  public async getDiversityScore(
    excerptIds: number[]
  ): Promise<[InterpretableOutput, DiversityOutput][]> {
    const response = await axios.post(`${this.baseUrl}/api/diversity`, {
      excerpt_ids: excerptIds,
    });
    return response.data;
  }
  public async getDifficultyScore(excerptIds: number[]): Promise<number[]> {
    const response = await axios.post(`${this.baseUrl}/api/difficulty`, {
      excerpt_ids: excerptIds,
    });
    return response.data;
  }
  public async getWindowDifficultyScore(
    excerptIds: number[]
  ): Promise<WindowDifficultyOutput[]> {
    const response = await axios.post(`${this.baseUrl}/api/window_difficulty`, {
      excerpt_ids: excerptIds,
    });
    return response.data;
  }

  public async getGrammarScore(excerptIds: number[]): Promise<number[]> {
    const response = await axios.post(`${this.baseUrl}/api/grammar`, {
      excerpt_ids: excerptIds,
    });
    return response.data;
  }

  public async getReadabilityMeasures(
    excerptIds: number[]
  ): Promise<ReadabilityMeasures[]> {
    const response = await axios.post(`${this.baseUrl}/api/readability`, {
      excerpt_ids: excerptIds,
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
  // Not returning anything breaks onSuccess in react-query, it immediately fires the onSuccess callback
  public async createCollection(
    userId: number,
    collection: CollectionCreateInfo
  ) {
    return axios.post(`${this.baseUrl}/api/create_collection`, {
      user_id: userId,
      collection,
    });
  }

  public async getUserCollections(userId: number): Promise<Collection[]> {
    const response = await axios.get(
      `${this.baseUrl}/api/user_collections/${userId}`
    );
    const arrayCollectionSchema = z.array(collectionSchema);
    const collections = arrayCollectionSchema.parse(response.data);
    return collections;
  }
}

const NorthStar = new NorthStarApi();
export default NorthStar;
