function purchase(amount, goods) {
    const meloraUtm = document.cookie.split('; ').find(row => row.startsWith('melora_utm='))?.split('=')[1]

    if (!meloraUtm) return

    const utmParams = new URLSearchParams(decodeURIComponent(meloraUtm))
    const clid = utmParams.get('clid')
    if (!clid) return

    fetch('https://api.melora.ru/api/v1/wh/p', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ clid, amount, goods })
    })
        .then(response => {
            if (!response.ok) {
                console.error('Failed to send purchase event to Melora:', response.status, response.statusText)
            }
        })
        .catch(error => {
            console.error('Error sending purchase event to Melora:', error)
        })
}

function setup() {
    window.melora = { 'purchase': purchase }
    // save data only if there was a redirect from melora
    if (window.location.search.includes('utm_source=melora')) {
        document.cookie = `melora_utm=${encodeURIComponent(window.location.search)}; max-age=${3600 * 24 * 30}; path=/`
    }
}

if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', setup);
} else {
    setup();
}
