export interface LoginResponse {
  _id: string
  email: string
  name: string
  isActive: boolean
  role: string
  token: string
  refresh: string
}
