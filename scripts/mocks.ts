import type { Page } from 'playwright'

/**
 * Sets up all in-memory state and network mocks for the Nordcraft editor
 * to ensure an authenticated user session, no warning banners, and no "learn-about" dialogs.
 */
export async function setupPageMocks(page: Page) {
  // Mock authenticated session in __toddle.pageState.Apis and WebSocket canWrite before page scripts execute
  await page.addInitScript(() => {
    let toddleState: any = undefined
    Object.defineProperty(window, '__toddle', {
      get() {
        return toddleState
      },
      set(val) {
        if (val?.pageState?.Apis) {
          for (const [, api] of Object.entries(
            val.pageState.Apis as Record<string, any>,
          )) {
            if (
              api?.error?.error === 'You are not logged in' ||
              api?.response?.status === 401
            ) {
              api.data = {
                user: {
                  id: '06995e1a-b0b4-430a-bc22-789087e46c7c',
                  name: 'Nordcraft Team',
                  email: 'team@nordcraft.com',
                  username: 'nordcraft',
                },
              }
              api.error = null
              if (api.response) api.response.status = 200
            }
          }
        }
        toddleState = val
      },
      configurable: true,
    })

    // Hook WebSocket messages to ensure write access is granted without warning bars
    const OrigWS = window.WebSocket
    window.WebSocket = class extends OrigWS {
      constructor(...args: any[]) {
        super(args[0], args[1])
        const origAdd = this.addEventListener.bind(this)
        this.addEventListener = function (
          type: string,
          listener: any,
          options: any,
        ) {
          if (type === 'message') {
            const wrapped = function (this: WebSocket, event: MessageEvent) {
              if (typeof event.data === 'string') {
                try {
                  const parsed = JSON.parse(event.data)
                  // Suppress backend permission ERROR message that triggers "Connection issues" dialog
                  if (parsed.type === 'ERROR') {
                    return
                  }
                } catch {}
                if (event.data.includes('"canWrite":false')) {
                  const modifiedData = event.data.replaceAll(
                    '"canWrite":false',
                    '"canWrite":true',
                  )
                  const newEvent = new MessageEvent('message', {
                    data: modifiedData,
                    origin: event.origin,
                    lastEventId: event.lastEventId,
                    source: event.source,
                    ports: event.ports as any,
                  })
                  return listener.call(this, newEvent)
                }
              }
              return listener.call(this, event)
            }
            return origAdd(type, wrapped, options)
          }
          return origAdd(type, listener, options)
        }

        let onmsg: any = null
        Object.defineProperty(this, 'onmessage', {
          get() {
            return onmsg
          },
          set(fn) {
            if (!fn) {
              onmsg = null
              return
            }
            onmsg = function (this: WebSocket, event: MessageEvent) {
              if (typeof event.data === 'string') {
                try {
                  const parsed = JSON.parse(event.data)
                  if (parsed.type === 'ERROR') {
                    return
                  }
                } catch {}
                if (event.data.includes('"canWrite":false')) {
                  const modifiedData = event.data.replaceAll(
                    '"canWrite":false',
                    '"canWrite":true',
                  )
                  const newEvent = new MessageEvent('message', {
                    data: modifiedData,
                    origin: event.origin,
                    lastEventId: event.lastEventId,
                    source: event.source,
                    ports: event.ports as any,
                  })
                  return fn.call(this, newEvent)
                }
              }
              return fn.call(this, event)
            }
          },
        })
      }
    }
  })

  // Stub client-side Session API calls
  await page.route(/(Session|\/auth\/session)/i, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        user: {
          id: '06995e1a-b0b4-430a-bc22-789087e46c7c',
          name: 'Nordcraft Team',
          email: 'team@nordcraft.com',
          username: 'nordcraft',
        },
      }),
    })
  })

  // Stub client-side refresh token API calls
  await page.route(/(\.toddle\/refresh|refresh)/i, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ ok: true }),
    })
  })

  // Stub client-side User settings API call to mark all "learn-about" dialogs as Done
  await page.route(/(User%20settings|user_settings)/i, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { key: 'learn-about-issues', value: 'Done' },
        { key: 'learn-about-actions-formulas', value: 'Done' },
        { key: 'learn-about-ship-mode', value: 'Done' },
        { key: 'learn-about-design-mode', value: 'Done' },
        { key: 'learn-about-play-mode', value: 'Done' },
        { key: 'learn-about-history', value: 'Done' },
        { key: 'learn-about-components', value: 'Done' },
        { key: 'learn-about-pages', value: 'Done' },
        { key: 'learn-about-services', value: 'Done' },
        { key: 'learn-about-packages', value: 'Done' },
        { key: 'learn-about-formulas', value: 'Done' },
        { key: 'learn-about-actions', value: 'Done' },
        { key: 'learn-about-config', value: 'Done' },
        { key: 'learn-about-themes', value: 'Done' },
        { key: 'learn-about-media', value: 'Done' },
        { key: 'learn-about-workflows', value: 'Done' },
        { key: 'learn-about-branches', value: 'Done' },
        { key: 'learn-about-formula-editor', value: 'Done' },
      ]),
    })
  })
}
