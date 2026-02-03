// Helper function to get image path
function getImagePath(category, name) {
    // Convert name to image filename format (e.g., "Combat PDW" -> "combat_pdw.png")
    const imageName = name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
    return `images/${category}/${imageName}.png`;
}

const DB = {
    weapons: [
        { id: 1, name: "Combat PDW", image: "images/weapons/WEAPON_MP9.png", rarity: "Epic", pwr: 75, rel: 90, fireSpeed: 85, damage: 65, range: 60, accuracy: 70, desc: "High-speed tactical submachine gun." },
        { id: 2, name: "Heavy Sniper", image: "images/weapons/WEAPON_SIG.png", rarity: "Legendary", pwr: 95, rel: 40, fireSpeed: 25, damage: 98, range: 95, accuracy: 92, desc: "One shot, one story." },
        { id: 3, name: "Micro SMG", image: "images/weapons/WEAPON_MAC10.png", rarity: "Common", pwr: 40, rel: 80, fireSpeed: 95, damage: 35, range: 40, accuracy: 55, desc: "Spray and pray specialized." },
        { id: 4, name: "Pump Shotgun", image: "images/weapons/WEAPON_SHELL.png", rarity: "Rare", pwr: 85, rel: 70, fireSpeed: 30, damage: 90, range: 25, accuracy: 45, desc: "The hallway clearer." },
        { id: 9, name: "Glock 17", image: "images/weapons/WEAPON_G17.png", rarity: "Common", pwr: 50, rel: 85, fireSpeed: 60, damage: 55, range: 50, accuracy: 75, desc: "Reliable sidearm." },
        { id: 10, name: "Glock 19", image: "images/weapons/WEAPON_G19.png", rarity: "Common", pwr: 52, rel: 88, fireSpeed: 62, damage: 56, range: 48, accuracy: 78, desc: "Compact reliability." },
        { id: 11, name: "AR-15", image: "images/weapons/WEAPON_AR9.png", rarity: "Rare", pwr: 70, rel: 75, fireSpeed: 70, damage: 68, range: 75, accuracy: 80, desc: "Versatile rifle platform." },
        { id: 12, name: "AK-47", image: "images/weapons/WEAPON_ARPW.png", rarity: "Epic", pwr: 80, rel: 90, fireSpeed: 75, damage: 82, range: 70, accuracy: 72, desc: "Soviet reliability." }
    ],
    drugs: [
        { id: 5, name: "Blue Crystal", image: "images/drugs/k9_blues.png", rarity: "Rare", type: "Stimulant", effect: "Energy Boost", form: "Crystal", notes: "High purity", price: "$50-$80", bonus: "+20 Speed", desc: "99.1% pure grade material." },
        { id: 6, name: "Brick", image: "images/drugs/v_230.png", rarity: "Common", type: "Narcotic", effect: "Pain Relief", form: "Powder", notes: "Standard quality", price: "$20-$40", bonus: "+10 Health", desc: "Standard street import." },
        { id: 13, name: "Wockhardt", image: "images/drugs/wockhardt_pint.png", rarity: "Epic", type: "Painkiller", effect: "Defensive Boost", form: "Liquid", notes: "Pharmaceutical grade", price: "$100-$150", bonus: "+25 Armor", desc: "Premium pharmaceutical grade." },
        { id: 14, name: "Tris", image: "images/drugs/tris_pint.png", rarity: "Rare", type: "Painkiller", effect: "Defensive Boost", form: "Liquid", notes: "High quality", price: "$80-$120", bonus: "+20 Armor", desc: "High quality import." },
        { id: 15, name: "Quagen", image: "images/drugs/quagen_pint.png", rarity: "Rare", type: "Painkiller", effect: "Defensive Boost", form: "Liquid", notes: "Street favorite", price: "$70-$110", bonus: "+18 Armor", desc: "Street favorite." },
        { id: 18, name: "MBox 10", image: "images/drugs/mbox_10.png", rarity: "Common", type: "Painkiller", effect: "Defensive Boost", form: "Tablet", notes: "Stacking Limited", price: "$10-$25", bonus: "+10 Armor", desc: "Basic pain relief tablet." },
        { id: 19, name: "MBox 15", image: "images/drugs/mbox_15.png", rarity: "Uncommon", type: "Painkiller", effect: "Defensive Boost", form: "Tablet", notes: "Stacking Limited", price: "$15-$35", bonus: "+15 Armor", desc: "Enhanced pain relief tablet." },
        { id: 20, name: "MBox 20", image: "images/drugs/mbox_20.png", rarity: "Rare", type: "Painkiller", effect: "Defensive Boost", form: "Tablet", notes: "Stacking Limited", price: "$25-$50", bonus: "+20 Armor", desc: "Advanced pain relief tablet." }
    ],
    attachments: [
        { id: 7, name: "Suppressor", image: "images/attachments/attach_LIGHT.png", rarity: "Epic", type: "Muzzle", compatibility: "Pistols, Rifles", capacity: "N/A", desc: "Ghost-quiet operations." },
        { id: 8, name: "Extended Mag", image: "images/attachments/pmag_ext.png", rarity: "Common", type: "Magazine", compatibility: "Rifles", capacity: "30 Rounds", desc: "More lead, less reloading." },
        { id: 16, name: "Drum Mag", image: "images/attachments/drum_mag_ext.png", rarity: "Epic", type: "Magazine", compatibility: "Rifles", capacity: "60 Rounds", desc: "Maximum capacity." },
        { id: 17, name: "Auto Sear", image: "images/attachments/autosear.png", rarity: "Legendary", type: "Internal", compatibility: "Semi-Auto Weapons", capacity: "N/A", desc: "Full auto conversion." },
        { id: 21, name: "PMAG Extended Magazine", image: "images/attachments/pmag_ext.png", rarity: "Common", type: "Magazine", compatibility: "Rifles", capacity: "30 Rounds", desc: "Standard extended capacity magazine." },
        { id: 22, name: "PMAG Drum Magazine", image: "images/attachments/drum_mag_ext.png", rarity: "Epic", type: "Magazine", compatibility: "Rifles", capacity: "60 Rounds", desc: "High-capacity drum magazine." },
        { id: 23, name: "Kris Vector Magazine", image: "images/attachments/pmag_ext.png", rarity: "Rare", type: "Magazine", compatibility: "SMGs", capacity: "25 Rounds", desc: "Specialized SMG magazine." }
    ]
};

