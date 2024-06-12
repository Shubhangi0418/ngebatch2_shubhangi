import {
  countFromEurope,
  getGreetings,
  isJSComing,
  getFirstPythonDeveloper,
  getAverageAge,
  getLanguageCounts,
  getOldest,
  isGlobalGroup
} from './higher-order-functions'


describe('countFromEurope', () => {
  it('should return the number of developers from europe', () => {
    
    const devs = [
      { 
        firstName: 'Alice', 
        lastName: 'string', 
        country: 'Amsterdam', 
        continent: 'Europe', 
        age: 32, 
        language: 'C++'
      },
      { 
        firstName: 'Alice', 
        lastName: 'string', 
        country: 'Amsterdam', 
        continent: 'Europe', 
        age: 32, 
        language: 'C++'
      },
      { 
        firstName: 'Bob', 
        lastName: 'string', 
        country: 'Australia', 
        continent: 'Oceania', 
        age: 46, 
        language: 'Python'
      },
    ]
    
    expect(countFromEurope(devs)).toEqual(2)
  })
  it('should return zero if there are no developers from europe', () => {
    const devs = [
      { 
        firstName: 'Bob', 
        lastName: 'string', 
        country: 'Australia', 
        continent: 'Oceania', 
        age: 46, 
        language: 'Python'
      },
      { 
        firstName: 'Bob', 
        lastName: 'string', 
        country: 'Australia', 
        continent: 'Oceania', 
        age: 46, 
        language: 'Python'
      },
    ]
    expect(countFromEurope(devs)).toEqual(0)
  })
  it('should return zero if passed an empty array', () => {
    expect(countFromEurope([])).toEqual(0)
  })
})

describe('getGreetings', () => {
  it('should return the right greetings', () => {
    const devs = [
      { 
        firstName: 'Alice', 
        lastName: 'string', 
        country: 'Amsterdam', 
        continent: 'Europe', 
        age: 32, 
        language: 'C++'
      },
      { 
        firstName: 'Bob', 
        lastName: 'string', 
        country: 'Australia', 
        continent: 'Oceania', 
        age: 46, 
        language: 'Python'
      }
    ]
    const exp = [
      'Hi Alice, what do you like the most about C++?',
      'Hi Bob, what do you like the most about Python?'
    ]
    expect(getGreetings(devs)).toEqual(exp)
  })
  it('should return an empty array when passed an empty array', () => {
    expect(getGreetings([])).toEqual([])
  })
})

describe('isJSComing', () => {
  it('should return false if a JS developer is not coming', () => {
    const devs = [
      { 
        firstName: 'Alice', 
        lastName: 'string', 
        country: 'Amsterdam', 
        continent: 'Europe', 
        age: 32, 
        language: 'C++'
      },
      { 
        firstName: 'Bob', 
        lastName: 'string', 
        country: 'Australia', 
        continent: 'Oceania', 
        age: 46, 
        language: 'Python'
      }    ]
    expect(isJSComing(devs)).toEqual(false)
  })
  it('should return true if a JS developer is coming', () => {
    const devs = [
      { 
        firstName: 'Alice', 
        lastName: 'string', 
        country: 'Amsterdam', 
        continent: 'Europe', 
        age: 32, 
        language: 'C++'
      },
      { 
        firstName: 'Bob', 
        lastName: 'string', 
        country: 'Australia', 
        continent: 'Oceania', 
        age: 46, 
        language: 'Javascript'
      }
    ]
    expect(isJSComing(devs)).toEqual(true)
  })
  it('should return false if an empty array is passed', () => {
    expect(isJSComing([])).toEqual(false)
  })
})

describe('getFirstPythonDeveloper', () => {
  it('should return the first python developer', () => {
    const devs = [
      { 
        firstName: 'Alice', 
        lastName: 'string', 
        country: 'Amsterdam', 
        continent: 'Europe', 
        age: 32, 
        language: 'C++'
      },
      { 
        firstName: 'Bob', 
        lastName: 'string', 
        country: 'Australia', 
        continent: 'Oceania', 
        age: 46, 
        language: 'Python'
      },
      { 
        firstName: 'Charlie', 
        lastName: 'string', 
        country: 'China', 
        continent: 'Asia', 
        age: 24, 
        language: 'Python'
      }
    ]
    expect(getFirstPythonDeveloper(devs)).toEqual('Bob, Australia')
  })
  it('should return \'none\' if there are no python developers', () => {
    const devs = [
      { 
        firstName: 'Alice', 
        lastName: 'string', 
        country: 'Amsterdam', 
        continent: 'Europe', 
        age: 32, 
        language: 'C++'
      },
      { 
        firstName: 'Charlie', 
        lastName: 'string', 
        country: 'Brazil', 
        continent: 'Americas', 
        age: 46, 
        language: 'Javascript'
      }
    ]
    expect(getFirstPythonDeveloper(devs)).toEqual('none')
  })
  it('should return \'none\' if ab empty array is given', () => {
    expect(getFirstPythonDeveloper([])).toEqual('none')
  })
})

