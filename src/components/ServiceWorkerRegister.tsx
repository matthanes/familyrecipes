'use client'

import { useEffect } from 'react'

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Unregister any service workers that are not the current one
      navigator.serviceWorker.getRegistrations().then(registrations => {
        for (const registration of registrations) {
          const scriptURL =
            registration.active?.scriptURL ||
            registration.installing?.scriptURL ||
            registration.waiting?.scriptURL

          // Check if the script URL ends with /recipes/sw.js
          // We use endsWith because scriptURL is absolute
          if (scriptURL && !scriptURL.endsWith('/recipes/sw.js')) {
            console.log(
              'Unregistering old/mismatched service worker:',
              scriptURL,
            )
            registration.unregister()
          }
        }
      })

      navigator.serviceWorker
        .register('/recipes/sw.js')
        .then(registration => {
          console.log(
            'Service Worker registered with scope:',
            registration.scope,
          )
          // Force an update check to ensure we have the latest version
          registration.update()
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error)
        })
    }
  }, [])

  return null
}
