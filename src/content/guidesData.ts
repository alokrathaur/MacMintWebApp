export interface GuideItem {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  screenshot: string;
  toc: string[];
  steps: {
    heading: string;
    content: string;
    tip?: string;
  }[];
  warnings: string[];
  tips: string[];
  related: string[];
}

export const GUIDES: Record<string, GuideItem> = {
  "check-mac-storage": {
    slug: "check-mac-storage",
    title: "How to Check & Understand Mac Storage",
    category: "Storage Intelligence",
    readTime: "4 min read",
    summary:
      "Learn how to accurately analyze your Mac storage, understand the difference between APFS purgeable space and actual free space, and explore directories using a visual Sunburst Map.",
    screenshot: "./assets/screenshots/05_disk_space.png",
    toc: [
      "1. Check native macOS Storage settings",
      "2. Understand APFS Purgeable vs Free space",
      "3. Use MacMint's interactive Sunburst Map",
      "4. Drill down to identify massive folders",
    ],
    steps: [
      {
        heading: "1. Check native macOS Storage settings",
        content:
          "Open Apple menu  > System Settings > General > Storage. macOS calculates usage across Applications, Documents, macOS, and System Data. However, this bar chart does not show nested sub-directories or developer packages.",
      },
      {
        heading: "2. Understand APFS Purgeable vs Free space",
        content:
          "macOS APFS volumes utilize 'purgeable' space — snapshots, local Time Machine deltas, and cached iCloud files that the OS will free when space is critical. Standard Finder free space numbers often misrepresent this capacity.",
        tip: "MacMint clearly separates actual available bytes from purgeable capacity so you know your true disk limits.",
      },
      {
        heading: "3. Use MacMint's interactive Sunburst Map",
        content:
          "Launch MacMint and navigate to Disk Space Analysis. The multi-ring radial Sunburst Map reveals your entire disk hierarchy in one view: the inner ring represents primary root directories (Users, Applications, System), while the outer ring visualizes sub-folders.",
      },
      {
        heading: "4. Drill down to identify massive folders",
        content:
          "Click on any sector in the Sunburst Map to zoom in. The breadcrumb path tracks your journey (e.g., Macintosh HD / Users / Developer / Xcode), while the ranked storage list ranks items by byte weight.",
      },
    ],
    warnings: [
      "Never delete files in /System or /usr without knowing their role.",
      "Time Machine local snapshots can temporarily inflate used space after heavy downloads.",
    ],
    tips: [
      "Re-check disk space after emptying the Trash to allow APFS to reclaim free blocks immediately.",
      "Use MacMint's Folder Explorer mode if you prefer traditional file tree listings.",
    ],
    related: ["clean-mac-cache", "free-up-system-data", "find-large-files"],
  },

  "clean-mac-cache": {
    slug: "clean-mac-cache",
    title: "How to Clean Mac Cache Files Safely",
    category: "System Cleanup",
    readTime: "5 min read",
    summary:
      "A complete guide to clearing user caches, application caches, browser data, and developer junk without breaking running apps or losing personal data.",
    screenshot: "./assets/screenshots/01_deep_cleanup.png",
    toc: [
      "1. The three types of Mac caches",
      "2. Why manual cache deletion is risky",
      "3. Safe cache cleaning with MacMint Deep Cleanup",
      "4. Managing project build artifacts and node_modules",
    ],
    steps: [
      {
        heading: "1. The three types of Mac caches",
        content:
          "macOS stores three main cache classes: User Caches (~/Library/Caches), Application Caches, and System Caches (/Library/Caches). While caches speed up day-to-day app loading, old and orphaned caches can accumulate dozens of gigabytes over time.",
      },
      {
        heading: "2. Why manual cache deletion is risky",
        content:
          "Deleting files directly from ~/Library/Caches while applications are active can lead to crash loops or corrupt app states. Furthermore, macOS protects certain container directories under System Integrity Protection (SIP).",
        tip: "Always close open browsers and developer tools before clearing deep caches.",
      },
      {
        heading: "3. Safe cache cleaning with MacMint Deep Cleanup",
        content:
          "Open MacMint and click 'Scan Mac'. MacMint analyzes safe-to-delete caches against an immutable allow-list (CleanerGuard). You can inspect each category, review items, and deselect any paths you wish to retain.",
      },
      {
        heading: "4. Managing project build artifacts and node_modules",
        content:
          "For web and mobile developers, MacMint automatically catalogs node_modules folders, Cargo caches, and Swift build directories under Project Build Artifacts with auto-expanded sub-items.",
      },
    ],
    warnings: [
      "Do NOT clear caches inside ~/Library/Application Support manually — configuration files live there.",
      "Clearing browser caches will require sites to re-download images on next visit.",
    ],
    tips: [
      "Perform a Deep Cleanup once every few weeks to keep background bloat under control.",
      "MacMint deletes directly instead of moving back to Trash, liberating disk space immediately.",
    ],
    related: ["clean-xcode-storage", "find-large-files", "check-mac-storage"],
  },

  "find-large-files": {
    slug: "find-large-files",
    title: "How to Find & Remove Hidden Large Files on Mac",
    category: "Storage Optimization",
    readTime: "3 min read",
    summary:
      "Uncover multi-gigabyte ISOs, obsolete installer packages, video exports, and forgotten archives consuming valuable SSD space.",
    screenshot: "./assets/screenshots/03_large_files.png",
    toc: [
      "1. Why large files hide on your Mac",
      "2. Using MacMint Large Files Explorer",
      "3. Filtering by size, date, and file kind",
      "4. Quick Look preview and safe removal",
    ],
    steps: [
      {
        heading: "1. Why large files hide on your Mac",
        content:
          "Disk image files (.dmg, .iso), 4K screen recordings, virtual machine disk images (.vmdk), and forgotten Zip archives often accumulate inside Downloads, desktop folders, and deep nested project archives.",
      },
      {
        heading: "2. Using MacMint Large Files Explorer",
        content:
          "Navigate to Large File Cleanup in MacMint. The utility scans your user storage and groups files exceeding configurable thresholds: >1 GB, >500 MB, >100 MB, and >50 MB.",
      },
      {
        heading: "3. Filtering by size, date, and file kind",
        content:
          "Use the top filter bar to isolate Videos, Archives, Documents, or Disk Images. You can also sort by Last Modified or Last Accessed to surface items you haven't opened in over 6 months.",
        tip: "Look out for old Xcode .xip archives and macOS install packages that are no longer needed.",
      },
      {
        heading: "4. Quick Look preview and safe removal",
        content:
          "Press the Space bar or click the preview eye icon to trigger macOS Quick Look without opening the file. Once verified, click Reveal in Finder or remove with one click.",
      },
    ],
    warnings: [
      "Never delete virtual machine disk images without checking if you have a backup of the guest OS.",
      "Review file modification dates to ensure you are not discarding an active project archive.",
    ],
    tips: [
      "Offload large video project exports to external thunderbolt SSDs rather than keeping them on your internal drive.",
    ],
    related: ["remove-duplicate-files", "clean-mac-cache", "check-mac-storage"],
  },

  "remove-duplicate-files": {
    slug: "remove-duplicate-files",
    title: "How to Detect & Remove Duplicate Files on macOS",
    category: "Duplicate Detection",
    readTime: "4 min read",
    summary:
      "Learn how to find and clean exact duplicate downloads, redundant photo copies, and repeated documents using SHA-256 cryptographic verification.",
    screenshot: "./assets/screenshots/04_duplicate_files.png",
    toc: [
      "1. How duplicate files build up over time",
      "2. Why name matching alone is dangerous",
      "3. Two-tier verification in MacMint",
      "4. Smart Selection: keep newest or oldest",
    ],
    steps: [
      {
        heading: "1. How duplicate files build up over time",
        content:
          "Repeated downloads of attachments, uncompressed archives that exist alongside their sources, and duplicate photo imports quietly consume double or triple the necessary storage.",
      },
      {
        heading: "2. Why name matching alone is dangerous",
        content:
          "Two files named 'Invoice.pdf' or 'screenshot.png' in different folders might contain completely different data. Deleting based only on file names risks severe data loss.",
      },
      {
        heading: "3. Two-tier verification in MacMint",
        content:
          "MacMint first performs a rapid size-matching pre-filter across files. When matching candidates are found, it generates SHA-256 cryptographic checksums. If and only if the hashes match 100%, they are tagged as genuine duplicates.",
        tip: "Cryptographic hashing guarantees that files are byte-for-byte identical.",
      },
      {
        heading: "4. Smart Selection: keep newest or oldest",
        content:
          "Use the Smart Selection dropdown in MacMint to automatically select the newest copy, the oldest copy, or retain originals across directories with zero guesswork.",
      },
    ],
    warnings: [
      "Do not delete duplicate font files in system folders — some apps require specific versions.",
      "Always review duplicate groups before confirming bulk elimination.",
    ],
    tips: [
      "Use 'Keep Original' to ensure your primary document folder hierarchy remains untouched.",
    ],
    related: ["find-large-files", "clean-mac-cache", "check-mac-storage"],
  },

  "uninstall-mac-apps": {
    slug: "uninstall-mac-apps",
    title: "How to Completely Uninstall Mac Apps with Zero Leftovers",
    category: "App Management",
    readTime: "4 min read",
    summary:
      "Dragging apps to the Trash leaves behind hidden containers, caches, preference plists, and crash logs. Learn how to remove apps completely.",
    screenshot: "./assets/screenshots/06_app_uninstaller.png",
    toc: [
      "1. The myth of dragging apps to Trash",
      "2. Where Mac apps hide their leftover files",
      "3. Using MacMint App Uninstaller",
      "4. Removing LaunchAgents and background helpers",
    ],
    steps: [
      {
        heading: "1. The myth of dragging apps to Trash",
        content:
          "Moving an application bundle (.app) to Trash only removes the executable. Applications routinely write gigabytes of data to ~/Library/Application Support, ~/Library/Containers, and ~/Library/Caches that remain forever.",
      },
      {
        heading: "2. Where Mac apps hide their leftover files",
        content:
          "Sandboxed apps store data in ~/Library/Containers/<bundle-id>. Others create background LaunchAgents in ~/Library/LaunchAgents that continue running daemon processes even after the app is gone.",
        tip: "MacMint uncovers all associated files and groups them under the main app banner.",
      },
      {
        heading: "3. Using MacMint App Uninstaller",
        content:
          "Open MacMint > App Uninstaller. The tool enumerates all installed applications, calculates total disk impact including hidden containers, and provides one-click removal of all associated assets.",
      },
      {
        heading: "4. Removing LaunchAgents and background helpers",
        content:
          "When uninstalling background services, MacMint safely unloads and removes the corresponding .plist files from LaunchAgents and LaunchDaemons to free CPU cycles.",
      },
    ],
    warnings: [
      "Do not delete apps currently running — quit them first via ⌘Q.",
      "Verify you don't need saved project templates before purging Application Support folders.",
    ],
    tips: [
      "Sort applications by Total Size to find forgotten software taking up disproportionate space.",
    ],
    related: ["free-up-system-data", "clean-mac-cache", "check-mac-storage"],
  },

  "clean-xcode-storage": {
    slug: "clean-xcode-storage",
    title: "How to Clean Xcode Storage, DerivedData & Simulators",
    category: "Developer Optimization",
    readTime: "5 min read",
    summary:
      "A developer's guide to reclaiming 30GB to 80GB of disk space from Xcode DerivedData, legacy iOS simulator runtimes, archives, and Swift package caches.",
    screenshot: "./assets/screenshots/01_deep_cleanup.png",
    toc: [
      "1. Why Xcode consumes massive storage",
      "2. Clearing DerivedData safely",
      "3. Purging obsolete iOS/watchOS simulators",
      "4. Cleaning Swift Package Manager and CocoaPods caches",
    ],
    steps: [
      {
        heading: "1. Why Xcode consumes massive storage",
        content:
          "Every build, preview canvas render, and indexation generates cached artifacts in ~/Library/Developer/Xcode/DerivedData. Over months of software development, DerivedData and CoreSimulator caches routinely inflate past 50 GB.",
      },
      {
        heading: "2. Clearing DerivedData safely",
        content:
          "Closing Xcode and clearing DerivedData is completely safe — Xcode will simply re-index and re-build active projects when reopened. MacMint's Deep Cleanup isolates DerivedData so you can purge it with a single click.",
        tip: "Clearing DerivedData often resolves strange Swift compiler index bugs and build failures.",
      },
      {
        heading: "3. Purging obsolete iOS/watchOS simulators",
        content:
          "Under System Data Reclaim, MacMint identifies old simulator runtimes and device pairings stored in ~/Library/Developer/CoreSimulator/Devices that belong to previous iOS SDK releases.",
      },
      {
        heading: "4. Cleaning Swift Package Manager and CocoaPods caches",
        content:
          "MacMint detects SPM checkout caches and CocoaPods repos in ~/Library/Caches/org.swift.swiftpm, enabling you to clean stale dependencies without hunting through Terminal.",
      },
    ],
    warnings: [
      "Do not delete Xcode Archives (~/Library/Developer/Xcode/Archives) if you need dSYM files to symbolicate past production crash reports.",
    ],
    tips: [
      "Check your node_modules folders under Project Build Artifacts for projects you haven't opened in months.",
    ],
    related: ["clean-mac-cache", "free-up-system-data", "check-mac-storage"],
  },

  "free-up-system-data": {
    slug: "free-up-system-data",
    title: "How to Free Up 'System Data' on macOS",
    category: "System Data Reclaim",
    readTime: "5 min read",
    summary:
      "Understand what macOS includes in the mysterious System Data storage category and how to safely reclaim dozens of gigabytes.",
    screenshot: "./assets/screenshots/02_system_data.png",
    toc: [
      "1. What is macOS 'System Data'?",
      "2. Why sandboxed containers inflate System Data",
      "3. Full Disk Access permissions explained",
      "4. Reclaiming space with MacMint System Data Reclaim",
    ],
    steps: [
      {
        heading: "1. What is macOS 'System Data'?",
        content:
          "In macOS System Settings > Storage, 'System Data' acts as a catch-all category for anything outside Documents, Photos, and standard Applications. This includes sandboxed container caches, application logs, virtual memory swap files, and iOS backup images.",
      },
      {
        heading: "2. Why sandboxed containers inflate System Data",
        content:
          "Every modern Mac App Store application operates within its own sandbox in ~/Library/Containers. Over time, apps like Slack, Xcode, Final Cut Pro, and Docker store large temp files inside these containers that macOS groups under System Data.",
        tip: "Standard user cache cleaners cannot view or clean these containers without Full Disk Access.",
      },
      {
        heading: "3. Full Disk Access permissions explained",
        content:
          "To safely scan and reclaim these sandboxed caches, grant MacMint Full Disk Access in System Settings > Privacy & Security > Full Disk Access. MacMint operates 100% locally and only accesses cache paths.",
      },
      {
        heading: "4. Reclaiming space with MacMint System Data Reclaim",
        content:
          "Open MacMint > System Data Reclaim. The utility analyzes sandboxed app caches, group container caches, and simulator runtimes, verifying exact byte counts down to 0 MB once cleaned.",
      },
    ],
    warnings: [
      "Do not delete containers belonging to active cloud synchronization apps like iCloud Drive or OneDrive without pausing sync.",
    ],
    tips: [
      "Reboot your Mac after deep System Data cleaning so macOS can update its Spotlight metadata index.",
    ],
    related: ["clean-xcode-storage", "clean-mac-cache", "check-mac-storage"],
  },
};
