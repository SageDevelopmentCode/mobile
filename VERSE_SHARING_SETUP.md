# Verse Sharing Setup Guide

This guide will help you set up verse sharing functionality for your Bible app, including deep linking and domain configuration.

## Overview

The verse sharing system allows users to:

- Share verses with a shareable link that opens directly to that verse
- Deep link support for both custom app schemes and universal links
- Fallback to clipboard copying if sharing fails
- Support for different Bible translations

## Required Components

### 1. Domain Setup (Required for Universal Links)

You'll need your own domain to create shareable web links. Here's what you need to do:

#### Purchase and Configure Domain

1. **Purchase a domain** (e.g., `yourbibleapp.com`)
2. **Set up basic hosting** or use a service like:
   - Netlify
   - Vercel
   - GitHub Pages
   - Firebase Hosting

#### Create Web Landing Page

Create a simple web page that handles incoming links and redirects to your app:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Bible Verse - Your Bible App</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script>
      // Extract verse information from URL
      function parseVerseFromURL() {
        const path = window.location.pathname;
        const urlParams = new URLSearchParams(window.location.search);

        // Parse: /verse/Genesis/1/1
        const pathParts = path.split("/").filter((part) => part.length > 0);

        if (pathParts.length >= 4 && pathParts[0] === "verse") {
          return {
            book: decodeURIComponent(pathParts[1]),
            chapter: pathParts[2],
            verse: pathParts[3],
            translation: urlParams.get("translation") || "NIV",
          };
        }
        return null;
      }

      // Attempt to open the app, fallback to app store
      function openApp() {
        const verseInfo = parseVerseFromURL();
        if (!verseInfo) return;

        // Try to open the app with deep link
        const deepLink = `myapp://verse/${encodeURIComponent(verseInfo.book)}/${
          verseInfo.chapter
        }/${verseInfo.verse}?translation=${verseInfo.translation}`;

        // Create invisible iframe to trigger app
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src = deepLink;
        document.body.appendChild(iframe);

        // Fallback to app store after delay
        setTimeout(() => {
          // Replace with your actual app store URLs
          const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
          const appStoreURL = isIOS
            ? "https://apps.apple.com/app/your-bible-app/id123456789"
            : "https://play.google.com/store/apps/details?id=com.anonymous.mobile";

          window.location.href = appStoreURL;
        }, 2000);
      }

      // Run when page loads
      window.onload = openApp;
    </script>
  </head>
  <body>
    <div
      style="text-align: center; padding: 50px; font-family: Arial, sans-serif;"
    >
      <h1>Opening Bible Verse...</h1>
      <p>
        If the app doesn't open automatically,
        <a href="#" onclick="openApp()">click here</a>
      </p>
      <p>Don't have the app? Download it from your app store.</p>
    </div>
  </body>
</html>
```

### 2. Apple App Site Association (iOS Universal Links)

Create a file called `apple-app-site-association` (no extension) in your domain's `/.well-known/` directory:

```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "TEAMID.com.anonymous.mobile",
        "paths": ["/verse/*"]
      }
    ]
  }
}
```

**Important**: Replace `TEAMID` with your actual Apple Developer Team ID.

### 3. Android App Links (Android Universal Links)

Create a file called `assetlinks.json` in your domain's `/.well-known/` directory:

```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.anonymous.mobile",
      "sha256_cert_fingerprints": ["YOUR_APP_SHA256_FINGERPRINT"]
    }
  }
]
```

**Important**: Replace `YOUR_APP_SHA256_FINGERPRINT` with your app's SHA256 fingerprint.

## Configuration Steps

### 1. Update Domain Configuration

In your project files, replace all instances of `yourbibleapp.com` with your actual domain:

- `utils/sharing/verseSharing.ts` (line 6)
- `utils/linking/linkingConfig.ts` (line 8-9)
- `app.json` (lines 10, 17, 32, 36)

### 2. Update App Configuration

In `app.json`, update the following:

```json
{
  "expo": {
    "name": "Your Bible App Name",
    "scheme": "yourbibleapp", // Custom scheme (should match your app)
    "universalLinks": {
      "domains": ["yourdomain.com", "www.yourdomain.com"]
    },
    "ios": {
      "bundleIdentifier": "com.yourteam.yourbibleapp",
      "associatedDomains": [
        "applinks:yourdomain.com",
        "applinks:www.yourdomain.com"
      ]
    },
    "android": {
      "package": "com.yourteam.yourbibleapp",
      "intentFilters": [
        {
          "action": "VIEW",
          "autoVerify": true,
          "data": [
            {
              "scheme": "https",
              "host": "yourdomain.com"
            }
          ],
          "category": ["BROWSABLE", "DEFAULT"]
        }
      ]
    }
  }
}
```

### 3. Testing

#### Test Deep Links (Development)

```bash
# iOS Simulator
xcrun simctl openurl booted "myapp://verse/Genesis/1/1"

# Android Emulator
adb shell am start -W -a android.intent.action.VIEW -d "myapp://verse/Genesis/1/1" com.anonymous.mobile
```

#### Test Universal Links

1. Send yourself a link via Messages/Email: `https://yourdomain.com/verse/Genesis/1/1`
2. Tap the link - it should open your app directly

## Usage in App

### Sharing a Verse

The sharing functionality is automatically available when users:

1. Long press on a verse in the reading screen
2. Tap "Share" in the verse actions menu
3. The system will generate a shareable link and open the native share sheet

### Link Format

Generated links follow this format:

- Web: `https://yourdomain.com/verse/Genesis/1/1?translation=NIV`
- Deep link: `myapp://verse/Genesis/1/1?translation=NIV`

### Supported Features

- All Bible books (URL encoded for special characters)
- Chapter and verse navigation
- Translation support (query parameter)
- Fallback to clipboard if sharing fails
- Automatic app opening from shared links

## Deployment Checklist

- [ ] Domain purchased and configured
- [ ] Web landing page deployed
- [ ] Apple App Site Association file uploaded
- [ ] Android Asset Links file uploaded
- [ ] App.json updated with your domain
- [ ] Bundle identifier updated
- [ ] App submitted to app stores with universal link support
- [ ] Deep link testing completed
- [ ] Universal link testing completed

## Troubleshooting

### Universal Links Not Working

1. Verify `apple-app-site-association` is accessible at `https://yourdomain.com/.well-known/apple-app-site-association`
2. Check that the file has correct MIME type (application/json)
3. Verify Team ID and bundle identifier are correct
4. Test on a physical device (simulator may not work for universal links)

### Deep Links Not Working

1. Verify URL scheme is correctly configured in app.json
2. Check that the app is properly built with the configuration
3. Test with the exact scheme format: `myapp://verse/BookName/Chapter/Verse`

### Android App Links Issues

1. Verify `assetlinks.json` is accessible at `https://yourdomain.com/.well-known/assetlinks.json`
2. Check SHA256 fingerprint matches your app's signature
3. Use Android's App Link Verification tool

## Additional Features

### Analytics (Optional)

Consider adding analytics to track:

- How often verses are shared
- Which verses are most popular
- Conversion rate from shared links to app opens

### Custom Share Messages

You can customize the share message format in `utils/sharing/verseSharing.ts`:

- `formatVerseForSharing()` - Main sharing text
- `getSocialShareMessage()` - Social media optimized format

### Fallback Behavior

The system includes multiple fallbacks:

1. Native Share API (primary)
2. Web Share API (web)
3. Clipboard copy (last resort)
4. Error handling with user feedback
