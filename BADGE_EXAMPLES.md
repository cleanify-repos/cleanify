# Badge System Examples & Progression

## How Badge Progression Works

### Example User Journey

**Day 1: Vivek posts his first report**
```
Reports Submitted: 1
Badge: 🌱 Novice
BadgeLevel: 1
Progress: "Keep posting! 4 more reports to Helper tier"
```

Profile shows:
- Emoji: 🌱
- Title: Novice
- Count: "Reports Submitted: 1"
- Info: "🌱 Novice - 1-4 reports"

Chat display:
```
Vivek 🌱 Novice: "Just posted a garbage issue at MG Road"
```

---

**Day 5: Vivek posts 5th report**
```
Reports Submitted: 5
Badge: ⭐ Helper
BadgeLevel: 2
Progress: "You're helping! 5 more reports to Champion tier"
```

Profile shows:
- Emoji: ⭐
- Title: Helper
- Count: "Reports Submitted: 5"
- Info: "⭐ Helper - 5-9 reports"

Chat display:
```
Vivek ⭐ Helper: "Found another issue to report"
```

---

**Day 15: Vivek posts 10th report**
```
Reports Submitted: 10
Badge: 🏆 Champion
BadgeLevel: 3
Progress: "Champion! 15 more reports to Hero tier"
```

Profile shows:
- Emoji: 🏆
- Title: Champion
- Count: "Reports Submitted: 10"
- Info: "🏆 Champion - 10-24 reports"

Chat display:
```
Vivek 🏆 Champion: "Keep the city clean everyone!"
```

---

**Day 30: Vivek posts 25th report**
```
Reports Submitted: 25
Badge: 👑 Hero
BadgeLevel: 4
Progress: "You're a Hero! Keep it up!"
```

Profile shows:
- Emoji: 👑
- Title: Hero
- Count: "Reports Submitted: 25"
- Info: "👑 Hero - 25+ reports"

Chat display:
```
Vivek 👑 Hero: "The city is looking cleaner thanks to all of us!"
```

---

## Badge Tier Requirements

| Tier | Emoji | Reports | Progress |
|------|-------|---------|----------|
| Novice | 🌱 | 1-4 | "Keep posting! 4 more to Helper" |
| Helper | ⭐ | 5-9 | "You're helping! 5 more to Champion" |
| Champion | 🏆 | 10-24 | "Champion! 15 more to Hero" |
| Hero | 👑 | 25+ | "You're a Hero! Keep it up!" |

---

## API Response Examples

### Get User Badge
```
GET /api/users/Vivek

Response:
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Vivek",
  "reportsSubmitted": 10,
  "badge": "Champion",
  "badgeLevel": 3,
  "createdAt": "2024-11-25T10:00:00Z"
}
```

### After Posting Report
```
POST /api/users/Vivek/report-submitted

Response:
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Vivek",
  "reportsSubmitted": 11,
  "badge": "Champion",
  "badgeLevel": 3,
  "createdAt": "2024-11-25T10:00:00Z"
}
```

### Get Chat Messages
```
GET /api/chat

Response:
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "userName": "Vivek",
    "badge": "Champion",
    "badgeLevel": 3,
    "text": "Found garbage at the park today",
    "createdAt": "2024-11-30T09:00:00Z"
  },
  {
    "_id": "507f1f77bcf86cd799439013",
    "userName": "Priya",
    "badge": "Helper",
    "badgeLevel": 2,
    "text": "Let's organize a cleanup!",
    "createdAt": "2024-11-30T09:05:00Z"
  },
  {
    "_id": "507f1f77bcf86cd799439014",
    "userName": "Vikram",
    "badge": "Novice",
    "badgeLevel": 1,
    "text": "Just posted my first report!",
    "createdAt": "2024-11-30T09:10:00Z"
  }
]
```

### Send Chat Message
```
POST /api/chat

Request Body:
{
  "userName": "Vivek",
  "text": "Just reported a drain issue",
  "badge": "Champion",
  "badgeLevel": 3
}

Response:
{
  "_id": "507f1f77bcf86cd799439015",
  "userName": "Vivek",
  "badge": "Champion",
  "badgeLevel": 3,
  "text": "Just reported a drain issue",
  "createdAt": "2024-11-30T10:15:00Z"
}
```

---

## UI Display Examples

### Profile Page - Badge Card

**For Novice User (1 report):**
```
┌─────────────────────────────────┐
│            🌱                   │
│          Novice                 │
│       Badge Status              │
│                                 │
│  Reports Submitted: 1           │
│  🌱 Novice - 1-4 reports       │
└─────────────────────────────────┘
```

