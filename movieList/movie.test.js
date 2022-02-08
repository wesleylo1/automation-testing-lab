const {Builder,Capabilities,By} = require('selenium-webdriver')
require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async() => {
    await driver.get('http://127.0.0.1:5500/movieList/index.html')
})

afterAll(async() => {
    await driver.quit()
})

// deleting a movie

test('deleting movie', async () => {
    // entering the movie
    let searchBar = await driver.findElement(By.css('input'))
    await searchBar.sendKeys('Lord of the Rings\n')
    // deleting movie
    let deleteBtn = await driver.findElement(By.xpath('//li/button'))
    await deleteBtn.click()
    await driver.sleep(1000)
    // look for the lack of display
    let movieArr = await driver.findElements(By.xpath('//li/span'))
    expect(movieArr.length).toEqual(0)
});

// crossing off the movie name

test('crossing off the movie',async() => {
    // entering the movie
    let searchBar = await driver.findElement(By.css('input'))
    await searchBar.sendKeys('lotr\n')
    // crossing the movie out
    let movie = await driver.findElement(By.xpath('//li/span'))
    movie.click()
    let crossed = await driver.findElement(By.xpath('//li/span'))
    let crossedOut = crossed.isDisplayed()
    expect(crossedOut).toBeTruthy()
})

// check the notifications

test('delete notification', async() => {
    // entering the movie
    let searchBar = await driver.findElement(By.css('input'))
    await searchBar.sendKeys('lotr\n')
    // deleting the movie
    let deleteBtn = await driver.findElement(By.xpath('//li/button'))
    await deleteBtn.click()
    // getting notification
    let message = await driver.findElement(By.css('#message'))
    expect(message).toBeTruthy()
})
