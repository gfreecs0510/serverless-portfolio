export function match(filters: object[], property: string, value: string) {
  if (value.trim() !== '') {
    filters.push({
      match: {
        [property]: value,
      },
    });
  }
}

export function range(
  filters: object[],
  fromProperty: string,
  toProperty: string,
  fromValue: any,
  toValue: any,
) {
  if (fromValue && toValue) {
    filters.push({
      bool: {
        must: [
          {
            range: {
              [fromProperty]: {
                gte: fromValue,
              },
            },
          },
          {
            range: {
              [toProperty]: {
                lte: toValue,
              },
            },
          },
        ],
      },
    });
  }
}

export function term(filters: object[], property: string, value: string) {
  if (value.trim() !== '') {
    filters.push({
      term: {
        [property]: {
          value,
        },
      },
    });
  }
}

export function terms(filters: object[], property: string, values: any[]) {
  if (values.length > 0) {
    filters.push({
      terms: {
        [property]: values,
      },
    });
  }
}
