export default function playgroundModel() {
  const calPowerOfMath: API.RequestModel = {
    endpoint: `https://boza7gp0r1.execute-api.us-east-1.amazonaws.com/dev`,
    method: "POST",
    payload: {
      base: null!,
      exponent: null!,
    },
  };

  return { calPowerOfMath };
}
