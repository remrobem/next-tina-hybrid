import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { useEditState } from 'tinacms/dist/edit-state'

export default function EventPage({ event }) {
  const { edit } = useEditState()

  return (
    <article className="p-8 prose">
      <h1>{event.title} {edit && '(Preview Mode)'}</h1>
      <p>{new Date(event.date).toLocaleDateString()}</p>
      {event.image && <img src={event.image} alt={event.title} />}
      <TinaMarkdown content={event.body} />
    </article>
  )
}

export async function getStaticPaths() {
  const dir = path.join(process.cwd(), 'content', 'events')
  const filenames = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))
  return {
    paths: filenames.map((filename) => ({
      params: { filename: filename.replace('.md', '') }
    })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'content', 'events', `${params.filename}.md`)
  const file = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(file)
  return {
    props: {
      event: {
        ...data,
        body: {
          type: 'root',
          children: [{ type: 'p', children: [{ type: 'text', text: content.trim() }] }]
        }
      }
    }
  }
}
