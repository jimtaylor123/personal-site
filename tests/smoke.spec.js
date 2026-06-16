import { test, expect } from '@playwright/test'

test.describe('Home page', () => {
  test('loads with correct title and heading', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Jim Taylor/)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('nav links are visible', async ({ page }) => {
    await page.goto('/')
    const nav = page.locator('.nav')
    await expect(nav.locator('a', { hasText: 'About' })).toBeVisible()
    await expect(nav.locator('a', { hasText: 'Projects' })).toBeVisible()
    await expect(nav.locator('a', { hasText: 'Links' })).toBeVisible()
    await expect(nav.locator('a', { hasText: 'Uses' })).toBeVisible()
    await expect(nav.locator('a', { hasText: 'Personal' })).toBeVisible()
  })

  test('theme toggle switches between dark and light', async ({ page }) => {
    await page.goto('/')
    const html = page.locator('html')
    await expect(html).toHaveAttribute('data-theme', 'dark')
    await page.locator('.theme-toggle').click()
    await expect(html).toHaveAttribute('data-theme', 'light')
    await page.locator('.theme-toggle').click()
    await expect(html).toHaveAttribute('data-theme', 'dark')
  })

  test('about section has earning/learning filter buttons', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('button', { name: /Earning/ })).toBeVisible()
    await expect(page.getByRole('button', { name: /Learning/ })).toBeVisible()
  })

  test('filtering tech list works', async ({ page }) => {
    await page.goto('/')
    const about = page.locator('#about')
    const techItems = about.locator('.tech-item')

    const allCount = await techItems.count()

    await page.getByRole('button', { name: /Earning/ }).click()
    const earningCount = await techItems.count()
    expect(earningCount).toBeLessThan(allCount)

    await page.getByRole('button', { name: /Learning/ }).click()
    const learningCount = await techItems.count()
    expect(learningCount).toBeLessThan(allCount)

    await page.getByRole('button', { name: /Learning/ }).click()
    expect(await techItems.count()).toBe(allCount)
  })
})

test.describe('/uses page', () => {
  test('loads and shows tool categories', async ({ page }) => {
    await page.goto('/uses')
    await expect(page.locator('.uses-title')).toHaveText('/uses')
    const cats = page.locator('.cat')
    expect(await cats.count()).toBeGreaterThanOrEqual(5)
  })

  test('nav persists on uses page', async ({ page }) => {
    await page.goto('/uses')
    await expect(page.locator('.nav')).toBeVisible()
  })
})

test.describe('/personal page', () => {
  test('loads with title and sections', async ({ page }) => {
    await page.goto('/personal')
    await expect(page.locator('.personal-title')).toHaveText('/personal')
    await expect(page.locator('.hobby-list')).toBeVisible()
    await expect(page.locator('.map-container')).toBeVisible()
  })

  test('map container renders', async ({ page }) => {
    await page.goto('/personal')
    const map = page.locator('.map-container')
    await expect(map).toBeVisible()
    await expect(map).toContainText('Click to explore')
  })

  test('places list is rendered', async ({ page }) => {
    await page.goto('/personal')
    const places = page.locator('.places-list-item')
    expect(await places.count()).toBe(7)
  })
})

test.describe('Navigation', () => {
  test('logo navigates to home', async ({ page }) => {
    await page.goto('/uses')
    await page.locator('.logo').click()
    await expect(page).toHaveURL('/')
  })

  test('can navigate between subpages via nav', async ({ page }) => {
    await page.goto('/')
    const nav = page.locator('.nav')
    await nav.locator('a', { hasText: 'Uses' }).click()
    await expect(page).toHaveURL('/uses')
    await nav.locator('a', { hasText: 'Personal' }).click()
    await expect(page).toHaveURL('/personal')
  })
})
