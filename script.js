const tripStart = new Date('2026-09-17T16:00:00-04:00');

const dayDetails = {
  thu: {
    date: 'Thursday, September 17',
    title: 'Arrivals',
    subtitle: 'Get to Indianapolis, settle in, and ease into the weekend.',
    events: [
      {
        time: 'TBD PM',
        type: 'logistics',
        label: 'Arrival',
        title: 'Arrivals / Hotel Check-In',
        location: 'Hotel Broad Ripple',
        body: 'Room block is set. Indicate interest in a room on the registration form.'
      },
      {
        time: 'TBD',
        type: 'meal',
        label: 'Welcome',
        title: 'Welcome Plans',
        location: 'TBD',
        body: 'Light Thursday plans will be finalized around arrival times and group size.'
      }
    ]
  },

  fri: {
    date: 'Friday, September 18',
    title: 'Opening Loop',
    subtitle: 'Two rounds at Meridian Hills with drinks and dinner on property.',
    events: [
      {
        time: '7:00 AM',
        type: 'golf',
        label: 'Golf · Morning Tee Times',
        title: 'Meridian Hills Country Club',
        location: '7099 Spring Mill Rd',
        body: 'Morning tee times: 7:00, 7:10, 7:20, and 7:30 AM.'
      },
      {
        time: '1:00 PM',
        type: 'golf',
        label: 'Golf · Afternoon Tee Times',
        title: 'Meridian Hills Country Club',
        location: '7099 Spring Mill Rd',
        body: 'Afternoon tee times: 1:00, 1:10, 1:20, and 1:30 PM.'
      },
      {
        time: 'After Golf',
        type: 'meal',
        label: 'Drinks & Dinner',
        title: 'Post-Round Drinks and Dinner',
        location: 'Meridian Hills Country Club',
        body: 'Drinks, scorecards, side bets, leaderboard update, and dinner will all be on property at Meridian Hills.'
      }
    ]
  },

  sat: {
    date: 'Saturday, September 19',
    title: 'Main Event',
    subtitle: 'Bus to Harrison Lake, championship round, then back to Broad Ripple.',
    events: [
      {
        time: '7:00 AM',
        type: 'logistics',
        label: 'Bus Departure',
        title: 'Depart for Harrison Lake',
        location: 'Location TBD',
        body: 'Bus departs at 7:00 AM. Exact pickup location will be finalized closer to the event.'
      },
      {
        time: 'On the Bus',
        type: 'meal',
        label: 'Breakfast',
        title: 'Breakfast on the Bus',
        location: 'En route to Harrison Lake',
        body: 'Breakfast will be provided on the bus before the Saturday round.'
      },
      {
        time: '8:30 AM',
        type: 'golf',
        label: 'Golf · Main Event',
        title: 'Harrison Lake Country Club',
        location: '588 S. Country Club Rd, Columbus',
        body: 'Saturday tee times: 8:30, 8:40, 8:50, and 9:00 AM.'
      },
      {
        time: 'After Golf',
        type: 'logistics',
        label: 'Return',
        title: 'Return to Indianapolis',
        location: 'Broad Ripple',
        body: 'Bus returns to Indianapolis after the round.'
      },
      {
        time: 'Afternoon',
        type: 'meal',
        label: 'College Football',
        title: "Kilroy's Broad Ripple",
        location: "Kilroy's · Broad Ripple",
        body: 'College football, drinks, and post-round hang after returning to Indy.'
      },
      {
        time: 'TBD',
        type: 'meal',
        label: 'Closing Dinner',
        title: 'Closing Dinner & Awards',
        location: 'Time and location TBD',
        body: 'Final leaderboard, awards, weekend recap, and the official close of the first Hometown Invitational.'
      }
    ]
  },

  sun: {
    date: 'Sunday, September 20',
    title: 'Departures',
    subtitle: 'Head home. Nothing formal scheduled.',
    events: [
      {
        time: 'AM',
        type: 'logistics',
        label: 'Departure',
        title: 'Depart Indianapolis',
        location: 'IND / Road',
        body: 'No formal Sunday plans. Safe travels home.'
      }
    ]
  }
};

let activeDay = 'thu';
let activeFilter = 'all';

function updateCountdown() {
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const now = new Date();
  const diff = Math.max(0, tripStart - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = days;
  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}

function renderSchedule() {
  const day = dayDetails[activeDay];
  const events = activeFilter === 'all'
    ? day.events
    : day.events.filter(event => event.type === activeFilter);

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

      document.querySelectorAll('.filter').forEach(filter => {
        filter.classList.toggle('active', filter === button);
      });

      renderSchedule();
    });
  });
}

updateCountdown();
setInterval(updateCountdown, 1000);
bindControls();
renderSchedule();
