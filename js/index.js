const card = document.getElementById('card').content
const pr = document.getElementById('pr')
const containerEve = document.getElementById('containerEventos')
const fragment = document.createDocumentFragment()


window.addEventListener('DOMContentLoaded', () => {
    const nE = 3;
    containerEve.innerHTML = ''
    for (let index = 0; index < nE; index++) {
        const clone = card.cloneNode(true)
        fragment.appendChild(clone)
        containerEve.appendChild(fragment)
        
    }
    
})