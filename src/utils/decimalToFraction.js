const getFraction = (decimal) => {
  const tolerance = 1.0E-2
  let numerator = 1
  let denominator = 1
  let error = decimal - numerator / denominator
  while (Math.abs(error) > tolerance) {
    if (error < 0) {
      denominator++
    } else {
      numerator++
    }
    error = decimal - numerator / denominator
  }
  const result = `${numerator}/${denominator}`
  return result
}

const decimalToFraction = (amount) => {
  const float = parseFloat(amount)
  if (isNaN(float)) {
    return amount
  }
  const wholeNumber = Math.floor(float)
  const decimal = float - wholeNumber
  if (decimal === 0) {
    return wholeNumber
  }
  const fraction = getFraction(decimal)
  const result = `${wholeNumber !== 0 ? wholeNumber + ' ' : ''}${fraction}`
  return result
}

export default decimalToFraction;