describe('getAverageAge', () => {
  it('should return the average age of the group, rounded down', () => {
    const devs = [
      { 
        firstName: 'Alice', 
        lastName: 'string', 
        country: 'Amsterdam', 
        continent: 'Europe', 
        age: 32, 
        language: 'C++'
      },
      { 
        firstName: 'Bob', 
        lastName: 'string', 
        country: 'Australia', 
        continent: 'Oceania', 
        age: 46, 
        language: 'Python'
      },
      { 
        firstName: 'Charlie', 
        lastName: 'string', 
        country: 'China', 
        continent: 'Asia', 
        age: 24, 
        language: 'Python'
      },
    ]
    expect(getAverageAge(devs)).toEqual(34)
  })
  it('should return -1 if there are no developers', () => {
    expect(getAverageAge([])).toEqual(-1)
  })
})

describe('getLanguageCounts', () => {
  it('should return the language counts', () => {
    const devs = [
      { 
        firstName: 'Alice', 
        lastName: 'string', 
        country: 'Amsterdam', 
        continent: 'Europe', 
        age: 32, 
        language: 'C++'
      },
      { 
        firstName: 'Bob', 
        lastName: 'string', 
        country: 'Australia', 
        continent: 'Oceania', 
        age: 46, 
        language: 'Python'
      },
      { 
        firstName: 'Charlie', 
        lastName: 'string', 
        country: 'Brazil', 
        continent: 'Americas', 
        age: 46, 
        language: 'Javascript'
      },
      { 
        firstName: 'Charlie', 
        lastName: 'string', 
        country: 'China', 
        continent: 'Asia', 
        age: 24, 
        language: 'Python'
      }
    ]
    const exp = {
      'C++': 1,
      'Python': 2,
      'Javascript': 1
    }
    expect(getLanguageCounts(devs)).toEqual(exp)
  })
  it('should return an empty object if there are no developers', () => {
    expect(getLanguageCounts([])).toEqual({})
  })
})

describe('getOldest', () => {
  it('should return the oldest developer', () => {
    const devs = [
      { 
        firstName: 'Alice', 
        lastName: 'string', 
        country: 'Amsterdam', 
        continent: 'Europe', 
        age: 32, 
        language: 'C++'
      },
      { 
        firstName: 'Bob', 
        lastName: 'string', 
        country: 'Australia', 
        continent: 'Oceania', 
        age: 46, 
        language: 'Python'
      },
      { 
        firstName: 'Charlie', 
        lastName: 'string', 
        country: 'Brazil', 
        continent: 'Americas', 
        age: 45, 
        language: 'Javascript'
      }
    ]
    expect(getOldest(devs)).toEqual(['Bob'])
  })
  it('should return multiple developers if there is a tie', () => {
    const devs = [
      { 
        firstName: 'Alice', 
        lastName: 'string', 
        country: 'Amsterdam', 
        continent: 'Europe', 
        age: 46, 
        language: 'C++'
      },
      { 
        firstName: 'Bob', 
        lastName: 'string', 
        country: 'Australia', 
        continent: 'Oceania', 
        age: 46, 
        language: 'Python'
      },
      { 
        firstName: 'Charlie', 
        lastName: 'string', 
        country: 'Brazil', 
        continent: 'Americas', 
        age: 46, 
        language: 'Javascript'
      }
    ]
    expect(getOldest(devs)).toEqual(['Alice', 'Bob', 'Charlie'])
  })
  it('should return an empty array if there are no developers', () => {
    expect(getOldest([])).toEqual([])
  })
})

describe('isGlobalGroup', () => {
  it('should return false for a non-global group', () => {
    const devs = [
      { 
        firstName: 'Alice', 
        lastName: 'string', 
        country: 'Amsterdam', 
        continent: 'Europe', 
        age: 32, 
        language: 'C++'
      },
      { 
        firstName: 'Bob', 
        lastName: 'string', 
        country: 'Australia', 
        continent: 'Oceania', 
        age: 46, 
        language: 'Python'
      }
    ]
    expect(isGlobalGroup(devs)).toEqual(false)
  })
  it('should return true for a global group', () => {
    const devs = [
      { 
        firstName: 'Alice', 
        lastName: 'string', 
        country: 'Amsterdam', 
        continent: 'Europe', 
        age: 32, 
        language: 'C++'
      },
      { 
        firstName: 'Bob', 
        lastName: 'string', 
        country: 'Australia', 
        continent: 'Oceania', 
        age: 46, 
        language: 'Python'
      },
      { 
        firstName: 'Charlie', 
        lastName: 'string', 
        country: 'China', 
        continent: 'Asia', 
        age: 24, 
        language: 'Python'
      },
      { 
        firstName: 'Charlie', 
        lastName: 'string', 
        country: 'Brazil', 
        continent: 'Americas', 
        age: 46, 
        language: 'Javascript'
      },
      { 
        firstName: 'Emma', 
        lastName: 'string', 
        country: 'Chad', 
        continent: 'Africa', 
        age: 46, 
        language: 'Forth'
      }
    ]
    expect(isGlobalGroup(devs)).toEqual(true)
  })
  it('should return false when passed an empty array', () => {
    expect(isGlobalGroup([])).toEqual(false)
  })
})
