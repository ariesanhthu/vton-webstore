import { type SchemaTypeDefinition } from 'sanity'
import {postType} from './postType'
import product from './product'
// export const schema: { types: SchemaTypeDefinition[] } = {
//   types: [],
// }

export const schemaTypes = [postType, product]