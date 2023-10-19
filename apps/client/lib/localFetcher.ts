const localFetcher = async (
  url: string,
  options: RequestInit = {},
  isFormData = false
) => {
  const { headers, ...restOptions } = options
  let headersOptions = {}
  if (isFormData) {
    headersOptions = {
      ...headers,
    }
  } else {
    headersOptions = {
      'Content-Type': 'application/json',
      ...headers,
    }
  }
  const res = await fetch(url, {
    ...restOptions,
    // credentials: 'include',
    headers: headersOptions,
  })
  if (!res.ok) {
    const error: any = new Error('An error occurred while fetching the data.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }
  return res.json()
}

export default localFetcher
