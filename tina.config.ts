import { defineConfig } from 'tinacms'

export default defineConfig({
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || 'main',
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: 'admin',
    publicFolder: 'public'
  },
  media: {
    tina: {
      mediaRoot: 'uploads',
      publicFolder: 'public'
    }
  },
  schema: {
    collections: [
      {
        name: 'event',
        label: 'Events',
        path: 'content/events',
        format: 'md',
        fields: [
          { name: 'title', label: 'Title', type: 'string' },
          { name: 'date', label: 'Date', type: 'datetime' },
          { name: 'image', label: 'Image', type: 'image' },
          { name: 'body', label: 'Body', type: 'rich-text' }
        ]
      }
    ]
  }
})
