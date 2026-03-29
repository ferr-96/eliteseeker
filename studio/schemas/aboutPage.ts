import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'story',
      title: 'Our Story',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Rich text content for the company story',
    }),
    defineField({
      name: 'mission',
      title: 'Our Mission',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'vision',
      title: 'Our Vision',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'values',
      title: 'Core Values',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'value',
          fields: [
            {name: 'title', title: 'Value Title', type: 'string'},
            {name: 'description', title: 'Description', type: 'text'},
          ],
          preview: {
            select: {
              title: 'title',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'teamMember',
          fields: [
            {name: 'name', title: 'Name', type: 'string'},
            {name: 'role', title: 'Role/Title', type: 'string'},
            {name: 'bio', title: 'Bio', type: 'text'},
            {name: 'photo', title: 'Photo', type: 'image', options: {hotspot: true}},
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'role',
              media: 'photo',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'About Page',
      }
    },
  },
})
