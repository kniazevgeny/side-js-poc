function purchase(items) {
    /**
     * items: { item: string, price: number }[]
     */
    const meloraUtm = document.cookie.split('; ').find(row => row.startsWith('melora_utm='))?.split('=')[1]
    document.querySelector('h1 span').textContent
        += ` > purchase items ${JSON.stringify(items)} with melora_utm: ${meloraUtm ? decodeURIComponent(meloraUtm) : 'not found'}`
}

function setup() {
    window.melora = { 'purchase': purchase }
    document.querySelector('h1 span').textContent = 'script loaded'
    // save data only if there was a redirect from melora
    if (window.location.search.includes('utm_source=melora.ru')) {
        document.cookie = `melora_utm=${encodeURIComponent(window.location.search)}; max-age=${3600 * 24 * 30}; path=/`
        document.querySelector('h1 span').textContent += ' > cookie set'
    }
}

if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', setup);
} else {
    setup();
}
