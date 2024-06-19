export function palindrome(str: string) {
  const re = /[\W_]/g
  const lowRegStr = str.toLowerCase().replace(re, '')
  const reverseStr = lowRegStr.split('').reverse().join('')
  return reverseStr === lowRegStr
}
