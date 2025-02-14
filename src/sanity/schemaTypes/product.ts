export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string'
      },
      {
        name: 'brand',
        title: 'Brand',
        type: 'string'
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text'
      },
      {
        name: 'price',
        title: 'Price',
        type: 'number'
      },
      {
        name: 'originalPrice',
        title: 'Original Price',
        type: 'number'
      },
      {
        name: 'imageUrl',
        title: 'Main Image URL',
        type: 'string'
      },
      {
        name: 'images',
        title: 'Images',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'url', title: 'URL', type: 'string' },
              { name: 'alt', title: 'Alt Text', type: 'string' }
            ],
            preview: {
              select: {
                title: 'alt',
                media: 'url'
              }
            }
          }
        ]
      },
      {
        name: 'sizes',
        title: 'Sizes',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'value', title: 'Value', type: 'string' },
              { name: 'label', title: 'Label', type: 'string' },
              { name: 'available', title: 'Available', type: 'boolean' }
            ]
          }
        ]
      },
      {
        name: 'colors',
        title: 'Colors',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'name', title: 'Name', type: 'string' },
              { name: 'value', title: 'Hex Value', type: 'string' },
              { name: 'available', title: 'Available', type: 'boolean' }
            ]
          }
        ]
      },
      {
        name: 'fabric',
        title: 'Fabric',
        type: 'string'
      },
      {
        name: 'care',
        title: 'Care Instructions',
        type: 'array',
        of: [{ type: 'string' }]
      },
      {
        name: 'features',
        title: 'Features',
        type: 'array',
        of: [{ type: 'string' }]
      },
      {
        name: 'stock',
        title: 'Stock',
        type: 'number'
      },
      {
        name: 'rating',
        title: 'Rating',
        type: 'number'
      },
      {
        name: 'reviewCount',
        title: 'Review Count',
        type: 'number'
      },
      {
        name: 'category',
        title: 'Category',
        type: 'string'
      },
      {
        name: 'tags',
        title: 'Tags',
        type: 'array',
        of: [{ type: 'string' }]
      }
    ]
  };
  