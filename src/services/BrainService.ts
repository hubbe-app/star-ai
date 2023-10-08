import { Questrial } from "next/font/google";
import { getEnviromentVariable } from "../helpers/enviroment";

const BASE_URL = `${getEnviromentVariable("API_URL")}`;

export interface BrainQuery {
  Answer: string
  Prompt: string
  Sources: string[][]
}

export async function getBrainQuery(query: string): Promise<BrainQuery> {
  // const response = await fetch(
  //   `${BASE_URL}/retrieve?query=${query}&collection_name=nasa`
  // );
  // const data = await response.json();
  // return data;
  const brainQuery: BrainQuery = {
    Answer: 'The NASA Space Flight Human System Standard (NASA-STD-3001) is a technical standard that provides guidance for the design and operation of spacecraft systems that involve human health. It considers human physiologic parameters as a system, similar to how one views engineering and design components of a mechanical device. This approach allows for the human system to be viewed as an integral part of the overall vehicle design process and mission reference design, treating it as one system alongside other systems that work together to allow nominal operation of a spacecraft and successful completion of a mission. The standard is approved for public release and distribution is unlimited.',
    Prompt: '',
    Sources: []
  }

  return brainQuery
}
