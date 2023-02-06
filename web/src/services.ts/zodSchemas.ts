import { z } from 'zod';

export const collectionSchema = z.object({
  id: z.number(),
  title: z.string(),
  difficulty: z.number(),
  total_excerpts: z.number(),
  excerpt_ids: z.array(z.number()),
});

export const excerptSchema = z.object({
  id: z.number(),
  title: z.string(),
  collection: collectionSchema,
});

export const excerptInfoSchema = z.object({
  id: z.number(),
  excerpt: excerptSchema,
  difficulty: z.number().optional(),
  diversity: z.number().optional(),
  text_length: z.number(),
  region: z.string().optional(),
  source: z.string().optional(),
});

export const excerptCreateSchema = z.object({
  text: z.string(),
  title: z.string(),
  source_user: z.number().nullable(),
});

export const collectionCreateInfoSchema = z.object({
  collection: z.array(excerptCreateSchema),
  title: z.string(),
});

export const inputCollectionCreateSchema = z.object({
  collectionInfo: excerptCreateSchema,
  collectionTitle: z.string(),
});

export const difficultyCalculationSchema = z.array(z.number()).nullable();

export const grammarCalculationSchema = z.array(z.number()).nullable();

export const gradesSchema = z.object({
  Kincaid: z.number(),
  ARI: z.number(),
  'Coleman-Liau': z.number(),
  FleschReadingEase: z.number(),
  GunningFogIndex: z.number(),
  LIX: z.number(),
  RIX: z.number(),
  SMOGIndex: z.number(),
});

export const beginningsSchema = z.object({
  article: z.number(),
  conjunction: z.number(),
  interrogative: z.number(),
  preposition: z.number(),
  pronoun: z.number(),
  subordination: z.number(),
});

export const sentenceInfoSchema = z.object({
  characters: z.number(),
  characters_per_word: z.number(),
  complex_words: z.number(),
  long_words: z.number(),
  paragraphs: z.number(),
  sentences: z.number(),
  sentences_per_paragraph: z.number(),
  syll_per_word: z.number(),
  syllables: z.number(),
  type_token_ratio: z.number(),
  words: z.number(),
  words_per_sentence: z.number(),
  wordtypes: z.number(),
});

export const wordUsageSchema = z.object({
  tobeverb: z.number(),
  auxverb: z.number(),
  conjunction: z.number(),
  pronoun: z.number(),
  preposition: z.number(),
});

export const readabilityMeasuresSchema = z.object({
  'readability grades': gradesSchema,
  'sentence beginnings': beginningsSchema,
  'sentence info': sentenceInfoSchema,
  'word usage': wordUsageSchema,
});

export const readabilityMeasuresCalculationSchema = z.union([
  readabilityMeasuresSchema,
  z.null(),
]);

export const interpretableOutputSchema = z.object({
  interpretation: z.array(z.tuple([z.string(), z.number()])),
  original: z.string(),
});
export const diversityOriginalSchema = z.object({
  original: z.string(),
});
export const diversityScoreSchema = z.object({
  diversity_score: z.number(),
});
export const diversityOutputSchema = z.tuple([
  diversityOriginalSchema,
  diversityScoreSchema,
]);

export const diversityCalculationSchema = z.union([
  z.array(z.tuple([interpretableOutputSchema, diversityOutputSchema])),
  z.null(),
]);

export const ReadabilityMeasuresCalculation = z.union([
  z.array(readabilityMeasuresSchema),
  z.null(),
]);

export const windowDifficultyOutputSchema = interpretableOutputSchema.extend({
  shaded_areas: z.array(z.tuple([z.number(), z.number()])),
  raw_scores: z.array(z.number()),
});
