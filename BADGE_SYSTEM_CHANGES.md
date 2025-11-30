# Badge System & Persistent Chat Implementation

## Summary of Changes

### 1. **Database Models Created**

#### `/server/models/User.js` - NEW
- Tracks user information and badges
- Badge tiers based on reports submitted:
  - 🌱 Novice: 1-4 reports (badgeLevel: 1)
  - ⭐ Helper: 5-9 reports (badgeLevel: 2)
  - 🏆 Champion: 10-24 reports (badgeLevel: 3)
  - 👑 Hero: 25+ reports (badgeLevel: 4)
- `updateBadge()` method automatically updates badge tier

#### `/server/models/Chat.js` - NEW
- Stores last 100 community chat messages
- Persists userName, badge, badgeLevel, text, createdAt
- Auto-cleanup with TTL (30 days expiration)

### 2. **Backend API Routes**

#### `/server/routes/users.js` - NEW
- `GET /api/users/:name` - Get/create user and retrieve badge info
- `POST /api/users/:name/report-submitted` - Increment report count and update badge
- `GET /api/users/leaderboard/top` - Get top 10 users by reports (for future use)

#### `/server/routes/chat.js` - NEW
- `GET /api/chat` - Retrieve last 100 messages from MongoDB
- `POST /api/chat` - Send new message (stores with user's current badge)
- Auto-deletes messages beyond 100 to keep only latest

#### `/server/index.js` - UPDATED
- Registered new routes: `/api/users` and `/api/chat`
- Imported `usersRoute` and `chatRoute`

### 3. **Frontend Updates**

#### `/client/src/api.js` - UPDATED
**New Functions:**
- `getUserBadge(name)` - GET user's current badge and report count
- `incrementUserReports(name)` - POST to increment user's reports
- `getChatMessages()` - GET last 100 messages
- `sendChatMessage(payload)` - POST new message with badge info

#### `/client/src/pages/PostComplaint.jsx` - UPDATED
- Removed: Wallet/rupee reward tracking (`userReports` localStorage)
- Added: `incrementUserReports(userName)` call on successful submission
- Now calls API to update user badge on MongoDB
- Stores badge in localStorage for display in Profile and Chat

#### `/client/src/pages/Profile.jsx` - UPDATED
- **Replaced:** Wallet system → Badge system
- **Displays:**
  - Large badge emoji (🌱, ⭐, 🏆, 👑) based on tier
  - Badge name (Novice, Helper, Champion, Hero)
  - Reports submitted count
  - Requirements for next tier
- **Loads:** User badge from server on mount, falls back to localStorage

#### `/client/src/pages/CommunityChat.jsx` - UPDATED
- **Replaced:** localStorage-only chat → MongoDB-backed persistent chat
- **New Features:**
  - Loads last 100 messages from MongoDB
  - Displays user badge emoji and name next to each message
  - Shows badge tier label on each message
  - Auto-refreshes chat every 3 seconds
  - Sends message with current user's badge info
- **UI Improvements:**
  - Badge emoji displayed next to sender name
  - Color-coded badge label
  - Loading states while sending/fetching

### 4. **Data Flow**

```
User submits report
    ↓
PostComplaint calls createReport() + incrementUserReports(name)
    ↓
Backend increments reportsSubmitted & updates badge tier
    ↓
Profile loads getUserBadge() → displays updated badge
    ↓
CommunityChat sends messages with badge info to MongoDB
    ↓
Chat messages stored with userName + badge + text
    ↓
All users fetch last 100 messages, see badges next to names
```

### 5. **Badge Tier Progression**

| Reports | Badge | Emoji | Level |
|---------|-------|-------|-------|
| 1-4 | Novice | 🌱 | 1 |
| 5-9 | Helper | ⭐ | 2 |
| 10-24 | Champion | 🏆 | 3 |
| 25+ | Hero | 👑 | 4 |

### 6. **MongoDB Collections**

**Users Collection:**
```
{
  _id: ObjectId,
  name: String,
  reportsSubmitted: Number,
  badge: String,  // "Novice" | "Helper" | "Champion" | "Hero"
  badgeLevel: Number,  // 1-4
  createdAt: Date
}
```

**Chat Collection:**
```
{
  _id: ObjectId,
  userName: String,
  badge: String,  // User's badge at time of message
  badgeLevel: Number,
  text: String,
  createdAt: Date (expires after 30 days)
}
```

### 7. **Removed Features**

- ❌ Wallet balance system (localStorage)
- ❌ Rupee rewards (10 rupees per report)
- ❌ "Claim Rewards" button
- ❌ localStorage-only chat (non-persistent)

### 8. **Testing Checklist**

✅ Users with no reports show 🌱 Novice badge
✅ After 5 reports, badge updates to ⭐ Helper
✅ Profile displays correct badge emoji and count
✅ Chat messages persist in MongoDB (survives page refresh)
✅ Chat messages show sender's badge next to name
✅ Last 100 messages are retained in MongoDB
✅ Auto-refresh loads new messages every 3 seconds
✅ Badge increments when posting reports
✅ Multiple users see their respective badges in chat

### 9. **File Summary**

| File | Type | Status |
|------|------|--------|
| `/server/models/User.js` | Created | ✅ NEW |
| `/server/models/Chat.js` | Created | ✅ NEW |
| `/server/routes/users.js` | Created | ✅ NEW |
| `/server/routes/chat.js` | Created | ✅ NEW |
| `/server/index.js` | Updated | ✅ Routes added |
| `/client/src/api.js` | Updated | ✅ 5 new functions |
| `/client/src/pages/Profile.jsx` | Updated | ✅ Badge system |
| `/client/src/pages/PostComplaint.jsx` | Updated | ✅ Badge tracking |
| `/client/src/pages/CommunityChat.jsx` | Updated | ✅ MongoDB + badges |

