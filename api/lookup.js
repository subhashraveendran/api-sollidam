import {
    latLngToGrid,
    gridToLatLng,
    gridIdToWordIndices,
    wordIndicesToGridId,
    isWithinTamilNadu,
    TAMIL_NADU_BOUNDS,
    METERS_PER_DEGREE_LNG,
    GRID_RESOLUTION,
  } from './utils/encoding.js'; // Changed from _utils
  import {
    getWordByIndex,
    getIndexByWord,
    isValidWord,
    getWordListLength,
  } from './utils/words.js'; // Changed from _utils
  
  export default function handler(req, res) {
    const { query } = req;
    const { location, words } = query;
  
    if (location) {
      const [lat, lng] = location.split(',').map(parseFloat);
      if (isNaN(lat) || isNaN(lng)) {
          return res.status(400).json({ error: 'Invalid location format. Please use: latitude,longitude' });
      }
      if (!isWithinTamilNadu(lat, lng)) {
        return res.status(400).json({ error: 'Location is outside of Tamil Nadu' });
      }
      const grid = latLngToGrid(lat, lng);
      const wordIndices = gridIdToWordIndices(grid.gridId, getWordListLength());
      const resultWords = wordIndices.map(index => getWordByIndex(index));
      res.status(200).json({ words: resultWords.join('.') });
    } else if (words) {
      const wordArray = words.split('.').map(word => word.trim().toLowerCase());
      if (wordArray.length !== 3 || wordArray.some(word => !isValidWord(word))) {
        return res.status(400).json({ error: 'Invalid 3-word address' });
      }
      const wordIndices = wordArray.map(word => getIndexByWord(word));
      const gridId = wordIndicesToGridId(wordIndices, getWordListLength());
      const totalColumns = Math.floor(
        ((TAMIL_NADU_BOUNDS.maxLng - TAMIL_NADU_BOUNDS.minLng) *
          METERS_PER_DEGREE_LNG) /
          GRID_RESOLUTION
      );
      const y = Math.floor(gridId / totalColumns);
      const x = gridId % totalColumns;
      const { lat, lng } = gridToLatLng(x, y);
  
      res.status(200).json({
        lat: lat,
        long: lng
      });
    } else {
      res.status(400).json({ error: 'Please provide either a "location" or "words" query parameter.' });
    }
  }
  