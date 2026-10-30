# Ember Launcher — Discord Rich Presence setup

This source archive is configured to use your Discord Application ID:

`1565756654094520401`

## Discord Developer Portal

1. Open https://discord.com/developers/applications and select **Ember Launcher**.
2. Under **Rich Presence → Art Assets** (the label may vary), upload the Ember icon.
3. Name the uploaded asset exactly `dark_512` (lowercase). The launcher code references this image key.
4. Keep Discord desktop app running while testing.

## Build on macOS

From the extracted project root, run:

```bash
npx --yes pnpm@11.10.0 build
```

Then open the newly built app from:

`xmcl-electron-app/build/output/mac-arm64/Ember Launcher.app`

In Ember Launcher settings, make sure Discord Presence is enabled. The activity is sent only while the launcher is active; the current code clears it when a Minecraft game starts.

This archive changes the Discord application ID only. It does not replace the launcher UI or alter the existing presence wording/behavior.
