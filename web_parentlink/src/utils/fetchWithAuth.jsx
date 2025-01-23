const fetchWithAuth = async (url, token, options = {}) => {
  const headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : "", // Incluir el token en el encabezado
  };

  return fetch(url, { ...options, headers });
};

export default fetchWithAuth;
