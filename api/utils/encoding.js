// Tamil Nadu geographic bounds
export const TAMIL_NADU_BOUNDS = {
    minLat: 8.08,
    maxLat: 13.5,
    minLng: 76.0,
    maxLng: 80.5,
  };
  
  // Grid resolution in meters
  export const GRID_RESOLUTION = 3;
  
  // More accurate meters per degree for Tamil Nadu (average latitude ~10.5°N)
  export const METERS_PER_DEGREE_LAT = 110574; // More precise value for ~10.5°N
  export const METERS_PER_DEGREE_LNG = 109639; // More precise value for ~10.5°N (cos(10.5°) * 111320)
  
  /**
   * Convert lat/lng to grid coordinates
   */
  export function latLngToGrid(lat, lng) {
    const x = Math.floor(
      ((lng - TAMIL_NADU_BOUNDS.minLng) * METERS_PER_DEGREE_LNG) /
        GRID_RESOLUTION
    );
    const y = Math.floor(
      ((lat - TAMIL_NADU_BOUNDS.minLat) * METERS_PER_DEGREE_LAT) /
        GRID_RESOLUTION
    );
  
    const totalColumns = Math.floor(
      ((TAMIL_NADU_BOUNDS.maxLng - TAMIL_NADU_BOUNDS.minLng) *
        METERS_PER_DEGREE_LNG) /
        GRID_RESOLUTION
    );
    const gridId = y * totalColumns + x;
  
    return { x, y, gridId };
  }
  
  /**
   * Convert grid coordinates back to lat/lng
   */
  export function gridToLatLng(x, y) {
    const lng =
      TAMIL_NADU_BOUNDS.minLng +
      (x * GRID_RESOLUTION) / METERS_PER_DEGREE_LNG +
      (GRID_RESOLUTION / 2) / METERS_PER_DEGREE_LNG;
    const lat =
      TAMIL_NADU_BOUNDS.minLat +
      (y * GRID_RESOLUTION) / METERS_PER_DEGREE_LAT +
      (GRID_RESOLUTION / 2) / METERS_PER_DEGREE_LAT;
  
    return { lat, lng };
  }
  
  /**
   * Encode grid ID to word indices
   */
  export function gridIdToWordIndices(gridId, wordListLength) {
    const word1 = gridId % wordListLength;
    const word2 = Math.floor(gridId / wordListLength) % wordListLength;
    const word3 =
      Math.floor(gridId / (wordListLength * wordListLength)) % wordListLength;
  
    return [word1, word2, word3];
  }
  
  /**
   * Decode word indices back to grid ID
   */
  export function wordIndicesToGridId(indices, wordListLength) {
    return (
      indices[0] +
      indices[1] * wordListLength +
      indices[2] * wordListLength * wordListLength
    );
  }
  
  /**
   * Check if coordinates are within Tamil Nadu bounds
   */
  export function isWithinTamilNadu(lat, lng) {
    return (
      lat >= TAMIL_NADU_BOUNDS.minLat &&
      lat <= TAMIL_NADU_BOUNDS.maxLat &&
      lng >= TAMIL_NADU_BOUNDS.minLng &&
      lng <= TAMIL_NADU_BOUNDS.maxLng
    );
  }