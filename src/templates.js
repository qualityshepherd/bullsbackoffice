import { renderTags } from './ui.js'

export const postsTemplate = post => `
  <div class="post">
    <a href="#post?s=${post.meta.slug}" role="button" aria-label="post-title">
      <h2 class="post-title">${post.meta.title}</h2>
    </a>
    <div class="date">${post.meta.date}</div>
    <div>${post.html}</div>
    <div class="tags">${renderTags(post.meta.tags)}</div>
  </div>
`

export const singlePostTemplate = post => `
  <article class="post">
    <h2>${post.meta.title}</h2>
    <div class="date">${post.meta.date}</div>
    <div class="post-content">${post.html}</div>
    <div class="tags">${renderTags(post.meta.tags)}</div>
  </article>
`

export const notFoundTemplate = () => '<p>Post not found.</p>'

export const aboutPageTemplate = () => `
  <h2>Bulls Back Office</h2>
  <div class="center">
    Tracksuit executives one couch away from a champion. No access. No sources. No filters.<br><br>
    <b>Bulls Back Office Podcast</b> is recorded live from the discord server. Quality hoops talk with regular Bulls fans.
    <div class="social">
      <a href="mailto:&#105;&#110;&#116;&#101;&#114;&#110;&#64;&#98;&#117;&#108;&#108;&#115;&#98;&#97;&#99;&#107;&#111;&#102;&#102;&#105;&#99;&#101;&#46;&#99;&#111;&#109;" title="email"><img src="assets/images/social/email.png" alt="email"></a>
      <a href="https://podcasts.apple.com/au/podcast/play-worlds-podcast/id1722152993" title="Bulls Back Office Podcast"><img src="assets/images/social/podcast.png" alt="Podcast"></a>
      <a href="https://www.youtube.com/@bullsbackoffice" title="youtube"><img src="assets/images/social/youtube.png" alt="YouTube"></a>
      <a href="/assets/rss/blog.xml"><img src="assets/images/social/rss.png" title="blog rss" alt="RSS"></a>
    </div>
    <div class="center"><img src="assets/images/bbo_square_300.png"></div>
  </div>
`

export const archiveTemplate = post => `
  <p>
    <a href="#post?s=${post.meta.slug}"><span class="archive">${post.meta.title}</span></a>
    <span class="date">${post.meta.date}</span>
  </p>
`
