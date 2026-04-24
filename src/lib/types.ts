// Bloomberg Function Type Definition
export interface BloombergFunction {
  id: string;
  name: string;
  category: string;
  description: string;
  syntax?: string;
  example?: string;
  returnType?: string;
  arguments?: FunctionArgument[];
  relatedFunctions?: string[];
  lastUpdated?: string;
}

// Function Argument Type
export interface FunctionArgument {
  name: string;
  type: string;
  required: boolean;
  description?: string;
  defaultValue?: unknown;
}

// Search Result Type
export interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  match: 'name' | 'description' | 'category';
  relevance: number; // 0-1 score
}

// Favorite Store Type (for Zustand)
export interface FavoriteStore {
  favorites: string[]; // Array of function IDs
  addFavorite: (functionId: string) => void;
  removeFavorite: (functionId: string) => void;
  isFavorite: (functionId: string) => boolean;
  clearFavorites: () => void;
  loadFromLocalStorage: () => void;
  saveToLocalStorage: () => void;
}

// Pagination Helper
export interface PaginationMeta {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// API Response Wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: PaginationMeta;
}