let inventory = [];
let currentCategory = 'weapons';
let isSpinning = false;

// --- VIEW NAVIGATION ---
function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    
    document.getElementById(`view-${viewId}`).classList.add('active');
    event.currentTarget.classList.add('active');
    
    if(viewId === 'inventory') renderInventory();
    if(viewId === 'wiki') renderWiki();
}

// --- ROULETTE LOGIC ---
function changeCategory(cat, btn) {
    if(isSpinning) return;
    currentCategory = cat;
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    initWheel();
}

function initWheel() {
    const wheel = document.getElementById('wheel');
    wheel.style.transition = 'none';
    wheel.style.transform = 'translateX(0)';
    wheel.innerHTML = '';
    
    const pool = DB[currentCategory];
    // Fill the wheel with random items from category
    for(let i = 0; i < 60; i++) {
        const item = pool[Math.floor(Math.random() * pool.length)];
        const el = document.createElement('div');
        el.className = 'item-card';
        el.setAttribute('data-item-id', item.id);
        el.setAttribute('data-item-name', item.name);
        el.innerHTML = `<img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"><i class="fa-solid fa-image" style="display:none;"></i><span class="item-name">${item.name}</span>`;
        wheel.appendChild(el);
    }
}

function startSpin() {
    if(isSpinning) return;
    
    const wheel = document.getElementById('wheel');
    const pool = DB[currentCategory];
    
    // Make sure wheel is initialized
    if(wheel.children.length === 0) {
        initWheel();
    }

    isSpinning = true;
    document.getElementById('spin-button').disabled = true;
    document.getElementById('win-announcement').classList.remove('active');

    // Pick a random landing position (anywhere in the wheel)
    // Card width: 180px width + 10px margin on each side = 200px total per card
    const cardWidth = 200;
    const totalCards = wheel.children.length;
    const wrapperWidth = document.querySelector('.roulette-wrapper').offsetWidth;
    
    // Pick a random card index to land on (avoid edges)
    const randomIndex = Math.floor(Math.random() * (totalCards - 20)) + 10; // Random index between 10 and totalCards-10
    
    // Calculate landing position: center the selected card at the pointer
    // The pointer is at wrapperWidth/2, so we need to position the card's center there
    // Card center position in wheel: randomIndex * cardWidth + cardWidth/2
    // We need: -translateX + cardCenter = wrapperWidth/2
    // So: translateX = cardCenter - wrapperWidth/2
    const cardCenter = (randomIndex * cardWidth) + (cardWidth / 2);
    const landingPos = cardCenter - (wrapperWidth / 2);
    const randomizeStop = Math.floor(Math.random() * 60) - 30; // Add some jitter (-30 to +30px)

    wheel.style.transition = 'transform 5s cubic-bezier(0.15, 0, 0.15, 1)';
    wheel.style.transform = `translateX(-${landingPos + randomizeStop}px)`;

    // After animation completes, determine the winner
    setTimeout(() => {
        // Calculate which card is at the center (where the pointer is)
        const finalTransform = wheel.style.transform;
        const translateX = parseInt(finalTransform.match(/-?\d+/)[0]) || 0;
        
        // The pointer is fixed at the center of the wrapper
        // In the wheel's coordinate system, the pointer is at: -translateX + wrapperWidth/2
        const pointerPositionInWheel = -translateX + (wrapperWidth / 2);
        
        // Each card's center is at: index * cardWidth + cardWidth/2
        // Find which card's center is closest to the pointer
        const cards = wheel.querySelectorAll('.item-card');
        let closestIndex = 0;
        let minDistance = Infinity;
        
        for(let i = 0; i < cards.length; i++) {
            const cardCenter = (i * cardWidth) + (cardWidth / 2);
            const distance = Math.abs(pointerPositionInWheel - cardCenter);
            if(distance < minDistance) {
                minDistance = distance;
                closestIndex = i;
            }
        }
        
        // Get the winning card
        const winningCard = cards[closestIndex];
        winningCard.classList.add('won');
        
        // Get the item ID from the card's data attribute
        const itemId = parseInt(winningCard.getAttribute('data-item-id'));
        const winningItem = pool.find(item => item.id === itemId);
        
        if(winningItem) {
            // Check if item is already in inventory (Unique logic)
            if(inventory.find(i => i.id === winningItem.id)) {
                // Item already owned, reroll
                isSpinning = false;
                document.getElementById('spin-button').disabled = false;
                startSpin();
                return;
            }
            finalizeWin(winningItem);
        } else {
            // Fallback: pick random item if we can't determine the winner
            const randomItem = pool[Math.floor(Math.random() * pool.length)];
            if(!inventory.find(i => i.id === randomItem.id)) {
                finalizeWin(randomItem);
            } else {
                isSpinning = false;
                document.getElementById('spin-button').disabled = false;
            }
        }
    }, 5500);
}

