# Quick Start: Verse Sharing

## What's Been Implemented

✅ **Complete verse sharing system** with the following features:

### 1. Native Share Functionality

- Users can now tap "Share" on any verse to share it
- Generates shareable links like: `https://yourbibleapp.com/verse/Genesis/1/1`
- Includes verse text, reference, and link in the share message
- Fallback to clipboard if sharing fails

### 2. Deep Link Support

- Custom URL scheme: `myapp://verse/BookName/Chapter/Verse`
- Universal links: `https://yourbibleapp.com/verse/BookName/Chapter/Verse`
- Automatic navigation to the specific verse when links are opened
- Support for different Bible translations via query parameters

### 3. Files Added/Modified

**New Files:**

- `utils/sharing/verseSharing.ts` - Core sharing utilities
- `utils/linking/linkingConfig.ts` - Deep link configuration
- `hooks/useDeepLinking.ts` - React hook for deep link handling
- `VERSE_SHARING_SETUP.md` - Complete setup guide

**Modified Files:**

- `components/Reading/VerseActionsBottomSheet/VerseActionsBottomSheet.tsx` - Added share functionality
- `app/(authed)/(tabs)/(read)/[bookName]/reading.tsx` - Pass translation to share
- `app/_layout.tsx` - Added deep link initialization
- `app.json` - Added universal link configuration

## What You Need To Do

### 1. Get Your Own Domain (Required)

- Purchase a domain (e.g., `yourbibleapp.com`)
- Set up basic web hosting
- Create a landing page for shared links

### 2. Update Configuration

Replace `yourbibleapp.com` with your domain in:

- `utils/sharing/verseSharing.ts` (line 6)
- `utils/linking/linkingConfig.ts` (lines 8-9)
- `app.json` (lines 10, 17, 32, 36)

### 3. Set Up Universal Links

- Upload `apple-app-site-association` file to `/.well-known/`
- Upload `assetlinks.json` file to `/.well-known/`
- Update bundle identifiers in `app.json`

## Testing (Works Now with Custom Scheme)

You can test the sharing feature immediately with the custom scheme:

```bash
# iOS Simulator
xcrun simctl openurl booted "myapp://verse/Genesis/1/1"

# Android
adb shell am start -W -a android.intent.action.VIEW -d "myapp://verse/Genesis/1/1" com.anonymous.mobile
```

## How It Works

1. **User shares a verse** → System generates link with verse info
2. **Link is shared** → Contains both web URL and verse text
3. **Recipient clicks link** → Opens directly to that verse in your app
4. **Fallback handling** → If app not installed, goes to web page/app store

## Example Share Message

When a user shares John 3:16, the message looks like:

```
"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."

— John 3:16 (NIV)

Read more: https://yourbibleapp.com/verse/John/3/16
```

## Full Setup

For complete setup including domain configuration, see `VERSE_SHARING_SETUP.md`.

The sharing feature is **ready to use** with custom schemes right now, and will work with universal links once you set up your domain!
