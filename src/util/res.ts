interface Res {
  success: boolean;
  message: string;
  error?: any;
  code: number;
  status?: string;
  data: any;
  affectedId?: number | null;
}
export default Res;
