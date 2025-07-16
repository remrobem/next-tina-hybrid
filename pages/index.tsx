import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { useEditState } from 'tinacms/dist/edit-state'

export default function Home({ events }) {
  const { edit } = useEditState()

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Church Events {edit && '(Preview Mode)'}</h1>
      <ul>
        {events.map((event) => (
          <li key={event.slug} className="mb-2">
            <Link href={`/events/${event.slug}`}>
              <a className="text-blue-600 underline">{event.title} – {event.date}</a>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

export async function getStaticProps() {
  const dir = path.join(process.cwd(), 'content', 'events')
  const files = fs.readdirSync(dir)
  const events = files.map((filename) => {
    const slug = filename.replace('.md', '')
    const file = fs.readFileSync(path.join(dir, filename), 'utf-8')
    const { data } = matter(file)
    return { slug, ...data }
  })
  return { props: { events } }
}