function finalizeWin(item) {
    isSpinning = false;
    document.getElementById('spin-button').disabled = false;
    
    inventory.push(item);
    
    const banner = document.getElementById('win-announcement');
    document.getElementById('won-item-name').innerText = item.name;
    banner.style.display = 'block';
    
    // Deduct "Balance" (Fake currency logic)
    let bal = parseInt(document.getElementById('balance').innerText.replace(',',''));
    document.getElementById('balance').innerText = (bal - 500).toLocaleString();
}

// --- DATA RENDERING ---
function renderInventory() {
    const grid = document.getElementById('inventory-grid');
    grid.innerHTML = inventory.length ? '' : '<p>No items in storage.</p>';
    inventory.forEach(item => {
        const el = document.createElement('div');
        el.className = 'grid-item';
        el.onclick = () => openModal(item);
        el.innerHTML = `<img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"><i class="fa-solid fa-image" style="display:none; font-size:2rem; color:var(--primary)"></i><h3>${item.name}</h3>`;
        grid.appendChild(el);
    });
}

function renderWiki() {
    const grid = document.getElementById('wiki-grid');
    grid.innerHTML = '';
    Object.values(DB).flat().forEach(item => {
        const el = document.createElement('div');
        el.className = 'grid-item';
        el.onclick = () => openModal(item);
        const owned = inventory.find(i => i.id === item.id) ? '✓ OWNED' : 'LOCKED';
        el.innerHTML = `
            <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
            <i class="fa-solid fa-image" style="display:none;"></i>
            <h3>${item.name}</h3>
            <small style="color:var(--primary)">${owned}</small>
        `;
        grid.appendChild(el);
    });
}

