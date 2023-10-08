import { Questrial } from "next/font/google";
import { getEnviromentVariable } from "../helpers/enviroment";

const BASE_URL = `${getEnviromentVariable("API_URL")}`;

type BrainQuery = {
  query: string;
  result: string;
  source_documents: any[];
};

export async function getBrainQuery(query: string): Promise<BrainQuery> {
  // const response = await fetch(
  //   `${BASE_URL}/retrieve?query=${query}&collection_name=nasa`
  // );
  // const data = await response.json();
  // return data;
  const brainQuery: BrainQuery = {
    query: query,
    result: 'Leticia isso é um teste',
    source_documents: []
  }

  return brainQuery
}
