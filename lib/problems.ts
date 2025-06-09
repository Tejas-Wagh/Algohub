
export const LANGUAGES_VERSIONS:Record<string,number> = {
  "cpp": 54,
  "java": 91,
};

export const LANGUAGES : string[] = Object.keys(LANGUAGES_VERSIONS);


export const testCases = {
  "twoSum":{
    testcase1 : "5 7",
    output1:"12",
    testcase2 : "15 2",
    output2:"17",
    testcase3 : "0 100",
    output3:"100"
  },
  "palindromeNumber":{
    testcase1 : "143",
    output1:"0",
    testcase2 : "121",
    output2:"1",
    testcase3 : "757",
    output3:"1"
  },
}