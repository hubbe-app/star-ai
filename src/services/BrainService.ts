import { Questrial } from "next/font/google";
import { getEnviromentVariable } from "../helpers/enviroment";

const BASE_URL = `https://api.star-ai.app`;

export interface BrainQuery {
  Answer: string
  Prompt: string
  Sources: string[][]
}

export async function getBrainQuery(query: string): Promise<BrainQuery> {
  const form = new FormData();
  form.append("user_prompt", query);
  const options = {
    method: "POST",
    body: form,
    timeout: 50000
  };
  console.log(`${BASE_URL}/api/prompt_route`)
  const response = await fetch(`${BASE_URL}/api/prompt_route`, options);
  const data = await response.json();
  console.log(data);
  return data;
  // if (query.toLowerCase() == 'what are the initial requirements for the selection'){
  //   const brainQuery: BrainQuery = {
  //     Answer: 'The initial requirements for the selection of astronauts include medical screening, testing, and certification as outlined in the NASA Crewmember Medical Standards, Volume I and JSC 27384, Procedure Manual for the NASA Psychological Services Group. These standards are maintained and updated on a periodic basis through formal review involving the JSC Aerospace Medical Board (AMB) and NASA Medical Policy Board (MPB).',
  //     Prompt: '',
  //     Sources: [
  //       [
  //         "nasa-std-3001_vol1.pdf",
  //         "20 of 68\n\nNASA-STD-3001, Volume 1\n\n4.3.1 Initial Selection Requirements\n\na. The NASA Medical Standards for Crewmembers includes initial selection criteria\n\napproved by the Chair, Medical Policy Board (MPB). The initial medical screening, testing, and certification required for astronaut selection shall be conducted by the JSC Flight Medicine Clinic (FMC) and Aerospace Medical Board (AMB), as outlined in the NASA Crewmember Medical Standards, Volume I and JSC 27384, Procedure Manual for the NASA Psychological Services Group.\n\nb. Medical standards and procedures for this process shall be maintained and updated on a periodic basis through formal review involving the JSC AMB and NASA MPB. Selection and waiver criteria differ for the different types of missions (long duration versus short).\n\n4.3.2 Medical Certification and Evaluation\n\n4.3.2.1 Annual Evaluations\n\na. Crewmember certification medical examinations shall be performed annually by the\n\nJSC FMC."
  //       ],
  //       [
  //         "nasa-std-3001_vol1.pdf",
  //         "flight. The standards described in this document include levels of care, permissible exposure limits, fitness- for-duty criteria, and permissible outcome limits as a means of defining successful operating criteria for the human system. These standards help ensure mission completion, limit morbidity, and reduce the risk of mortality during space flight missions. See Appendix A for an overview document map."
  //       ]
  //     ]
  //   }
  //   return brainQuery
  // }
  // else {
  //   const brainQuery: BrainQuery = {
  //     Answer: 'The NASA Space Flight Human System Standard (NASA-STD-3001) is a technical standard that provides guidance for the design and operation of spacecraft systems that involve human health. It considers human physiologic parameters as a system, similar to how one views engineering and design components of a mechanical device. This approach allows for the human system to be viewed as an integral part of the overall vehicle design process and mission reference design, treating it as one system alongside other systems that work together to allow nominal operation of a spacecraft and successful completion of a mission. The standard is approved for public release and distribution is unlimited.',
  //     Prompt: '',
  //     Sources: [
  //       [
  //         "nasa-std-3001_vol1.pdf",
  //         "APPROVED FOR PUBLIC RELEASE – DISTRIBUTION IS UNLIMITED\n\n9 of 68\n\nNASA-STD-3001, Volume 1\n\n1.3 Overview\n\nThe Space Flight Human System Standard, Volume I: Crew Health considers human physiologic parameters as a system, much as one views the engineering and design of a mechanical device. Doing so allows the human system to be viewed as an integral part of the overall vehicle design process, as well as the mission reference design, treating the human system as one system along with the many other systems that work in concert to allow the nominal operation of a vehicle and successful completion of a mission."
  //       ],
  //       [
  //         "nasa-std-3001_vol1.pdf",
  //         "NASA TECHNICAL STANDARD\n\nNASA-STD-3001\n\nNational Aeronautics and Space Administration Washington, D.C. 20546-0001\n\nApproved: 03-05-2007 Expiration Date: 03-05-2012 Superseding NASA-STD-3000, Vol. 1, Chapter 7 and JSC 26882, Space Flight Health Requirements Document\n\nNASA SPACE FLIGHT HUMAN SYSTEM STANDARD\n\nVOLUME 1: CREW HEALTH\n\nMEASUREMENT SYSTEM IDENTIFICATION: NONE\n\nAPPROVED FOR PUBLIC RELEASE – DISTRIBUTION IS UNLIMITED\n\nNASA-STD-3001, Volume 1\n\nDOCUMENT HISTORY LOG\n\nStatus\n\nDocument Revision\n\nApproval Date\n\nDescription\n\nBaseline\n\n03-05-2007\n\nInitial Release\n\nAPPROVED FOR PUBLIC RELEASE – DISTRIBUTION IS UNLIMITED\n\n2 of 68\n\nNASA-STD-3001, Volume 1\n\nFOREWORD"
  //       ]
  //     ]
  //   }
  //   return brainQuery
  // }
}