**For Champion User (15 reports):**
```
┌─────────────────────────────────┐
│            🏆                   │
│         Champion                │
│       Badge Status              │
│                                 │
│  Reports Submitted: 15          │
│  🏆 Champion - 10-24 reports   │
└─────────────────────────────────┘
```

**For Hero User (30 reports):**
```
┌─────────────────────────────────┐
│            👑                   │
│           Hero                  │
│       Badge Status              │
│                                 │
│  Reports Submitted: 30          │
│  👑 Hero - 25+ reports         │
└─────────────────────────────────┘
```

### Community Chat Display

```
Chat Messages:

Vivek 🌱 Novice: Just posted my first report!
  └─ Message time: today at 9:30 AM

Priya ⭐ Helper: That's great! Keep going
  └─ Message time: today at 9:35 AM

Vikram 🏆 Champion: Welcome to the Swachhata community!
  └─ Message time: today at 9:40 AM

Anjali 👑 Hero: Awesome work everyone!
  └─ Message time: today at 9:45 AM
```

---

## Badge Auto-Update Examples

### Scenario 1: Posting Report
```
User: John (currently Novice with 2 reports)

Action: Submits a new report
  ↓
Backend: incrementUserReports("John")
  ↓
Backend: john.reportsSubmitted = 3
  ↓
Backend: john.updateBadge()
  └─ 3 reports → Still in 1-4 range
  └─ badge stays "Novice"
  └─ badgeLevel stays 1
  ↓
User's profile still shows: 🌱 Novice
```

### Scenario 2: Reaching Next Tier
```
User: Sarah (currently Novice with 4 reports)

Action: Posts 5th report
  ↓
Backend: incrementUserReports("Sarah")
  ↓
Backend: sarah.reportsSubmitted = 5
  ↓
Backend: sarah.updateBadge()
  └─ 5 reports → In 5-9 range
  └─ badge changes to "Helper"
  └─ badgeLevel changes to 2
  ↓
User's profile now shows: ⭐ Helper
Chat messages from now on show: Sarah ⭐ Helper
```

### Scenario 3: Multiple Tier Jumps
```
User: Admin (currently Novice with 3 reports)

Action: Manually adds user to database with 25 reports
  ↓
Backend: user.updateBadge()
  ↓
updateBadge checks:
  ├─ 25 >= 25? YES → badge = "Hero", badgeLevel = 4
  ├─ 25 >= 10? YES but 25 >= 25 already true
  ├─ 25 >= 5? YES but already handled
  └─ Final: Hero (badgeLevel 4)
  ↓
User profile shows: 👑 Hero (jumps from 🌱 to 👑)
```

---

## Badge Persistence

### User Profile Persistence
```
Database: Users Collection

Document 1:
{
  name: "Vivek",
  reportsSubmitted: 10,
  badge: "Champion",
  badgeLevel: 3,
  createdAt: 2024-11-25
}

Browser Restart → Data still there!
Load profile → Get user from DB → Same badge persists
```

### Chat Persistence
```
Database: Chat Collection

Document 1: { userName: "Vivek", badge: "Champion", text: "...", createdAt: ... }
Document 2: { userName: "Priya", badge: "Helper", text: "...", createdAt: ... }
...
Document 100: { userName: "Vikram", badge: "Novice", text: "...", createdAt: ... }
Document 101: Automatically deleted (only 100 kept)

Browser Restart → Messages still there!
Load chat → Get 100 messages from DB → Chat history intact
```

---

## Badge Update Triggers

Badge is automatically recalculated whenever:
1. ✅ User posts a new report
2. ✅ Admin manually increments reports count
3. ✅ Badge logic is called explicitly

Automatic recalculation logic in `updateBadge()`:
```javascript
if (reportsSubmitted >= 25) → 👑 Hero (level 4)
else if (reportsSubmitted >= 10) → 🏆 Champion (level 3)
else if (reportsSubmitted >= 5) → ⭐ Helper (level 2)
else → 🌱 Novice (level 1)
```

---

## Testing Scenarios

### Test 1: First Time User
1. New user enters app
2. Posts first report
3. Check: Badge shows 🌱 Novice
4. Check: Profile shows "Reports Submitted: 1"
5. Check: Chat message shows user badge

### Test 2: Badge Progression
1. Create test user with 3 reports
2. Post 1 new report (total 4)
3. Check: Still 🌱 Novice
4. Post 1 more report (total 5)
5. Check: Now ⭐ Helper

### Test 3: Chat Persistence
1. Send message in chat
2. Refresh page
3. Check: Message still there with badge
4. Clear browser data
5. Check: Message still there (from MongoDB)

### Test 4: Multiple Users
1. User A posts report → Gets 🌱 Novice
2. User B posts 5 reports → Gets ⭐ Helper
3. User C posts 15 reports → Gets 🏆 Champion
4. All in chat: Each shows their own badge

---

