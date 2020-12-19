const loadingDom = document.getElementById('loading') as HTMLElement
const warnDom = document.getElementById('warn') as HTMLElement
const successDom = document.getElementById('success') as HTMLElement

export function showError (text: string) {
  const t = warnDom.querySelector('h2')
  if (t) {
    t.innerText = text
  }
  loadingDom.classList.remove('show')
  loadingDom.classList.add('hide')
  warnDom.classList.remove('hide')
  warnDom.classList.add('show')
}

export function success () {
  loadingDom.classList.remove('show')
  loadingDom.classList.add('hide')
  successDom.classList.remove('hide')
  successDom.classList.add('show')
}
