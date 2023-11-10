export const isExceed  = (max, current) => current > max
export const isDeceed = (min, current) => current < min
export const isInRange = (min, max, current) =>  min <= current && max >= current