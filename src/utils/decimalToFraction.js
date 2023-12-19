const getFraction = decimal => {
  console.log(decimal)
  const fractions = [
    { numerator: 1, denominator: 2 },
    { numerator: 1, denominator: 4 },
    { numerator: 1, denominator: 3 },
    { numerator: 3, denominator: 4 },
    { numerator: 2, denominator: 3 },
  ]

  let closestFraction = fractions[0]
  let smallestDifference = Math.abs(
    decimal - closestFraction.numerator / closestFraction.denominator
  )

  for (let i = 1; i < fractions.length; i++) {
    const difference = Math.abs(
      decimal - fractions[i].numerator / fractions[i].denominator
    )
    if (difference < smallestDifference) {
      smallestDifference = difference
      closestFraction = fractions[i]
    }
  }

  const result = `${closestFraction.numerator}/${closestFraction.denominator}`
  return result
}

const decimalToFraction = amount => {
  const float = parseFloat(amount)
  if (isNaN(float)) {
    return amount
  }
  const wholeNumber = Math.floor(float)
  const decimal = float - wholeNumber
  if (decimal === 0) {
    return wholeNumber
  }
  if (decimal > 0.9) {
    return wholeNumber + 1
  }
  const fraction = getFraction(decimal)
  const result = `${wholeNumber !== 0 ? wholeNumber + ' ' : ''}${fraction}`
  return result
}

export default decimalToFraction
