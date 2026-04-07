// Subscribe function
const form = document.getElementById('newsletterForm');
const button = document.getElementById('subscribeBtn');

form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    if (!email) return;

    button.textContent = "Subscribing...";
    button.disabled = true;

    try {
        const response = await fetch('https://formspree.io/f/mvzvlobr', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ email: email })
        });

        if (response.ok) {
            button.textContent = "Subscribed ✓";
            button.style.backgroundColor = "#2e7d32";
            alert("Thank you! You've been subscribed.");
            setTimeout(() => {
                form.reset();
                button.textContent = "Subscribe";
                button.style.backgroundColor = "";
                button.disabled = false;
            }, 2000);
        }
    } catch (err) {
        button.textContent = "Try again";
        setTimeout(() => button.textContent = "Subscribe", 2000);
    }
});

// Recent Editions - Arrow on the RIGHT side, pointing left, goes to older years
let currentPage = 0;
const yearsPerPage = 6;

const allYears = [
    { year: 2025, months: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"] },
    { year: 2024, months: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"] },
    { year: 2023, months: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"] },
    { year: 2022, months: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"] },
    { year: 2021, months: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"] },
    { year: 2020, months: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"] },
    { year: 2019, months: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"] },
    { year: 2018, months: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"] }
];

function renderYears() {
    const grid = document.getElementById('yearsGrid');
    grid.innerHTML = '';

    const start = currentPage * yearsPerPage;
    const pageYears = allYears.slice(start, start + yearsPerPage);

    pageYears.forEach(item => {
        const card = document.createElement('div');
        card.className = 'year-card';
        card.innerHTML = `
            <h3>${item.year}</h3>
            <div class="months">
                ${item.months.map(month => `<a href="#">${month} ${item.year}</a>`).join('')}
            </div>
        `;
        card.onclick = () => toggleYear(card);
        grid.appendChild(card);
    });

    // Show arrow on the right only if there are older years
    document.getElementById('pastArrow').style.display = 
        ((currentPage + 1) * yearsPerPage < allYears.length) ? 'flex' : 'none';
}

function toggleYear(card) {
    const months = card.querySelector('.months');
    const isOpen = months.style.maxHeight && months.style.maxHeight !== '0px';

    document.querySelectorAll('.months').forEach(m => m.style.maxHeight = '0px');

    if (!isOpen) {
        months.style.maxHeight = months.scrollHeight + "px";
    }
}

function goToOlder() {
    if ((currentPage + 1) * yearsPerPage < allYears.length) {
        currentPage++;
        renderYears();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderYears();
});