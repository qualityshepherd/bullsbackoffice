import config from './config.js'
import { elements } from './dom.js'
import { getPosts, getDisplayedPosts, setDisplayedPosts, getSearchTerm, setSearchTerm, incrementDisplayedPosts } from './state.js'
import { renderAboutPage, renderArchive, renderFilteredPosts, renderNotFoundPage, renderPosts, renderSinglePost, toggleLoadMoreButton } from './ui.js'

const ROUTES = {
  HOME: '',
  POST: '#post',
  ABOUT: '#about',
  TAG: '#tag',
  ARCHIVE: '#archive',
  SEARCH: '#search'
}

const getRouteParams = () => {
  const [route, query] = location.hash.split('?')
  const params = new URLSearchParams(query)
  return { route, params }
}

const normalize = str => String(str || '').toLowerCase()

const filterPostsByTag = (posts, tag) =>
  posts.filter(post =>
    post.meta.tags?.some(t => normalize(t) === normalize(tag))
  )

const routeHandlers = {
  [ROUTES.HOME]: ({ params }) => {
    setDisplayedPosts(config.maxPosts)
    const posts = getPosts()
    renderPosts(posts, getDisplayedPosts())
  },
  [ROUTES.POST]: ({ params }) => {
    const slug = params.get('s')
    if (slug) renderSinglePost(slug)
  },
  [ROUTES.ABOUT]: () => {
    renderAboutPage()
  },
  [ROUTES.TAG]: ({ params }) => {
    const tag = params.get('t')
    if (tag) {
      const filtered = filterPostsByTag(getPosts(), tag)
      renderPosts(filtered, filtered.length)
    }
  },
  [ROUTES.ARCHIVE]: () => {
    renderArchive(getPosts())
  },
  [ROUTES.SEARCH]: ({ params }) => {
    const query = params.get('q')
    if (query) {
      setSearchTerm(query.toLowerCase())
      // Update the search input to reflect the URL query
      if (elements.searchInput) {
        elements.searchInput.value = query
      }
      renderFilteredPosts()
    } else {
      // No query parameter, show all posts
      setSearchTerm('')
      const posts = getPosts()
      renderPosts(posts, posts.length)
    }
  },
  default: ({ params }) => {
    renderNotFoundPage()
  }
}

export function handleRouting () {
  const { route, params } = getRouteParams()
  setSearchTerm('') // Clear search term on route change
  // Hide load-more button by default for all routes
  toggleLoadMoreButton()
  const handler = routeHandlers[route] || routeHandlers.default
  handler({ params })
}

export function handleSearch (e) {
  const normalizeInput = input => input.toLowerCase()
  setSearchTerm(normalizeInput(e.target.value))
  // Update URL to reflect search (optional - for better UX)
  if (getSearchTerm()) {
    history.replaceState(null, '', `#search?q=${encodeURIComponent(e.target.value)}`)
  } else {
    history.replaceState(null, '', '#')
  }
  renderFilteredPosts()
}

export function handleLoadMore () {
  incrementDisplayedPosts()
  renderPosts(getPosts(), getDisplayedPosts())
}

export function toggleMenu () {
  const toggleDisplay = el =>
    (el.style.display = el.style.display === 'block' ? 'none' : 'block')
  toggleDisplay(elements.menuLinks)
}
