import { type Pepeha, type InsertPepeha } from "@shared/schema";

export interface IStorage {
  getPepeha(): Promise<Pepeha | undefined>;
  updatePepeha(pepeha: InsertPepeha): Promise<Pepeha>;
}

export class MemStorage implements IStorage {
  private pepeha?: Pepeha;
  private currentId: number = 1;

  async getPepeha(): Promise<Pepeha | undefined> {
    return this.pepeha;
  }

  async updatePepeha(insertPepeha: InsertPepeha): Promise<Pepeha> {
    this.pepeha = { ...insertPepeha, id: this.currentId };
    return this.pepeha;
  }
}

export const storage = new MemStorage();
