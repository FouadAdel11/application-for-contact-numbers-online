export interface Contact{
  _id:string,
  name: string,
  phone: number,
  address: string,
  notes: string,
  updateBy?: string,
  limit?: number,
  offset?:number
}
