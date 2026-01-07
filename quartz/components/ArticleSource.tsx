import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const ArticleSource: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const author = fileData.frontmatter?.author as string | undefined
  const publication = fileData.frontmatter?.publication as string | undefined
  // Support both 'source' and 'url' fields for original article link
  const source = (fileData.frontmatter?.source || fileData.frontmatter?.url) as string | undefined
  const pdfUrl = fileData.frontmatter?.pdf_url as string | undefined

  // Only show if we have at least one field
  if (!author && !publication && !source && !pdfUrl) {
    return null
  }

  // Build the byline: "by Author in Publication"
  const parts: string[] = []
  if (author) {
    parts.push(`by ${author}`)
  }
  if (publication) {
    parts.push(`in ${publication}`)
  }
  const byline = parts.join(" ")

  return (
    <div class={classNames(displayClass, "article-source")}>
      {byline && <p class="byline">{byline}</p>}
      <div class="source-links">
        {source && (
          <a href={source} target="_blank" rel="noopener noreferrer">
            Original article ↗
          </a>
        )}
        {pdfUrl && (
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer" class="pdf-link">
            View PDF ↗
          </a>
        )}
      </div>
    </div>
  )
}

ArticleSource.css = `
.article-source {
  margin: 0.5rem 0 1.5rem 0;
  opacity: 0.85;
}

.article-source .byline {
  margin: 0;
  font-style: italic;
  color: var(--gray);
}

.article-source .source-links {
  margin: 0.25rem 0 0 0;
  font-size: 0.9rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.article-source .source-links a {
  color: var(--secondary);
}

.article-source .source-links .pdf-link {
  color: var(--tertiary);
}
`

export default (() => ArticleSource) satisfies QuartzComponentConstructor
