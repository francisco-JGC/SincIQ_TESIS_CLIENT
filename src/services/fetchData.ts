export interface IFetchData {
  url: string
  method?: string
  body?: object
  token?: string
}

const getSuspender = (promise: Promise<any>) => {
  let status = 'pending'
  let result: any

  let suspender = promise.then(
    (res) => {
      status = 'success'
      result = res
    },
    (err) => {
      status = 'error'
      result = err
    },
  )
  return {
    read() {
      if (status === 'pending') throw suspender
      if (status === 'error') throw result
      return result
    },
  }
}

export const fetchData = ({ url, method, body, token }: IFetchData) => {
  const promise = fetch(url, {
    method: method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
    body: JSON.stringify(body),
  }).then((res) => res.json())

  return getSuspender(promise)
}