// --- MODAL SYSTEM ---
function openModal(item) {
    document.getElementById('modal').classList.add('active');
    document.getElementById('modal-title').innerText = item.name;
    document.getElementById('modal-desc').innerText = item.desc;
    document.getElementById('modal-rarity').innerText = item.rarity;
    document.getElementById('modal-icon').innerHTML = `<img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"><i class="fa-solid fa-image" style="display:none; font-size: 5rem; color: var(--primary)"></i>`;
    
    // Check if item is a drug (has type, effect, form, etc.)
    const isDrug = item.type !== undefined && item.effect !== undefined;
    // Check if item is an attachment (has type, compatibility, capacity)
    const isAttachment = item.type !== undefined && item.compatibility !== undefined && item.capacity !== undefined;
    
    // Show/hide appropriate containers
    const weaponStats = document.getElementById('weapon-stats');
    const drugDetails = document.getElementById('drug-details');
    const attachmentDetails = document.getElementById('attachment-details');
    
    if(isDrug) {
        // Show drug details, hide weapon stats and attachment details
        weaponStats.style.display = 'none';
        attachmentDetails.style.display = 'none';
        drugDetails.style.display = 'block';
        // Show drug details, hide weapon stats
        weaponStats.style.display = 'none';
        drugDetails.style.display = 'block';
        
        // Populate drug details
        document.getElementById('drug-type').textContent = item.type || '-';
        document.getElementById('drug-effect').textContent = item.effect || '-';
        document.getElementById('drug-form').textContent = item.form || '-';
        document.getElementById('drug-notes').textContent = item.notes || '-';
        document.getElementById('drug-price').textContent = item.price || '-';
        
        // Show bonus if available
        const bonusEl = document.getElementById('drug-bonus');
        if(item.bonus) {
            bonusEl.textContent = item.bonus;
            bonusEl.style.display = 'block';
        } else {
            bonusEl.style.display = 'none';
        }
    } else if(isAttachment) {
        // Show attachment details, hide weapon stats and drug details
        weaponStats.style.display = 'none';
        drugDetails.style.display = 'none';
        attachmentDetails.style.display = 'block';
        
        // Populate attachment details
        document.getElementById('attachment-type').textContent = item.type || '-';
        document.getElementById('attachment-compatibility').textContent = item.compatibility || '-';
        document.getElementById('attachment-capacity').textContent = item.capacity || '-';
    } else {
        // Show weapon stats, hide drug details and attachment details
        weaponStats.style.display = 'block';
        drugDetails.style.display = 'none';
        attachmentDetails.style.display = 'none';
        
        // Reset all bars
        const stats = ['damage', 'firespeed', 'range', 'accuracy', 'rel'];
        stats.forEach(stat => {
            document.getElementById(`stat-${stat}`).style.width = '0%';
            if(document.getElementById(`stat-${stat}-value`)) {
                document.getElementById(`stat-${stat}-value`).textContent = '0';
            }
        });
        
        // Animate bars with values
        setTimeout(() => {
            if(item.damage !== undefined && item.damage > 0) {
                document.getElementById('stat-damage').style.width = item.damage + '%';
                document.getElementById('stat-damage-value').textContent = item.damage;
            }
            if(item.fireSpeed !== undefined && item.fireSpeed > 0) {
                document.getElementById('stat-firespeed').style.width = item.fireSpeed + '%';
                document.getElementById('stat-firespeed-value').textContent = item.fireSpeed;
            }
            if(item.range !== undefined && item.range > 0) {
                document.getElementById('stat-range').style.width = item.range + '%';
                document.getElementById('stat-range-value').textContent = item.range;
            }
            if(item.accuracy !== undefined && item.accuracy > 0) {
                document.getElementById('stat-accuracy').style.width = item.accuracy + '%';
                document.getElementById('stat-accuracy-value').textContent = item.accuracy;
            }
            if(item.rel !== undefined) {
                document.getElementById('stat-rel').style.width = item.rel + '%';
                document.getElementById('stat-rel-value').textContent = item.rel;
            }
        }, 100);
    }
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    const stats = ['damage', 'firespeed', 'range', 'accuracy', 'rel'];
    stats.forEach(stat => {
        document.getElementById(`stat-${stat}`).style.width = '0%';
        if(document.getElementById(`stat-${stat}-value`)) {
            document.getElementById(`stat-${stat}-value`).textContent = '0';
        }
    });
}

// Boot
window.onload = initWheel;
