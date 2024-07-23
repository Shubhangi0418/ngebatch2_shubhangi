const options: Intl.DateTimeFormatOptions =
{
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
}

export const timestampText = () => {
  return timestampTextRaw(new Date())
}

export const timestampTextRaw = (aDate: Date) => {
  return aDate.toLocaleString('en-GB', options)
}

// We want all specified keys on the object to be a string or a number
export const checkKeys = (keyList: Array<string>, checkObject: {[key: string] : string | number}) => {
  return keyList.every(key =>
    (
      (checkObject[key] && typeof checkObject[key] === 'string'))
    || (!isNaN(Number.parseInt(`${  checkObject[key]}`))
    )
  )
}
