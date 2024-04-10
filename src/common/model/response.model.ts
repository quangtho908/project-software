export class Successfully {
  public statusCode: number = 200;
  public message: string = "SUCCESSFULLY";
  public data: any = {}; 
  constructor(data: any) {
    this.data = data;
  }
}