
/* eslint-disable no-template-curly-in-string */

import { config as dotenv } from 'dotenv'
import type { Configuration } from 'electron-builder'
import { resolve } from 'path'

dotenv()

const linuxPackageScripts = {
  afterInstall: 'build/linux/after-install.tpl',
  afterRemove: 'build/linux/after-remove.tpl',
  appArmorProfile: 'build/linux/apparmor-profile.tpl',
  fpm: [`--after-upgrade=${resolve(__dirname, 'linux', 'after-install.tpl')}`],
}

export const config = {
  productName: 'Ember Launcher',
  appId: 'com.ember.launcher',

  directories: {
    output: 'build/output',
    buildResources: 'build',
    app: '.',
  },

  protocols: {
    name: 'Ember Launcher',
    schemes: ['ember', 'xmcl'],
  },

  // GitHub Releases and auto-updates
  publish: [{
    provider: 'github',
    owner: 'danieloxby5-sketch',
    repo: 'EmberLauncher',
  }],

  files: [{
    from: 'dist',
    to: '.',
    filter: [
      '**/*.js',
      '**/*.ico',
      '**/*.png',
      '**/*.webp',
      '**/*.svg',
      '*.node',
      '*.dll',
      '**/*.html',
      '**/*.css',
      '**/*.woff2',
      '**/*.wasm',
    ],
  }, {
    from: '.',
    to: '.',
    filter: 'package.json',
  }],

  extraResources: [{
    from: 'main/agent-documents',
    to: 'agent-documents',
    filter: ['**/*.md'],
  }],

  artifactName: 'Ember-Launcher-${version}-${platform}-${arch}.${ext}',

  appx: {
    displayName: 'Ember Launcher',
    applicationId: 'xmcl',
    identityName: 'xmcl',
    backgroundColor: 'transparent',
    publisher: process.env.PUBLISHER,
    publisherDisplayName: 'CI010',
    setBuildNumber: true,
  },

  dmg: {
    artifactName: 'Ember-Launcher-${version}-${arch}.${ext}',
    contents: [
      {
        x: 410,
        y: 150,
        type: 'link',
        path: '/Applications',
      },
      {
        x: 130,
        y: 150,
        type: 'file',
      },
    ],
  },

  mac: {
    icon: 'icons/dark.icns',
    darkModeSupport: true,
    target: [
      {
        target: 'dmg',
        arch: ['arm64', 'x64'],
      },
    ],
    extendInfo: {
      NSLocalNetworkUsageDescription: 'Ember Launcher and Minecraft need access to your local network to discover and connect to LAN games and servers.',
      NSMicrophoneUsageDescription: 'A Minecraft mod wants to access your microphone.',
      NSCameraUsageDescription: 'Please give us access to your camera',
      'com.apple.security.device.audio-input': true,
      'com.apple.security.device.camera': true,
    },
  },

  win: {
    signtoolOptions: {
      certificateFile: undefined as string | undefined,
      publisherName: 'CI010',
    },
    icon: 'icons/dark.ico',
    electronLanguages: ['en-US'],
    target: [
      {
        target: 'nsis',
        arch: ['x64'],
      },
      {
        target: 'zip',
        arch: ['x64'],
      },
    ],
  },

  linux: {
    executableName: 'ember-launcher',
    electronLanguages: ['en-US'],
    desktop: {
      entry: {
        MimeType: 'x-scheme-handler/xmcl',
        StartupWMClass: 'ember-launcher',
      },
    },
    category: 'Game',
    icon: 'icons/dark.icns',
    artifactName: 'Ember-Launcher-${version}-${arch}.${ext}',
    target: [
      { target: 'deb', arch: ['x64', 'arm64'] },
      { target: 'rpm', arch: ['x64', 'arm64'] },
      { target: 'AppImage', arch: ['x64', 'arm64'] },
      { target: 'tar.xz', arch: ['x64', 'arm64'] },
      { target: 'pacman', arch: ['x64', 'arm64'] },
    ],
  },

  deb: linuxPackageScripts,
  rpm: linuxPackageScripts,
  pacman: linuxPackageScripts,

  snap: {
    publish: ['github'],
  },
} satisfies Configuration

