"use server";
import axios from "axios";

export async function createSubmission(code:string,language_id:number,testCase1:string,output1:string,testCase2:string,output2:string,testCase3:string,output3:string){
console.log(code,language_id,testCase1,output1,testCase2,output2,testCase3,output3);

    const options = {
        method: "POST",
        url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
        params: {
          base64_encoded: "true",
        },
        headers: {
          "x-rapidapi-key": process.env.RAPID_DSA_API_KEY,
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        data: {
          submissions: [
            {
              language_id: language_id,
              source_code: btoa(code),
              stdin: btoa(testCase1),
              expected_output: btoa(output1),
            },
            {
              language_id: language_id,
              source_code: btoa(code),
              stdin: btoa(testCase2),
              expected_output: btoa(output2),
            },
            {
              language_id: language_id,
              source_code: btoa(code),
              stdin: btoa(testCase3),
              expected_output: btoa(output3),
            },
          ],
        },
      };
    
      try {
        const response = await axios.request(options);
        const data = await response.data;
    
        await new Promise((resolve) => setTimeout(resolve, 1000));
        let submissionsData = await getBachedSubmission(
          data[0].token,
          data[1].token,
          data[2].token
        );
        submissionsData = submissionsData.submissions;
    
        while (
          submissionsData[0].status_id == 1 ||
          submissionsData[0].status_id == 2 ||
          submissionsData[1].status_id == 1 ||
          submissionsData[1].status_id == 2 ||
          submissionsData[2].status_id == 1 ||
          submissionsData[2].status_id == 2
        ) {
          const newSubmissionsData = await getBachedSubmission(
            data[0].token,
            data[1].token,
            data[2].token
          );
          submissionsData = newSubmissionsData.submissions;
        }
    
    
        if (
          submissionsData[0].status_id == 3 &&
          submissionsData[1].status_id == 3 &&
          submissionsData[2].status_id == 3
        ) {
          const a = submissionsData[0].status.description;
          const b = submissionsData[0].status.description;
          const c = submissionsData[0].status.description;
    
          if (a === "Accepted" && b === "Accepted" && c === "Accepted") {
            return {
              status:"Accepted",
              data:submissionsData
            }
          } else {
            return {
              status:"Failed",
            }
          }
        } else {
          return {
            status:"An error occured",
          }
        }
    
        // return data;
      } catch (error) {
        console.error(error);
      }
}

async function getBachedSubmission(
    token1: string,
    token2: string,
    token3: string
  ) {
    const options = {
      method: "GET",
      url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
      params: {
        tokens: `${token1},${token2},${token3}`,
        base64_encoded: "true",
        fields: "*",
      },
      headers: {
        "x-rapidapi-key":process.env.RAPID_DSA_API_KEY,
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      },
    };
  
    try {
      const response = await axios.request(options);
      const data = await response.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  }


