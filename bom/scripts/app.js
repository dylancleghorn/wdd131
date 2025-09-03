const input = document.querySelector('#chapter-input');
const addButton = document.querySelector('#add-button');
const list = document.querySelector('#chapter-list');

function createListItem(text) {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.className = 'title';
    span.textContent = text;

    const del = document.createElement('button');
    del.className = 'delete';
    del.type = 'button';
    del.textContent = '❌';
    del.setAttribute('aria-label', `Delete "${text}"`);

    li.append(span, del);
    return li;
}

addButton.addEventListener('click', () => {
    const value = input.value.trim();
    if (!value) {
        input.focus();
        return;
    }
    const li = createListItem(value);
    list.appendChild(li);
    input.value = '';
    input.focus();
});

list.addEventListener('click', (e) => {
    if (e.target && e.target.matches('button.delete')) {
        e.target.closest('li')?.remove();
        input.focus();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.activeElement === input) {
        addButton.click();
    }
});

window.addEventListener('DOMContentLoaded', () => input.focus());
