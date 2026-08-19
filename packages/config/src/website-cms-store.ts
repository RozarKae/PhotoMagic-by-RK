import { WebsitePage, WebsiteSnapshot } from '@photomagic/types';
import { INITIAL_WEBSITE_PAGES } from './website-registry';

// Internal In-Memory / Runtime CMS Store (with localStorage synchronization in browser)
let inMemoryPages: WebsitePage[] = JSON.parse(JSON.stringify(INITIAL_WEBSITE_PAGES));
let inMemorySnapshots: WebsiteSnapshot[] = INITIAL_WEBSITE_PAGES.map((page) => ({
  id: `snap-${page.id}-initial`,
  pageId: page.id,
  version: 1,
  label: 'Initial Canonical Publication',
  author: 'PhotoMagic Lead Artist',
  summary: `Initial baseline publication for ${page.title}`,
  theme: page.theme,
  pageData: JSON.parse(JSON.stringify(page)),
  createdAt: page.createdAt,
}));

// Hydrate from localStorage if in browser
function hydrateFromStorage() {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('photomagic_cms_pages');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge with initial pages so new system pages are never lost
          const storedMap = new Map(parsed.map((p: WebsitePage) => [p.id, p]));
          inMemoryPages = INITIAL_WEBSITE_PAGES.map((initial) => {
            return storedMap.get(initial.id) || initial;
          });
          // Add any custom landing pages created by the user
          parsed.forEach((p: WebsitePage) => {
            if (!INITIAL_WEBSITE_PAGES.some((init) => init.id === p.id)) {
              inMemoryPages.push(p);
            }
          });
        }
      }

      const storedSnaps = localStorage.getItem('photomagic_cms_snapshots');
      if (storedSnaps) {
        const parsedSnaps = JSON.parse(storedSnaps);
        if (Array.isArray(parsedSnaps) && parsedSnaps.length > 0) {
          inMemorySnapshots = parsedSnaps;
        }
      }
    } catch {
      // Fallback to inMemory default
    }
  }
}

function persistToStorage() {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('photomagic_cms_pages', JSON.stringify(inMemoryPages));
      localStorage.setItem('photomagic_cms_snapshots', JSON.stringify(inMemorySnapshots));
    } catch {}
  }
}

// Initial hydration
hydrateFromStorage();

export function getAllPages(): WebsitePage[] {
  hydrateFromStorage();
  return JSON.parse(JSON.stringify(inMemoryPages));
}

export function getPageById(id: string): WebsitePage | undefined {
  hydrateFromStorage();
  const found = inMemoryPages.find((p) => p.id === id);
  if (!found) {
    // Fallback to initial registry
    const init = INITIAL_WEBSITE_PAGES.find((p) => p.id === id);
    return init ? JSON.parse(JSON.stringify(init)) : undefined;
  }
  return JSON.parse(JSON.stringify(found));
}

export function getPublishedPageBySlug(slug: string): WebsitePage | undefined {
  hydrateFromStorage();
  const normalizedSlug = slug.startsWith('/') ? slug : `/${slug}`;
  const found = inMemoryPages.find((p) => p.slug === normalizedSlug && p.status === 'published');
  if (!found) {
    const init = INITIAL_WEBSITE_PAGES.find(
      (p) => p.slug === normalizedSlug && p.status === 'published',
    );
    return init ? JSON.parse(JSON.stringify(init)) : undefined;
  }
  return JSON.parse(JSON.stringify(found));
}

export function saveDraftPage(page: WebsitePage): WebsitePage {
  hydrateFromStorage();
  const index = inMemoryPages.findIndex((p) => p.id === page.id);
  const updatedPage: WebsitePage = {
    ...page,
    status: 'draft',
    updatedAt: new Date().toISOString(),
  };

  if (index >= 0) {
    inMemoryPages[index] = updatedPage;
  } else {
    inMemoryPages.push(updatedPage);
  }

  persistToStorage();
  return JSON.parse(JSON.stringify(updatedPage));
}

export function publishPage(
  pageId: string,
  author = 'Studio Lead Artist',
): { success: boolean; page: WebsitePage; snapshot: WebsiteSnapshot } {
  hydrateFromStorage();
  const index = inMemoryPages.findIndex((p) => p.id === pageId);
  const existing =
    index >= 0 ? inMemoryPages[index] : INITIAL_WEBSITE_PAGES.find((p) => p.id === pageId);

  if (!existing) {
    throw new Error(`Page ${pageId} not found`);
  }

  const newVersion = (existing.version || 1) + 1;
  const now = new Date().toISOString();

  const publishedPage: WebsitePage = {
    ...existing,
    status: 'published',
    version: newVersion,
    updatedAt: now,
    publishedAt: now,
  };

  if (index >= 0) {
    inMemoryPages[index] = publishedPage;
  } else {
    inMemoryPages.push(publishedPage);
  }

  const snapshot: WebsiteSnapshot = {
    id: `snap-${pageId}-v${newVersion}-${Date.now()}`,
    pageId,
    version: newVersion,
    label: `Revision v${newVersion}`,
    author,
    summary: `Published revision v${newVersion} (${publishedPage.sections.length} sections)`,
    theme: publishedPage.theme,
    pageData: JSON.parse(JSON.stringify(publishedPage)),
    createdAt: now,
  };

  inMemorySnapshots.unshift(snapshot);
  persistToStorage();

  return {
    success: true,
    page: JSON.parse(JSON.stringify(publishedPage)),
    snapshot,
  };
}

export function getSnapshotsByPageId(pageId: string): WebsiteSnapshot[] {
  hydrateFromStorage();
  return inMemorySnapshots.filter((s) => s.pageId === pageId);
}

export function rollbackToSnapshot(pageId: string, snapshotId: string): WebsitePage | undefined {
  hydrateFromStorage();
  const snap = inMemorySnapshots.find((s) => s.pageId === pageId && s.id === snapshotId);
  if (!snap) return undefined;

  const index = inMemoryPages.findIndex((p) => p.id === pageId);
  const restoredPage: WebsitePage = {
    ...snap.pageData,
    updatedAt: new Date().toISOString(),
  };

  if (index >= 0) {
    inMemoryPages[index] = restoredPage;
  } else {
    inMemoryPages.push(restoredPage);
  }

  persistToStorage();
  return JSON.parse(JSON.stringify(restoredPage));
}
