import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    }),

    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}], 
    }),

    defineField({
      type: 'object',
      name: 'credits',
      fieldsets: [
        {name: 'credits', title: 'Credits'}
      ],
      fields: [
        {
          title: 'Code',
          name: 'code',
          type: 'string',
          fieldset: 'credits'
        },
        {
          title: 'Design',
          name: 'design',
          type: 'string',
          fieldset: 'credits'
        },
        {
          title: 'Photo',
          name: 'photo',
          type: 'string',
          fieldset: 'credits'
        },
        {
          title: 'Client',
          name: 'client',
          type: 'string',
          fieldset: 'credits'
        }
      ]
    }),

    defineField({
      title: 'Gallery',
      name: 'gallery',
      type: 'array',
      of: [{type: 'image'}]
    }),

    defineField({
      title: 'Videos',
      name: 'videos',
      type: 'array',
      of: [{type: 'file'}]
    }),
    
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
