// src/config/pagination.config.ts
export const paginationConfig = {
  defaultLimit: parseInt(import.meta.env.VITE_DEFAULT_PAGE_LIMIT || "12", 10),
  maxLimit: parseInt(import.meta.env.VITE_MAX_PAGE_LIMIT || "100", 10),
  minLimit: parseInt(import.meta.env.VITE_MIN_PAGE_LIMIT || "6", 10),
};

// Validar que los valores sean sensatos
if (paginationConfig.defaultLimit < paginationConfig.minLimit) {
  paginationConfig.defaultLimit = paginationConfig.minLimit;
}

if (paginationConfig.defaultLimit > paginationConfig.maxLimit) {
  paginationConfig.defaultLimit = paginationConfig.maxLimit;
}

export default paginationConfig;
