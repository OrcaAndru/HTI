const tripStart = new Date('2026-09-17T16:00:00-04:00');

const dayDetails = {
  thu: {
    date: 'Thursday, September 17',
    title: 'Arrivals',
    subtitle: 'Get to Indianapolis, settle in, and ease into the weekend.',
    events: [
      { time: 'TBD PM', type: 'golf', label: 'Optional Golf', title: 'Practice Round', location: 'TBD', body: 'Optional round for anyone arriving early and looking to get loose before the main two days.' },
      { time: '4:00 PM', type: 'logistics', label: 'Arrival', title: 'Hotel Check-In', location: 'Hotel Broad Ripple', body: 'Room block is set. Indicate interest in a room on the registration form.' },
      { time: '7:00 PM', type: 'meal', label: 'Dinner', title: 'Welcome Dinner', location: 'Indianapolis · TBD', body: 'Opening night dinner, pairings, weekend rules, gear handout, and first round of bad predictions.' }
    ]
  },
  fri: {
    date: 'Friday, September 18',
    title: 'Opening Loop',
    subtitle: 'The first official round of The Hometown Invitational.',
    events: [
      { time: 'AM', type: 'free', label: 'Free Time', title: 'Breakfast / Warm-Up', location: 'Broad Ripple or MHCC', body: 'Keep the morning easy before heading to Meridian Hills.' },
      { time: 'TBD', type: 'golf', label: 'Golf · Round 1', title: 'Meridian Hills Country Club', location: '7099 Spring Mill Rd', body: 'Opening round in Indianapolis. Tee times and groups to be posted once the final field is set.' },
      { time: 'After Golf', type: 'meal', label: 'Drinks', title: 'Post-Round Hang', location: 'MHCC / Broad Ripple', body: 'Scorecards, side bets, and the first official leaderboard update.' },
      { time: 'TBD PM', type: 'meal', label: 'Dinner', title: 'Friday Dinner', location: 'TBD', body: 'Casual dinner near home base before the Saturday road round.' }
    ]
  },
  sat: {
    date: 'Saturday, September 19',
    title: 'Main Event',
    subtitle: 'Road game to Harrison Lake and the championship round.',
    events: [
      { time: 'AM', type: 'logistics', label: 'Travel', title: 'Drive to Harrison Lake', location: 'Columbus, Indiana', body: 'Plan carpools and departure time once tee times are finalized.' },
      { time: 'TBD', type: 'golf', label: 'Golf · Round 2', title: 'Harrison Lake Country Club', location: '588 S. Country Club Rd', body: 'Main event round. Final leaderboard, format, and pairings will live here.' },
      { time: 'After Golf', type: 'meal', label: 'Dinner', title: 'Closing Dinner & Awards', location: 'TBD', body: 'Trophy presentation, awards, weekend recap, and the first push toward 2027.' }
    ]
  },
  sun: {
    date: 'Sunday, September 20',
    title: 'Send-Off',
    subtitle: 'Optional golf, brunch, and departures.',
    events: [
      { time: 'AM', type: 'golf', label: 'Optional Golf', title: 'Send-Off Round', location: 'TBD', body: 'Optional final loop for anyone with later travel.' },
      { time: 'TBD', type: 'meal', label: 'Meal', title: 'Brunch / Goodbyes', location: 'TBD', body: 'Easy final meal before everyone gets on the road or heads to the airport.' },
      { time: 'After Brunch', type: 'logistics', label: 'Departure', title: 'Depart Indianapolis', location: 'IND / Road', body: 'Safe travels home. Already counting down to next year.' }
    ]
  }
};

let activeDay = 'thu';
let activeFilter = 'all';

function updateCountdown() {
  const now = new Date();
  const diff = Math.max(0, tripStart - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

function renderSchedule() {
  const day = dayDetails[activeDay];
  const events = activeFilter === 'all' ? day.events : day.events.filter(event => event.type === activeFilter);
  const summary = document.getElementById('daySummary');
  const timeline = document.getElementById('timeline');

  summary.innerHTML = `
    <p class="date">${day.date}</p>
    <h3>${day.title}</h3>
    <p>${day.subtitle}</p>
    <p><strong>${events.length}</strong> item${events.length === 1 ? '' : 's'} shown</p>
  `;

  timeline.innerHTML = events.map(event => `
    <article class="timeline-item" data-type="${event.type}">
      <div class="timeline-time">${event.time}</div>
      <div>
        <div class="timeline-label">${event.label}</div>
        <h3>${event.title}</h3>
        <p><strong>${event.location}</strong> · ${event.body}</p>
      </div>
    </article>
  `).join('') || '<p>No items match this filter yet.</p>';
}

function bindControls() {
  document.querySelectorAll('.day-tab').forEach(button => {
    button.addEventListener('click', () => {
      activeDay = button.dataset.day;
      document.querySelectorAll('.day-tab').forEach(tab => {
        tab.classList.toggle('active', tab === button);
        tab.setAttribute('aria-selected', tab === button ? 'true' : 'false');
      });
      renderSchedule();
    });
  });

  document.querySelectorAll('.filter').forEach(button => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      document.querySelectorAll('.filter').forEach(filter => filter.classList.toggle('active', filter === button));
      renderSchedule();
    });
  });
}

updateCountdown();
setInterval(updateCountdown, 1000);
bindControls();
renderSchedule();
