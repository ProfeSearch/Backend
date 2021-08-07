const openPage = require('../openPage')
const scrapSection = require('../scrapSection')
const scrollToPageBottom = require('./scrollToPageBottom')
const seeMoreButtons = require('./seeMoreButtons')
const template = require('./profileScraperTemplate')
const cleanProfileData = require('./cleanProfileData')

const logger = require('../logger')(__filename)

module.exports = async (browser, cookies, url, waitTimeToScrapMs = 500, hasToGetContactInfo = false, puppeteerAuthenticate = undefined) => {
  logger.info(`starting scraping url: ${url}`)

  const page = await openPage({ browser, cookies, url, puppeteerAuthenticate })
  const profilePageIndicatorSelector = '.pv-profile-section'
  await page.waitFor(profilePageIndicatorSelector, { timeout: 10000 })
    .catch(() => {
      //why doesn't throw error instead of continuing scraping?
      //because it can be just a false negative meaning LinkedIn only changed that selector but everything else is fine :)
      logger.warn('profile selector was not found')
    })

  logger.info('scrolling page to the bottom')
  await scrollToPageBottom(page)
  
  // if(waitTimeToScrapMs) {
  //   logger.info(`applying 1st delay`)
  //   await new Promise((resolve) => { setTimeout(() => { resolve() }, waitTimeToScrapMs / 5)})
  // }

  await seeMoreButtons.clickAll(page)

  // if(waitTimeToScrapMs) {
  //   logger.info(`applying 2nd (and last) delay`)
  //   await new Promise((resolve) => { setTimeout(() => { resolve() }, waitTimeToScrapMs / 5)})
  // }

  const [profile] = await scrapSection(page, template.profile)
  const positions = await scrapSection(page, template.positions)
  const educations = await scrapSection(page, template.educations)
  const skills = await scrapSection(page, template.skills)

  await page.close()
  logger.info(`finished scraping url: ${url}`)

  const rawProfile = {
    profile,
    positions,
    educations,
    skills,
  }

  const cleanedProfile = cleanProfileData(rawProfile)
  return cleanedProfile
}
