const puppeteer = require('puppeteer')
const fs = require('fs/promises')

module.exports.makeScreenshot = async (page, filepath) => {
  const screenshot = await page.screenshot({
    type: 'png'
  })

  await fs.writeFile(filepath, screenshot)
}
