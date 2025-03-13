const API_URL = 'http://localhost:8080/api';

export const api = {
  async getListings(page = 0, category?: string, location?: string) {
    const params = new URLSearchParams({
      page: page.toString(),
      ...(category && { category }),
      ...(location && { location })
    });
    
    const response = await fetch(`${API_URL}/public/listings?${params}`);
    if (!response.ok) throw new Error('Failed to fetch listings');
    return response.json();
  },

  async getListingDetail(id: number) {
    const response = await fetch(`${API_URL}/public/listings/${id}`);
    if (!response.ok) throw new Error('Failed to fetch listing detail');
    return response.json();
  }
}; 