import { test, expect } from '@playwright/test'

test('Workshop homepage introduces Jim and keeps REGGULAR unavailable', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Jim Taylor/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Useful things.Unexpected ideas.')
  await expect(page.locator('.preview-switcher')).toHaveCount(0)
  await expect(page.locator('.hero-bottom')).toContainText('AI-assisted development')
  await expect(page.locator('.eggs')).toContainText('Coming soon')
  await expect(page.locator('.eggs a')).toHaveCount(0)
  await expect(page.locator('.words a')).toHaveAttribute('href', 'https://possiblewords.jimtaylor.space')
})

test('About uses a sharp, compact static portrait', async ({ page }) => {
  await page.goto('/')
  const image = page.locator('#about img')
  await image.scrollIntoViewIfNeeded()
  await image.evaluate(img => img.decode())
  await expect(image).toHaveAttribute('src', '/images/jim-posterized.webp')
  const dimensions = await image.evaluate(img => ({ width: img.clientWidth, height: img.clientHeight, naturalWidth: img.naturalWidth }))
  expect(dimensions.naturalWidth).toBe(800)
  expect(dimensions.height).toBeLessThan(dimensions.width)
})

test('Main navigation connects supporting pages and home sections', async ({ page }) => {
  await page.goto('/')
  const nav = page.getByRole('navigation', { name: 'Main navigation' })
  for (const label of ['Work', 'About', 'Uses', 'Personal', 'Contact']) {
    await expect(nav.getByRole('link', { name: label, exact: label !== 'Contact' })).toBeVisible()
  }
  await nav.getByRole('link', { name: 'Uses', exact: true }).click()
  await expect(page).toHaveURL('/uses')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Inside the toolbox.')
  await expect(page.locator('.cat')).toHaveCount(7)
  await expect(nav.getByRole('link', { name: 'Uses', exact: true })).toHaveAttribute('aria-current', 'page')
  await nav.getByRole('link', { name: 'Personal', exact: true }).click()
  await expect(page).toHaveURL('/personal')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Away from the keyboard.')
  await expect(page.locator('.hobby-list')).toBeVisible()
  await expect(page.locator('.places-list-item')).toHaveCount(7)
  await expect(page.locator('.map-container')).toHaveClass(/leaflet-container/)
  await nav.getByRole('link', { name: 'Work', exact: true }).click()
  await expect(page).toHaveURL('/#work')
  await expect(page.locator('#work')).toBeInViewport()
})

test('Mobile layout and supporting page links remain usable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  for (const path of ['/', '/uses', '/personal']) {
    await page.goto(path)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await expect(page.getByRole('navigation').getByRole('link', { name: 'Personal', exact: true })).toBeVisible()
  }
  await page.goto('/')
  await page.getByRole('link', { name: 'Outside the code' }).click()
  await expect(page).toHaveURL('/personal')
  await page.getByRole('link', { name: 'Jim Taylor home', exact: true }).click()
  await expect(page).toHaveURL('/')
})
