const splitByDoubleColon = (inputString: string) => {
  return inputString?.split("::") || inputString;
};

const getAlwaysLeftSide = (inputString: string) => {
  return splitByDoubleColon(inputString)[0];
};

const getGender = (gender: number) => (gender === 1 ? "male" : "female");

export { splitByDoubleColon, getAlwaysLeftSide, getGender };
