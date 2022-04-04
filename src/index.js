import { getCollectionMetadata, findDuplicates } from './helpers.js';
import fs from 'fs';
import 'dotenv/config';

const metadataPath = process.env.METADATA_PATH;

if (!fs.existsSync(metadataPath)) {
  // Fetch full collection metadata from alchemy
  getCollectionMetadata();
  findDuplicates();
} else {
  // Metadata alr fetched so check for matching objects
  findDuplicates();
}


