import axios from 'axios';
import cliProgress from 'cli-progress';
import fs from 'fs';
import hash from 'object-hash';
import duplicates from 'find-array-duplicates';
import 'dotenv/config';

// setting up .env variables
const apiKey = process.env.ALCHEMY_API_KEY;
const metadataPath = process.env.METADATA_PATH;

export async function getCollectionMetadata() {
  console.log('Fetching collection metadata from endpoint');
  const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.legacy);
  progressBar.start(10000, 0);

	const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTsForCollection`;
  const contractAddr = process.env.ADDRESS;

	let startToken = '';
	let hasNextPage = true;
  const withMetadata = 'true';

  let collectionMetadata = [];

	while (hasNextPage) {
    const response = await axios.get(
      `${baseURL}/?contractAddress=${contractAddr}&startToken=${startToken}&withMetadata=${withMetadata}`
    );
    const { nfts, nextToken } = response.data;

		if (!nextToken) {
			// When nextToken is not present, then there are no more NFTs to fetch.
			hasNextPage = false;
		}
		startToken = nextToken;
    collectionMetadata = collectionMetadata.concat(nfts.map((nft) => ({
      name: nft.title,
      attributes: nft.metadata.attributes,
    })));
    progressBar.update(collectionMetadata.length);
	}
  progressBar.stop();

  const jsonData = JSON.stringify(collectionMetadata, null, 2);
  fs.writeFile(metadataPath, jsonData, function(err){
    if (err) {
      console.log(err);
    }
  });
}

export function findDuplicates(){
  console.log('Finding duplicate NFTs');
  fs.readFile(metadataPath, "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    
    }
    let collectionMetadata = JSON.parse(jsonString);
    let withHash = collectionMetadata.map( nft => {
      nft.hash = hash(nft.attributes);
      return nft;
    });
    console.log(duplicates(withHash, 'hash').all()); 
  });
}
