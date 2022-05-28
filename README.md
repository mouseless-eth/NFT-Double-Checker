# NFT Double Checker
A script to quickly check if a NFT collection contains tokens with duplicate metadata.

This script hashes all metadata associated with each token and compares the hashes for duplicates. 

## How To Run The Script
### Installation
To install this repo and all its dependencies run
```
git clone https://github.com/0xMouseLess/NFT-Double-Checker.git
cd NFT-Double-Checker
npm install
```

### Setup & Config
This project uses [dotenv](https://github.com/motdotla/dotenv#readme) to handle all config variables. To set it up, create a `.env` file in the **project home directory** and edit it to include the following variables:
- `ALCHEMY_API_KEY` alchemy api key
- `METADATA_PATH` location to store the retrieved collection metadata
- `ADDRESS` contract address of the collection that we are searching

an example of a `.env` config file
```
ALCHEMY_API_KEY=<alchemy-api-key-here>
METADATA_PATH=./data/collectionMetadat.json
ADDRESS=0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e # Doodles addr
```

### Running 
Once the `.env` file is set up, the script can be run by calling the following command from the project home directory
```
node src/index.js
```

> Because there is no set consensus on how metadata should be displayed, you may need to tweak the `src/helpers.js` file to match the collections metadata
