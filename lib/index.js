import Promise from 'bluebird'
import scrape from 'ascrape'
import phantom from 'phantom'

export default async (url) => {
  const instance = await phantom.create()
  const page = await instance.createPage()
  const status = await page.open(url)

  if (status !== 'success'){
    console.error(`Page not available ${url}`)
  }

  const content = await page.property('content')
  await instance.exit()
  return new Promise((resolve, reject) => {
    scrape(content, (err, article, meta) => {
      if (err) return reject(err)
      return resolve(article)
    })
  })
}
